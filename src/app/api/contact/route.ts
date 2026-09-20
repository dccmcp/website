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
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Transport resolution order:
 *   1. RESEND_API_KEY + CONTACT_TO_EMAIL  → send the enquiry as an email
 *   2. CONTACT_WEBHOOK_URL                → POST the payload as JSON
 *   3. neither                            → 503 so the form can fall back to mailto
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

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "DCCMCP <onboarding@resend.dev>";

  if (resendKey && toEmail) {
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
