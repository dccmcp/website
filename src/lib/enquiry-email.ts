/**
 * The one email template every transport uses.
 *
 * Email clients are decades behind browsers: no flexbox, no grid, patchy
 * support for <style> blocks in the head, and Outlook desktop renders through
 * Word. So the layout is nested tables with inline styles on every element,
 * a 600px container that collapses on mobile, and web-safe font stacks.
 * Everything is inlined on purpose — do not move these rules into a stylesheet.
 */

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  software: string[];
  message: string;
  receivedAt: string;
  source: string;
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

const INK = "#0A0A0B";
const MINT = "#2DD4BF";
const MINT_SOFT = "#5EEAD4";
const BODY = "#111827";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const LINE = "#E6E8EB";

export function buildEnquiryEmail(enquiry: Enquiry) {
  const { name, email, company, teamSize, software, message, receivedAt, source } = enquiry;

  const headline = company || name;
  const when = formatReceived(receivedAt);
  const subject = `DCCMCP enquiry — ${headline}`;

  const text = [
    `DCCMCP — enterprise enquiry`,
    `${"—".repeat(46)}`,
    "",
    `Name:      ${name}`,
    `Email:     ${email}`,
    company && `Company:   ${company}`,
    teamSize && `Team size: ${teamSize}`,
    software.length && `Software:  ${software.join(", ")}`,
    `Received:  ${receivedAt}`,
    "",
    "Message",
    `${"—".repeat(46)}`,
    message,
    "",
    `${"—".repeat(46)}`,
    `Sent from the contact form at ${source}. Reply to this email to reach ${name}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const detailRows = [
    row("Name", escapeHtml(name)),
    row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0F766E;text-decoration:none;">${escapeHtml(email)}</a>`),
    company ? row("Company", escapeHtml(company)) : "",
    teamSize ? row("Team size", escapeHtml(teamSize)) : "",
    software.length ? row("Software", software.map(chip).join(" ")) : "",
    row("Received", `${escapeHtml(when)}`, true),
  ]
    .filter(Boolean)
    .join("");

  const preheader = [headline, software.join(", "), teamSize && `${teamSize} people`]
    .filter(Boolean)
    .join(" · ");

  const html = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F7;">
<div style="display:none;font-size:1px;color:#F4F5F7;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F5F7;">
  <tr>
    <td align="center" style="padding:28px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid ${LINE};border-radius:14px;overflow:hidden;">
        <tr>
          <td style="background:${INK};padding:20px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font:600 17px/1.2 ${FONT};color:#FFFFFF;letter-spacing:0.2px;">DCCMCP</td>
                <td align="right" style="font:500 10px/1.2 ${MONO};color:${MINT_SOFT};letter-spacing:1.8px;text-transform:uppercase;">Enterprise enquiry</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="height:3px;background:${MINT};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:28px 28px 4px;">
            <div style="font:600 22px/1.3 ${FONT};color:${INK};letter-spacing:-0.2px;">${escapeHtml(headline)}</div>
            <div style="font:400 13.5px/1.5 ${FONT};color:${MUTED};padding-top:6px;">New enquiry from dccmcp.com</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${detailRows}</table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px 0;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:${INK};color:#FFFFFF;font:600 14px/1 ${FONT};text-decoration:none;padding:13px 22px;border-radius:9px;">Reply to ${escapeHtml(name)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 28px 0;">
            <div style="font:600 10px/1 ${MONO};color:${FAINT};letter-spacing:1.6px;text-transform:uppercase;padding-bottom:10px;">Message</div>
            <div style="border-left:3px solid ${MINT};background:#F8FAFB;border-radius:0 10px 10px 0;padding:16px 18px;font:400 14.5px/1.7 ${FONT};color:${BODY};">${nl2br(message)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 28px 28px;">
            <div style="border-top:1px solid ${LINE};padding-top:16px;font:400 12px/1.7 ${FONT};color:${FAINT};">
              Sent from the contact form at <a href="${escapeHtml(source)}" style="color:#0F766E;text-decoration:none;">${escapeHtml(source)}</a>. Replying to this email reaches ${escapeHtml(name)} directly.
            </div>
          </td>
        </tr>
      </table>
      <div style="font:400 11px/1.6 ${FONT};color:${FAINT};max-width:600px;padding-top:14px;">
        DCCMCP · MCP servers for DCC, CAD, GIS and vision software
      </div>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}

function row(label: string, value: string, faint = false) {
  return `<tr>
  <td width="132" valign="top" style="padding:9px 16px 9px 0;border-bottom:1px solid #F1F2F4;font:600 10px/1.6 ${MONO};color:${FAINT};letter-spacing:1.4px;text-transform:uppercase;">${label}</td>
  <td valign="top" style="padding:9px 0;border-bottom:1px solid #F1F2F4;font:400 ${faint ? "13px" : "14.5px"}/1.6 ${FONT};color:${faint ? MUTED : BODY};">${value}</td>
</tr>`;
}

function chip(value: string) {
  return `<span style="display:inline-block;background:#EEF7F6;border:1px solid #D6EDEA;color:#0F766E;font:500 12.5px/1 ${FONT};padding:6px 10px;border-radius:999px;margin:0 6px 6px 0;">${escapeHtml(value)}</span>`;
}

/** `2026-09-20T12:40:11.482Z` → `20 Sep 2026, 12:40 UTC` */
function formatReceived(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const stamp = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
  return `${stamp} UTC`;
}

/**
 * Email clients disagree about `white-space: pre-wrap`, so newlines become
 * explicit <br> after escaping. Escaping first also means a message containing
 * markup cannot inject anything into the mail body.
 */
function nl2br(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
