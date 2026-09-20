import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Simple honeypot: real users never fill a hidden field.
  if (body.honey) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid work email address.";
  if (message.length < 12) errors.message = "Please describe what you are trying to deploy.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 422 });
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  // No CRM wired up yet: fail loudly instead of pretending the message was
  // delivered, so the form can hand the visitor a direct mailto fallback.
  if (!endpoint) {
    return NextResponse.json(
      {
        error: "no-transport",
        message:
          "The contact endpoint is not configured on this deployment. Please email support@dccmcp.com and we will reply within one business day.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "dccmcp.com/enterprise",
        receivedAt: new Date().toISOString(),
        name,
        email,
        company: body.company?.trim() ?? "",
        teamSize: body.teamSize ?? "",
        software: body.software ?? [],
        message,
      }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`Upstream responded ${response.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json(
      {
        error: "transport-failed",
        message: "We could not deliver that just now. Email support@dccmcp.com and we will pick it up.",
      },
      { status: 502 },
    );
  }
}
