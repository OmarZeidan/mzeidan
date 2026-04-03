"use server"

import nodemailer from "nodemailer"
import { headers } from "next/headers"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipToTimestamps = new Map<string, number[]>()

function isRateLimited(ip: string | null): boolean {
  if (!ip) return false
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const recent = (ipToTimestamps.get(ip) ?? []).filter((t) => t > windowStart)
  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  ipToTimestamps.set(ip, recent)
  return false
}

function sanitize(input: unknown): string {
  if (typeof input !== "string") return ""
  return input.replace(/[\u0000-\u001F\u007F]/g, "").replace(/[<>]/g, "").trim()
}

export async function sendContactEmail(prevState: unknown, formData: FormData) {
  try {
    const honey = sanitize(formData.get("company"))
    if (honey) return { success: false, error: "Bot detected." }

    const h = await headers()
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      null

    if (isRateLimited(ip)) {
      return { success: false, error: "طلبات كثيرة، يرجى المحاولة لاحقاً" }
    }

    const name = sanitize(formData.get("name"))
    const email = sanitize(formData.get("email"))
    const message = sanitize(formData.get("message"))

    if (!name || !email || !message) {
      return { success: false, error: "يرجى ملء جميع الحقول المطلوبة" }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return { success: false, error: "يرجى إدخال بريد إلكتروني صحيح" }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const submittedAt = new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      hour12: false,
    })

    await transporter.sendMail({
      from: `"مدوّنة محمّد زيدان" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `رسالة جديدة من ${name} — مدوّنة محمّد زيدان`,
      text: [
        `رسالة جديدة من ${name}`,
        ``,
        `الاسم: ${name}`,
        `البريد: ${email}`,
        ``,
        `الرسالة:`,
        message,
        ``,
        `أُرسلت في: ${submittedAt}`,
      ].join("\n"),
      html: `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
        <body style="margin:0;padding:0;background:#f4efe8;font-family:'Helvetica Neue',Arial,sans-serif">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe8;padding:40px 16px">
            <tr><td align="center">
              <table width="100%" style="max-width:560px">

                <!-- Header -->
                <tr><td style="padding-bottom:24px;text-align:right">
                  <span style="display:inline-flex;align-items:center;gap:8px">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#a07850"></span>
                    <span style="font-size:15px;font-weight:700;color:#2c2c2c;letter-spacing:-0.3px">محمّد زيدان</span>
                  </span>
                </td></tr>

                <!-- Card -->
                <tr><td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">

                  <!-- Card header -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="background:#a07850;padding:20px 28px">
                      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.75)">رسالة جديدة</p>
                      <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3">
                        من ${name}
                      </h1>
                    </td></tr>
                  </table>

                  <!-- Sender info -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:24px 28px 0">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f3;border-radius:10px;border:1px solid #ede5d8">
                        <tr>
                          <td style="padding:14px 18px;border-bottom:1px solid #ede5d8">
                            <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.08em">الاسم</p>
                            <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#2c2c2c">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:14px 18px">
                            <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.08em">البريد الإلكتروني</p>
                            <p style="margin:4px 0 0;font-size:14px;font-weight:600">
                              <a href="mailto:${email}" style="color:#a07850;text-decoration:none" dir="ltr">${email}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td></tr>
                  </table>

                  <!-- Message -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:20px 28px">
                      <p style="margin:0 0 10px;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.08em">الرسالة</p>
                      <p style="margin:0;font-size:15px;line-height:1.85;color:#3a3a3a;white-space:pre-wrap">${message}</p>
                    </td></tr>
                  </table>

                  <!-- Reply CTA -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:0 28px 28px">
                      <a href="mailto:${email}" style="display:inline-block;background:#a07850;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 22px;border-radius:999px">
                        الرد على ${name}
                      </a>
                    </td></tr>
                  </table>

                </td></tr>

                <!-- Footer -->
                <tr><td style="padding:20px 4px 0;text-align:right">
                  <p style="margin:0;font-size:12px;color:#a0967e">أُرسلت في: ${submittedAt}</p>
                  <p style="margin:4px 0 0;font-size:12px;color:#bbb">من نموذج التواصل في مدوّنة محمّد زيدان</p>
                </td></tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    })

    return { success: true, error: null }
  } catch (err) {
    console.error("[contact] sendMail error:", err)
    return { success: false, error: "حدث خطأ، يرجى المحاولة لاحقاً" }
  }
}
