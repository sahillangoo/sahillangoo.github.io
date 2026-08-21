# Email Auto-Responder Setup Guide & Templates

This document contains templates tailored for **Hostinger hPanel Email Autoresponder**, as well as full-stack transactional mailers, configured for `hello@sahillangoo.in`.

---

## ⚠️ Why Advanced `<style>` Templates Break in Hostinger hPanel

When you configure an autoresponder inside **Hostinger hPanel** (or Titan Email / Roundcube webmail):

1. **`<style>` and `<head>` tags are stripped out**: Hostinger's sanitization engine strips `<head>`, `<style>`, and media queries. When classes (`.text-primary`, `.email-bg`, etc.) lose their definitions, the text reverts to browser defaults and links turn into generic bright blue text (`#0000EE`).
2. **The Fix**: The simplified Hostinger template below uses **100% inline `style="..."` attributes on every single tag** with explicit `#000000` text and link styling. It does not rely on `<head>` or external CSS.

---

## 📋 Option 1: Hostinger hPanel HTML Template (100% Inline Styles)

> **How to apply in Hostinger**:
>
> 1. In **Hostinger hPanel** &rarr; **Emails** &rarr; **Autoresponders** &rarr; **Add Autoresponder**.
> 2. Set Subject to: `Your message arrived — Sahil Langoo`
> 3. If the message editor has an **HTML / Source (`<>`)** button, click it and paste the code below.
> 4. Save and send a test email.

```html
<div
  style="background-color: #f4f4f5; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;"
>
  <div
    style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden;"
  >
    <!-- Top Header -->
    <div style="padding: 20px 24px; border-bottom: 1px solid #e4e4e7; background-color: #ffffff;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td align="left" style="vertical-align: middle;">
            <span
              style="display: inline-block; width: 32px; height: 32px; line-height: 32px; text-align: center; background-color: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: 700; color: #000000; margin-right: 10px;"
            >
              SL
            </span>
            <strong style="font-size: 15px; color: #000000; letter-spacing: -0.02em;">
              Sahil Langoo
            </strong>
            <span
              style="font-size: 12px; color: #666666; font-family: 'Courier New', Courier, monospace;"
            >
              &bull; Systems Engineer
            </span>
          </td>
          <td align="right" style="vertical-align: middle;">
            <span
              style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #16a34a; font-weight: 600; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 4px;"
            >
              &#9679; in the terminal
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Body Copy -->
    <div style="padding: 24px 24px 20px 24px; color: #222222; line-height: 1.6; font-size: 14px;">
      <div
        style="font-family: 'Courier New', Courier, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #777777; margin-bottom: 8px; font-weight: 600;"
      >
        Human-to-Human Handshake
      </div>

      <h2
        style="margin: 0 0 16px 0; font-size: 19px; font-weight: 700; color: #000000; letter-spacing: -0.02em; line-height: 1.3;"
      >
        Your message survived the internet.
      </h2>

      <p style="margin: 0 0 14px 0; color: #333333; font-size: 14px; line-height: 1.6;">
        This is an automated receipt because I am currently neck-deep in code, untangling an edge
        routing bug, or actively avoiding an unnecessary meeting.
      </p>

      <p style="margin: 0 0 14px 0; color: #333333; font-size: 14px; line-height: 1.6;">
        Your email is safely resting in my inbox at
        <strong style="color: #000000;">hello@sahillangoo.in</strong>
        . Unlike modern web frameworks, I do not require 400 npm dependencies or hallucinate
        responses. A real human with strong opinions on type safety and minimalist architecture will
        read and reply within
        <strong>24 to 48 hours</strong>
        .
      </p>

      <p
        style="margin: 0 0 20px 0; color: #666666; font-size: 13px; font-style: italic; line-height: 1.5;"
      >
        (Unless this is an unsolicited sales pitch for generic offshore lead-gen, in which case it
        has already met the void).
      </p>

      <!-- Section: Links & Resources -->
      <div style="border-top: 1px solid #e4e4e7; padding-top: 18px; margin-top: 18px;">
        <div
          style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #555555; margin-bottom: 12px;"
        >
          Things I built while avoiding email:
        </div>

        <table
          role="presentation"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin-bottom: 8px;"
        >
          <tr>
            <td
              style="padding: 10px 12px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px; margin-bottom: 8px;"
            >
              <a
                href="https://sahillangoo.in/projects/"
                style="color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; font-family: 'Courier New', Courier, monospace; display: block;"
              >
                &rarr; Selected Systems
              </a>
              <span style="font-size: 11px; color: #666666; display: block; margin-top: 2px;">
                Proof that sites don't need 10MB of JavaScript
              </span>
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin-bottom: 8px;"
        >
          <tr>
            <td
              style="padding: 10px 12px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px;"
            >
              <a
                href="https://sahillangoo.in/blog/"
                style="color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; font-family: 'Courier New', Courier, monospace; display: block;"
              >
                &rarr; Engineering Essays
              </a>
              <span style="font-size: 11px; color: #666666; display: block; margin-top: 2px;">
                Rants on edge proxies, simplicity & TypeScript
              </span>
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin-bottom: 8px;"
        >
          <tr>
            <td
              style="padding: 10px 12px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px;"
            >
              <a
                href="https://github.com/SquadCoders"
                style="color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; font-family: 'Courier New', Courier, monospace; display: block;"
              >
                &rarr; SquadCoders Studio
              </a>
              <span style="font-size: 11px; color: #666666; display: block; margin-top: 2px;">
                Software studio engineering fast web platforms
              </span>
            </td>
          </tr>
        </table>

        <table
          role="presentation"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin-bottom: 16px;"
        >
          <tr>
            <td
              style="padding: 10px 12px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 6px;"
            >
              <a
                href="https://sahillangoo.in/notes/"
                style="color: #000000; text-decoration: none; font-weight: 700; font-size: 13px; font-family: 'Courier New', Courier, monospace; display: block;"
              >
                &rarr; Digital Garden
              </a>
              <span style="font-size: 11px; color: #666666; display: block; margin-top: 2px;">
                Atomic TILs & half-formed ideas
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Action Buttons -->
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="margin-top: 8px;"
      >
        <tr>
          <td>
            <a
              href="https://sahillangoo.in/projects/"
              style="display: inline-block; padding: 8px 16px; background-color: #000000; color: #ffffff; font-size: 11px; font-weight: 700; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; text-decoration: none;"
            >
              Explore Systems &rarr;
            </a>
          </td>
          <td style="padding-left: 10px;">
            <a
              href="https://sahillangoo.in/resume/"
              style="display: inline-block; padding: 7px 14px; background-color: #ffffff; border: 1px solid #cccccc; color: #000000; font-size: 11px; font-weight: 700; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 4px; text-decoration: none;"
            >
              View Resume
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Footer Signature -->
    <div style="padding: 16px 24px; background-color: #fafafa; border-top: 1px solid #e4e4e7;">
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td align="left" style="vertical-align: middle;">
            <strong style="font-size: 13px; color: #000000; display: block;">Sahil Langoo</strong>
            <span
              style="font-size: 11px; color: #666666; font-family: 'Courier New', Courier, monospace;"
            >
              <a
                href="https://github.com/SquadCoders"
                style="color: #000000; font-weight: 700; text-decoration: none;"
              >
                @SquadCoders
              </a>
              &bull;
              <a href="https://sahillangoo.in" style="color: #555555; text-decoration: none;">
                sahillangoo.in
              </a>
            </span>
          </td>
          <td
            align="right"
            style="vertical-align: middle; font-family: 'Courier New', Courier, monospace; font-size: 11px;"
          >
            <a
              href="https://github.com/sahillangoo"
              style="color: #444444; text-decoration: none; font-weight: 600;"
            >
              GitHub
            </a>
            <span style="color: #cccccc;">&bull;</span>
            <a
              href="https://linkedin.com/in/sahillangoo"
              style="color: #444444; text-decoration: none; font-weight: 600;"
            >
              LinkedIn
            </a>
            <span style="color: #cccccc;">&bull;</span>
            <a
              href="https://twitter.com/kashurgeek"
              style="color: #444444; text-decoration: none; font-weight: 600;"
            >
              X
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Disclaimer Footer -->
  <div
    style="max-width: 540px; margin: 10px auto 0 auto; text-align: center; font-size: 10px; color: #888888; font-family: 'Courier New', Courier, monospace;"
  >
    Automated acknowledgment sent in response to your email to hello@sahillangoo.in.
  </div>
</div>
```

---

## ✉️ Option 2: Hostinger hPanel Plain-Text Template (Universal & Clean)

> If your Hostinger autoresponder is set to standard Plain Text mode (no HTML support), paste this:

### Subject Line:

```text
Your message arrived — Sahil Langoo
```

### Body:

```text
Hi there,

This is an automated confirmation because I am currently neck-deep in code, untangling an edge routing bug, or actively avoiding an unnecessary meeting.

Your email is resting safely in my inbox at hello@sahillangoo.in. Unlike modern web frameworks, I do not require 400 npm dependencies or hallucinate responses. A real human with strong opinions on type safety and minimalist architecture will read and reply within 24 to 48 hours.

(Unless this is an unsolicited sales pitch for generic offshore lead-gen, in which case it has already met the void).

In the meantime, feel free to explore what I build when I'm not answering emails:
• Selected Systems (proof sites don't need 10MB JS): https://sahillangoo.in/projects/
• Engineering Essays (rants on edge simplicity): https://sahillangoo.in/blog/
• Digital Garden (atomic TILs & half-formed ideas): https://sahillangoo.in/notes/
• SquadCoders Studio (where we build fast software): https://github.com/SquadCoders
• GitHub (actual code): https://github.com/sahillangoo

Best regards,

Sahil Langoo
Full Stack Systems Engineer & Co-Founder at @SquadCoders
Website: https://sahillangoo.in
Studio: https://github.com/SquadCoders
Email: hello@sahillangoo.in
```

---

## 🏛️ Option 3: Preserved Advanced Responsive Dark/Light Template

For external transactional providers (Postmark, Resend, Cloudflare Email Workers, SendGrid), the full responsive dark/light mode template is preserved at:

- **File**: [`docs/email-template-advanced.html`](file:///d:/sandbox/work-box/sahillangoo-portfolio/docs/email-template-advanced.html)
