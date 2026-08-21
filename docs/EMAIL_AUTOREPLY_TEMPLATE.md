# Automated Email Auto-Responder Template

This template is designed for the email auto-responder / vacation reply configured on your email hosting provider (Proton Mail, Cloudflare Email Routing, Google Workspace, Fastmail, or cPanel) for `hey@sahillangoo.in`.

---

## ✉️ Option 1: Plain Text Template (Recommended for Universal Compatibility)

### Subject Line:
```text
Received: Re: {{subject}} — Sahil Langoo
```
*(Or if your provider uses a fixed subject)*:
```text
Thanks for reaching out — Sahil Langoo
```

### Body:
```text
Hi there,

Thanks for reaching out! This is an automated confirmation to let you know that your message has landed safely in my inbox at hey@sahillangoo.in.

I typically review and reply to emails within 24–48 hours (Monday through Friday). If your inquiry is regarding a high-impact software engineering project, architecture consulting, or collaboration with SquadCoders, I will get back to you with next steps as soon as possible.

In the meantime, feel free to explore:
• Case Studies & Engineered Systems: https://sahillangoo.in/projects/
• Technical Journal & Architecture Essays: https://sahillangoo.in/blog/
• Digital Garden & TIL Notes: https://sahillangoo.in/notes/
• Verified Profiles & Code: https://github.com/sahillangoo | https://linkedin.com/in/sahillangoo

Looking forward to connecting!

Best regards,

Sahil Langoo
Full Stack Systems Engineer & Co-Founder at @SquadCoders
Website: https://sahillangoo.in
Email: hey@sahillangoo.in
```

---

## 🎨 Option 2: Clean Minimalist HTML Template (For Providers Supporting HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for reaching out — Sahil Langoo</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9fb; color: #1e1e24; line-height: 1.6;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e5ea; border-radius: 8px; padding: 32px 28px;">
    
    <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8b5cf6; margin-bottom: 8px; font-weight: 600;">
      Automated Receipt Confirmation
    </div>

    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #111116;">
      Thanks for getting in touch!
    </h2>

    <p style="margin: 0 0 16px 0; font-size: 14px; color: #3f3f46;">
      Your message has reached my inbox at <strong style="color: #111116;">hey@sahillangoo.in</strong>.
    </p>

    <p style="margin: 0 0 20px 0; font-size: 14px; color: #3f3f46;">
      I review every incoming inquiry carefully and typically reply within <strong>24 to 48 hours</strong>. If you are reaching out regarding systems engineering, full-stack consulting, or partnership opportunities, I will follow up with specific next steps shortly.
    </p>

    <div style="background-color: #f4f4f7; border-left: 3px solid #8b5cf6; padding: 14px 16px; border-radius: 4px; margin-bottom: 24px;">
      <span style="font-size: 12px; font-weight: 600; color: #111116; font-family: 'SFMono-Regular', Consolas, monospace; display: block; margin-bottom: 6px;">
        Quick Resources & Selected Work:
      </span>
      <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #52525b;">
        <li style="margin-bottom: 4px;"><a href="https://sahillangoo.in/projects/" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">Case Studies & Projects &rarr;</a></li>
        <li style="margin-bottom: 4px;"><a href="https://sahillangoo.in/blog/" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">Engineering Essays & Journal &rarr;</a></li>
        <li style="margin-bottom: 4px;"><a href="https://sahillangoo.in/notes/" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">Digital Garden & TIL Notes &rarr;</a></li>
        <li><a href="https://github.com/sahillangoo" style="color: #8b5cf6; text-decoration: none; font-weight: 500;">GitHub Activity & Code Repositories &rarr;</a></li>
      </ul>
    </div>

    <p style="margin: 0 0 24px 0; font-size: 14px; color: #3f3f46;">
      Looking forward to speaking with you!
    </p>

    <div style="border-top: 1px solid #e5e5ea; padding-top: 16px; font-size: 13px; color: #71717a;">
      <strong style="color: #111116; display: block; font-size: 14px;">Sahil Langoo</strong>
      <span>Full Stack Systems Engineer &bull; Co-Founder at @SquadCoders</span><br>
      <a href="https://sahillangoo.in" style="color: #8b5cf6; text-decoration: none; font-size: 12px; font-family: monospace;">https://sahillangoo.in</a>
    </div>

  </div>
</body>
</html>
```
