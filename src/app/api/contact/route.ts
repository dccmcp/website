import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  teamSize?: string;
  software?: string[];
  message?: string;
  honey?: string;
  turnstileToken?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

/**
 * Transport resolution order:
 *   1. ZEPTOMAIL_API_KEY + CONTACT_TO_EMAIL  → send the enquiry via ZeptoMail
 *   2. RESEND_API_KEY + CONTACT_TO_EMAIL     → send the enquiry via Resend
 *   3. CONTACT_WEBHOOK_URL                   → POST the payload as JSON
 *   4. neither                               → 503 so the form can fall back to mailto
 *
 * We never report a success we did not actually achieve.
 */
export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field.
  if (body.honey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const teamSize = body.teamSize?.trim() ?? "";
  const software = body.software ?? [];

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid work email address.";
  if (message.length < 12) errors.message = "Please describe what you are trying to deploy.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 422 });
  }

  // Cloudflare Turnstile. Enforced only when a secret is configured, so local
  // development and previews keep working without Cloudflare keys.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    const token = body.turnstileToken?.trim() ?? "";
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const rejected = NextResponse.json(
      {
        error: "captcha-failed",
        message: "We could not verify that you are human. Reload the page and try again.",
      },
      { status: 403 },
    );

    if (!token) return rejected;

    let verdict: SiteverifyResponse | null = null;

    try {
      const response = await fetch(SITEVERIFY_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: token,
          ...(forwarded ? { remoteip: forwarded } : {}),
        }),
        cache: "no-store",
      });
      verdict = (await response.json()) as SiteverifyResponse;
    } catch (error) {
      console.error("Contact form: Turnstile verification failed", error);
    }

    if (!verdict?.success) {
      console.warn("Contact form: Turnstile rejected a submission", verdict?.["error-codes"]);
      return rejected;
    }
  }

  const enquiry = {
    source: `${site.url}/enterprise`,
    receivedAt: new Date().toISOString(),
    name,
    email,
    company,
    teamSize,
    software,
    message,
  };

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const subject = `DCCMCP enquiry — ${company || name}`;
  const text = [
    `Name:      ${name}`,
    `Email:     ${email}`,
    company && `Company:   ${company}`,
    teamSize && `Team size: ${teamSize}`,
    software.length && `Software:  ${software.join(", ")}`,
    `Received:  ${enquiry.receivedAt}`,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 16px">DCCMCP enquiry</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    <tr><td style="padding:2px 12px 2px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding:2px 12px 2px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    ${company ? `<tr><td style="padding:2px 12px 2px 0;color:#666">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
    ${teamSize ? `<tr><td style="padding:2px 12px 2px 0;color:#666">Team size</td><td>${escapeHtml(teamSize)}</td></tr>` : ""}
    ${software.length ? `<tr><td style="padding:2px 12px 2px 0;color:#666">Software</td><td>${escapeHtml(software.join(", "))}</td></tr>` : ""}
    <tr><td style="padding:2px 12px 2px 0;color:#666">Received</td><td>${escapeHtml(enquiry.receivedAt)}</td></tr>
  </table>
  <h3 style="margin:20px 0 6px">Message</h3>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
</div>`;

  const zeptoKey = process.env.ZEPTOMAIL_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? `${site.name} <support@${site.domain}>`;

  if (zeptoKey && toEmail) {
    // ZeptoMail wants the bare address and an optional display name in separate
    // fields, so a `Name <addr>` string has to be split apart here.
    const from = parseAddress(fromEmail);

    try {
      const response = await fetch(zeptoEndpoint(), {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Zoho-enczapikey ${zeptoKey}`,
        },
        body: JSON.stringify({
          from,
          to: [{ email_address: { address: toEmail } }],
          // ZeptoMail is inconsistent here: `to` nests under email_address,
          // `reply_to` takes the address at the top level.
          reply_to: [{ address: email, name }],
          subject,
          textbody: text,
          htmlbody: html,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error("ZeptoMail rejected the enquiry:", response.status, detail);
        throw new Error(`ZeptoMail responded ${response.status}`);
      }

      return NextResponse.json({ ok: true, delivered: true, via: "zeptomail" });
    } catch (error) {
      console.error("Contact form: ZeptoMail transport failed", error);
      return NextResponse.json(
        {
          error: "transport-failed",
          message: `We could not deliver that just now. Email ${site.email} and we will pick it up.`,
        },
        { status: 502 },
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && toEmail) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject,
          text,
          html,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error("Resend rejected the enquiry:", response.status, detail);
        throw new Error(`Resend responded ${response.status}`);
      }

      return NextResponse.json({ ok: true, delivered: true, via: "resend" });
    } catch (error) {
      console.error("Contact form: Resend transport failed", error);
      return NextResponse.json(
        {
          error: "transport-failed",
          message: `We could not deliver that just now. Email ${site.email} and we will pick it up.`,
        },
        { status: 502 },
      );
    }
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    return NextResponse.json(
      {
        error: "no-transport",
        message: `The contact endpoint is not configured on this deployment. Please email ${site.email} and we will reply within one business day.`,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(enquiry),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Upstream responded ${response.status}`);
    return NextResponse.json({ ok: true, delivered: true, via: "webhook" });
  } catch (error) {
    console.error("Contact form: webhook transport failed", error);
    return NextResponse.json(
      {
        error: "transport-failed",
        message: `We could not deliver that just now. Email ${site.email} and we will pick it up.`,
      },
      { status: 502 },
    );
  }
}

/** ZeptoMail runs regional API hosts; the default is the global one. */
function zeptoEndpoint() {
  return process.env.ZEPTOMAIL_API_URL ?? "https://api.zeptomail.com/v1.1/email";
}

/** Split `Display Name <addr@example.com>` into ZeptoMail's address shape. */
function parseAddress(value: string) {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);

  if (!match) return { address: value.trim() };

  const [, name, address] = match;
  return name ? { address, name } : { address };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
