import {
  MAIL_FROM_DEFAULT,
  MAIL_FROM_EMAIL,
  MAIL_FROM_NAME,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SLOGAN,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/email/config";

const PAPER = "#fafaf8";
const INK = "#0d0d0d";
const MUTED = "#3e3e3c";
const SOFT = "#6e6e6b";
const ACCENT = "#facf48";
const ACCENT_FG = "#0d0d0d";
const LINE = "#e5e4e2";
const WHITE = "#ffffff";

export type ContactEmailPayload = {
  name: string;
  email: string;
  topic: string;
  topicLabel: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapEmail(params: {
  eyebrow: string;
  title: string;
  subtitle: string;
  bodyHtml: string;
  ctaHref?: string;
  ctaLabel?: string;
  footerNote: string;
}): string {
  const cta =
    params.ctaHref && params.ctaLabel
      ? `<tr>
          <td style="padding:8px 28px 28px;">
            <a href="${params.ctaHref}" style="display:inline-block;background:${ACCENT};color:${ACCENT_FG};text-decoration:none;padding:12px 22px;font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;border-radius:0;">${params.ctaLabel}</a>
          </td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(params.title)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${PAPER};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:${WHITE};border:1px solid ${LINE};border-radius:0;">
        <tr>
          <td style="padding:0;background:${INK};">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:22px 28px 18px;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:600;color:${WHITE};">
                    WING CHUN <span style="color:${ACCENT};">STUTENSEE</span>
                  </p>
                  <p style="margin:8px 0 0;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.55);">${escapeHtml(SITE_TAGLINE)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 28px 12px;border-bottom:1px solid ${LINE};">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:${SOFT};">${escapeHtml(params.eyebrow)}</p>
            <h1 style="margin:12px 0 0;font-size:26px;line-height:1.2;letter-spacing:-0.02em;font-weight:500;color:${INK};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(params.title)}</h1>
            <div style="margin:14px 0 0;height:3px;width:44px;background:${ACCENT};"></div>
            <p style="margin:14px 0 0;font-size:15px;line-height:1.55;color:${MUTED};">${params.subtitle}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;font-size:15px;line-height:1.7;color:${MUTED};">${params.bodyHtml}</td>
        </tr>
        ${cta}
        <tr>
          <td style="padding:18px 28px;background:${PAPER};border-top:1px solid ${LINE};">
            <p style="margin:0;font-size:12px;color:${SOFT};line-height:1.6;">
              ${escapeHtml(SITE_NAME)} ·
              <a href="${SITE_URL}" style="color:${SOFT};text-decoration:none;">wingchun-stutensee.de</a> ·
              <a href="mailto:${SITE_EMAIL}" style="color:${SOFT};text-decoration:none;">${SITE_EMAIL}</a>
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:${SOFT};line-height:1.5;">${escapeHtml(SITE_SLOGAN)}</p>
            <p style="margin:8px 0 0;font-size:11px;color:${SOFT};">${params.footerNote}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function mailFrom(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim() || MAIL_FROM_DEFAULT;
  return from.includes("<") ? from : `${MAIL_FROM_NAME} <${from}>`;
}

function notifyTo(): string {
  return process.env.INQUIRY_NOTIFY_EMAIL?.trim() || SITE_EMAIL;
}

export function assertResendReady(): string | null {
  if (!process.env.RESEND_API_KEY?.trim()) return "RESEND_API_KEY fehlt";
  return null;
}

async function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  const { Resend } = await import("resend");
  return new Resend(key);
}

export async function sendContactEmails(
  payload: ContactEmailPayload,
): Promise<void> {
  const resend = await getResend();
  if (!resend) throw new Error("Resend nicht konfiguriert");

  const from = mailFrom();
  const firstName = payload.name.trim().split(/\s+/)[0] || "dort";

  const notifyHtml = wrapEmail({
    eyebrow: "Notification",
    title: "Neue Kontaktanfrage",
    subtitle: `${escapeHtml(payload.topicLabel)} · ${escapeHtml(payload.name)}`,
    bodyHtml: `
      <p><strong style="color:${INK};">Von:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p>
      <p><strong style="color:${INK};">Thema:</strong> ${escapeHtml(payload.topicLabel)}</p>
      <p><strong style="color:${INK};">Nachricht:</strong><br>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
    `,
    ctaHref: `${SITE_URL}/kontakt`,
    ctaLabel: "Zum Kontakt",
    footerNote: `Intern — Absender ${MAIL_FROM_EMAIL}`,
  });

  const confirmHtml = wrapEmail({
    eyebrow: SITE_NAME,
    title: "Nachricht angekommen",
    subtitle: "Danke — wir melden uns bei Dir.",
    bodyHtml: `
      <p>Hallo ${escapeHtml(firstName)},</p>
      <p>deine Nachricht (${escapeHtml(payload.topicLabel)}) ist angekommen. Wir antworten von <strong style="color:${INK};">${SITE_EMAIL}</strong>.</p>
      <p style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid ${LINE};font-size:13px;color:${SOFT};">Ein Probetraining ist kostenfrei und unverbindlich. Bring bequeme Sportkleidung und etwas zu trinken mit.</p>
    `,
    ctaHref: SITE_URL,
    ctaLabel: "Zur Website",
    footerNote: "Automatische Bestätigung nach deiner Anfrage.",
  });

  const notify = await resend.emails.send({
    from,
    to: notifyTo(),
    replyTo: payload.email,
    subject: `Kontakt: ${payload.topicLabel} — ${payload.name}`,
    html: notifyHtml,
  });
  if (notify.error) throw new Error(notify.error.message);

  const confirm = await resend.emails.send({
    from,
    to: payload.email,
    replyTo: SITE_EMAIL,
    subject: `Deine Nachricht bei ${SITE_NAME}`,
    html: confirmHtml,
  });
  if (confirm.error) throw new Error(confirm.error.message);
}
