import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
  });
}

export async function sendContactEmails(name, email, phone) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASS) return;
  const transport = createTransport();
  const adminEmail = process.env.EMAIL_USER;

  await Promise.all([
    transport.sendMail({
      from: `"11x Square" <${adminEmail}>`,
      to: adminEmail,
      subject: `New Contact Inquiry — ${name}`,
      html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0D1117;color:#F0F7FF;padding:32px;border-radius:12px;border:1px solid rgba(14,165,233,0.2);">
  <h2 style="color:#0EA5E9;margin:0 0 4px 0;font-size:20px;">New Contact Inquiry</h2>
  <p style="color:#64748B;margin:0 0 24px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Received via 11xsquare.com</p>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#94A3B8;font-size:13px;width:80px;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#F0F7FF;font-size:13px;font-weight:600;">${name}</td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#94A3B8;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#F0F7FF;font-size:13px;">${email}</td></tr>
    <tr><td style="padding:10px 0;color:#94A3B8;font-size:13px;">Phone</td><td style="padding:10px 0;color:#F0F7FF;font-size:13px;">${phone}</td></tr>
  </table>
  <a href="https://11xsquare.com/api/contacts" style="display:inline-block;margin-top:24px;padding:10px 24px;background:#0EA5E9;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">View All Inquiries</a>
</div>`,
    }),
    transport.sendMail({
      from: `"11x Square" <${adminEmail}>`,
      to: email,
      subject: "We received your inquiry — 11x Square",
      html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0D1117;color:#F0F7FF;padding:32px;border-radius:12px;border:1px solid rgba(14,165,233,0.2);">
  <h2 style="color:#0EA5E9;margin:0 0 16px 0;font-size:22px;">Hi ${name},</h2>
  <p style="color:#CBD5E1;line-height:1.7;margin:0 0 16px 0;">Thanks for reaching out to <strong style="color:#fff;">11x Square</strong>. We've received your inquiry and one of our team members will get back to you within <strong style="color:#0EA5E9;">24–48 hours</strong>.</p>
  <p style="color:#CBD5E1;line-height:1.7;margin:0 0 28px 0;">In the meantime, feel free to explore our services or connect with us directly on WhatsApp.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;">
    <a href="https://11xsquare.com" style="display:inline-block;padding:10px 24px;background:#0EA5E9;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">Visit 11x Square</a>
    <a href="https://wa.me/447778303743" style="display:inline-block;padding:10px 24px;background:rgba(14,165,233,0.12);color:#0EA5E9;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;border:1px solid rgba(14,165,233,0.3);">WhatsApp Us</a>
  </div>
  <p style="color:#475569;margin-top:32px;font-size:11px;letter-spacing:0.05em;">11x Square · Consulting · Talent · Technology</p>
</div>`,
    }),
  ]);
}

export async function sendApplicationEmails(name, email, resumeFileName) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASS) return;
  const transport = createTransport();
  const adminEmail = process.env.EMAIL_USER;

  await Promise.all([
    transport.sendMail({
      from: `"11x Square" <${adminEmail}>`,
      to: adminEmail,
      subject: `New Job Application — ${name}`,
      html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0D1117;color:#F0F7FF;padding:32px;border-radius:12px;border:1px solid rgba(14,165,233,0.2);">
  <h2 style="color:#0EA5E9;margin:0 0 4px 0;font-size:20px;">New Job Application</h2>
  <p style="color:#64748B;margin:0 0 24px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Received via 11xsquare.com/careers</p>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#94A3B8;font-size:13px;width:80px;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#F0F7FF;font-size:13px;font-weight:600;">${name}</td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#94A3B8;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(14,165,233,0.1);color:#F0F7FF;font-size:13px;">${email}</td></tr>
    <tr><td style="padding:10px 0;color:#94A3B8;font-size:13px;">Resume</td><td style="padding:10px 0;color:#F0F7FF;font-size:13px;">${resumeFileName || "Not provided"}</td></tr>
  </table>
  <a href="https://11xsquare.com/api/applications" style="display:inline-block;margin-top:24px;padding:10px 24px;background:#0EA5E9;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">View All Applications</a>
</div>`,
    }),
    transport.sendMail({
      from: `"11x Square" <${adminEmail}>`,
      to: email,
      subject: "Application received — 11x Square",
      html: `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0D1117;color:#F0F7FF;padding:32px;border-radius:12px;border:1px solid rgba(14,165,233,0.2);">
  <h2 style="color:#0EA5E9;margin:0 0 16px 0;font-size:22px;">Hi ${name},</h2>
  <p style="color:#CBD5E1;line-height:1.7;margin:0 0 16px 0;">Your application to <strong style="color:#fff;">11x Square</strong> has been received! Our team will carefully review it and get back to you within <strong style="color:#0EA5E9;">3–5 business days</strong>.</p>
  <p style="color:#CBD5E1;line-height:1.7;margin:0 0 28px 0;">We're excited to learn more about you. While you wait, feel free to explore what we do and get to know the team.</p>
  <div style="background:rgba(14,165,233,0.06);border:1px solid rgba(14,165,233,0.15);border-radius:10px;padding:16px 20px;margin-bottom:28px;">
    <p style="color:#94A3B8;font-size:12px;margin:0 0 6px 0;text-transform:uppercase;letter-spacing:0.1em;">What happens next?</p>
    <ol style="color:#CBD5E1;font-size:13px;line-height:1.8;margin:0;padding-left:20px;">
      <li>Our talent team reviews your application</li>
      <li>We'll reach out to schedule a quick intro call</li>
      <li>Technical / cultural fit assessment</li>
      <li>Welcome to the pack 🐺</li>
    </ol>
  </div>
  <a href="https://11xsquare.com" style="display:inline-block;padding:10px 24px;background:#0EA5E9;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">Visit 11x Square</a>
  <p style="color:#475569;margin-top:32px;font-size:11px;letter-spacing:0.05em;">11x Square · Consulting · Talent · Technology</p>
</div>`,
    }),
  ]);
}
