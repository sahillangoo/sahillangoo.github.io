# Automated Email Auto-Responder Template

This template is designed for the automated email auto-responder / vacation reply configured on your email hosting provider (Proton Mail, Cloudflare Email Routing, Google Workspace, Fastmail, or cPanel) for `hello@sahillangoo.in`.

---

## 🎨 Option 1: Monochrome HTML Template (Dark & Light Mode Responsive)

This template adheres to the website's **editorial monochrome palette (black, white, obsidian, and zinc)** with **zero colored tinting or purple accents**. It uses standard table-based email markup compatible with Outlook (Windows/Mac/Web), Gmail (iOS/Android/Web), Apple Mail, Proton Mail, Thunderbird, and Superhuman.

### Key Architectural Details:
- **Pure Monochromatic Palette**: High-contrast obsidian (`#090A0C` / `#121316`) on dark mode, crisp neutral (`#FFFFFF` on `#F4F4F5`) on light mode.
- **Embedded SquadCoders Studio Link**: Explicitly highlights [@SquadCoders](https://github.com/SquadCoders) across resources and signature.
- **Cross-Client Table Architecture**: MSO conditional blocks, fluid mobile stacking, inline CSS properties, and touch targets $\ge 44\text{px}$.

### HTML Code:

```html
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thanks for reaching out — Sahil Langoo</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <style>
    table { border-collapse: collapse; }
    td,th,div,p,a,h1,h2,h3,span { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background-color: #F4F4F5;
      color: #09090B;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      color: #09090B;
      text-decoration: none;
    }

    /* Mobile Responsiveness */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        width: 100% !important;
        padding: 16px 8px !important;
      }
      .email-card {
        width: 100% !important;
      }
      .col-half {
        display: block !important;
        width: 100% !important;
        padding-right: 0 !important;
        padding-bottom: 10px !important;
      }
      .col-space {
        display: none !important;
      }
      .btn-row td {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-bottom: 8px !important;
      }
      .btn-row a {
        display: block !important;
        text-align: center !important;
      }
    }

    /* Dark Mode Overrides (Monochrome Obsidian Aesthetic) */
    @media (prefers-color-scheme: dark) {
      body, .email-bg {
        background-color: #090A0C !important;
      }
      .email-card {
        background-color: #121316 !important;
        border-color: #26282E !important;
      }
      .email-subcard {
        background-color: #181A1F !important;
        border-color: #2D3039 !important;
      }
      .email-subcard:hover {
        background-color: #21232B !important;
        border-color: #3F4350 !important;
      }
      .text-primary {
        color: #F4F4F5 !important;
      }
      .text-secondary {
        color: #A1A1AA !important;
      }
      .text-muted {
        color: #71717A !important;
      }
      .text-mono-brand {
        color: #E4E4E7 !important;
      }
      .border-divider {
        border-color: #26282E !important;
      }
      .tag-pill {
        background-color: #181A1F !important;
        border-color: #2D3039 !important;
        color: #E4E4E7 !important;
      }
      .avatar-badge {
        background-color: #181A1F !important;
        border-color: #3F4350 !important;
        color: #F4F4F5 !important;
      }
      .btn-primary {
        background-color: #F4F4F5 !important;
        color: #090A0C !important;
      }
      .btn-outline {
        border-color: #3F4350 !important;
        color: #F4F4F5 !important;
        background-color: #181A1F !important;
      }
      .btn-outline:hover {
        background-color: #26282E !important;
      }
      .card-link-title {
        color: #F4F4F5 !important;
      }
    }

    /* Outlook / Web Dark Mode Support */
    [data-ogsc] body, [data-ogsc] .email-bg { background-color: #090A0C !important; }
    [data-ogsc] .email-card { background-color: #121316 !important; border-color: #26282E !important; }
    [data-ogsc] .text-primary { color: #F4F4F5 !important; }
    [data-ogsc] .text-secondary { color: #A1A1AA !important; }
    [data-ogsc] .card-link-title { color: #F4F4F5 !important; }
  </style>
</head>
<body class="email-bg" style="margin: 0; padding: 32px 12px; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <!-- Outer Center Table -->
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" class="email-bg" style="background-color: #F4F4F5;">
    <tr>
      <td align="center" style="padding: 0 8px;">

        <!-- Hidden Preheader for Inbox Snippet Previews -->
        <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          Thanks for getting in touch! Your message was received at hello@sahillangoo.in. I'll get back to you within 24–48 hours.
          &#847; &zwnj; &nbsp; &#8199; &shy; &#847; &zwnj; &nbsp; &#8199; &shy; &#847; &zwnj; &nbsp; &#8199; &shy;
        </div>

        <!-- Main Card (Max Width 580px) -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" class="email-card" style="max-width: 580px; width: 100%; background-color: #FFFFFF; border: 1px solid #E4E4E7; border-radius: 8px; overflow: hidden;">
          
          <!-- Top Header: Monogram Avatar + Title + Availability Status -->
          <tr>
            <td style="padding: 24px 28px 18px 28px; border-bottom: 1px solid #E4E4E7;" class="border-divider">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Left: SL Monogram & Brand -->
                  <td align="left" style="vertical-align: middle;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <div class="avatar-badge" style="width: 38px; height: 38px; line-height: 38px; text-align: center; border-radius: 6px; background-color: #F4F4F5; border: 1px solid #E4E4E7; color: #09090B; font-family: 'SFMono-Regular', Consolas, Menlo, Monaco, monospace; font-size: 14px; font-weight: 700; letter-spacing: -0.02em;">
                            SL
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div class="text-primary" style="font-size: 15px; font-weight: 700; color: #09090B; letter-spacing: -0.02em;">
                            Sahil Langoo
                          </div>
                          <div class="text-secondary" style="font-size: 11px; color: #71717A; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; margin-top: 1px;">
                            Full Stack Systems Engineer
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Right: Availability Pill -->
                  <td align="right" style="vertical-align: middle;">
                    <div class="tag-pill" style="display: inline-block; padding: 4px 9px; background-color: #F4F4F5; border: 1px solid #E4E4E7; border-radius: 4px; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-size: 11px; font-weight: 600; color: #09090B;">
                      <span style="display: inline-block; width: 6px; height: 6px; background-color: #10B981; border-radius: 50%; margin-right: 4px; vertical-align: middle;"></span>
                      Available
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding: 28px 28px 24px 28px;">
              
              <!-- Eyebrow Badge -->
              <div class="text-muted" style="font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #71717A; font-weight: 600; margin-bottom: 8px;">
                AUTOMATED CONFIRMATION
              </div>

              <!-- Main Heading -->
              <h1 class="text-primary" style="margin: 0 0 16px 0; font-size: 22px; line-height: 1.25; font-weight: 700; color: #09090B; letter-spacing: -0.025em;">
                Thanks for reaching out!
              </h1>

              <!-- Message Body -->
              <p class="text-secondary" style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #3F3F46;">
                Your message has reached my primary inbox at <strong class="text-primary" style="color: #09090B; font-weight: 600;">hello@sahillangoo.in</strong>.
              </p>

              <p class="text-secondary" style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.65; color: #3F3F46;">
                I typically review and reply to all inquiries within <strong>24–48 hours</strong> (Monday through Friday). If your message is regarding a new web platform, architecture consulting, or engineering collaboration with <strong class="text-primary" style="color: #09090B;">SquadCoders</strong>, I will follow up with details and next steps shortly.
              </p>

              <!-- Selected Work & Resources Header -->
              <div class="text-muted" style="font-family: 'SFMono-Regular', Consolas, Monaco, monospace; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717A; margin-bottom: 12px; border-top: 1px solid #E4E4E7; padding-top: 20px;" class="border-divider">
                Selected Work & Systems
              </div>

              <!-- 2-Column Resource Grid (Monochrome) -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Card 1: Case Studies -->
                  <td width="48%" class="col-half" style="vertical-align: top; padding-bottom: 10px;">
                    <a href="https://sahillangoo.in/projects/" class="email-subcard" style="display: block; padding: 12px 14px; background-color: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 6px; text-decoration: none;">
                      <div class="card-link-title" style="font-size: 13px; font-weight: 700; color: #09090B; font-family: 'SFMono-Regular', Consolas, monospace;">
                        Selected Projects &rarr;
                      </div>
                      <div class="text-secondary" style="font-size: 11px; color: #71717A; line-height: 1.4; margin-top: 4px;">
                        9 production systems & tools
                      </div>
                    </a>
                  </td>

                  <td width="4%" class="col-space">&nbsp;</td>

                  <!-- Card 2: Engineering Essays -->
                  <td width="48%" class="col-half" style="vertical-align: top; padding-bottom: 10px;">
                    <a href="https://sahillangoo.in/blog/" class="email-subcard" style="display: block; padding: 12px 14px; background-color: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 6px; text-decoration: none;">
                      <div class="card-link-title" style="font-size: 13px; font-weight: 700; color: #09090B; font-family: 'SFMono-Regular', Consolas, monospace;">
                        Technical Journal &rarr;
                      </div>
                      <div class="text-secondary" style="font-size: 11px; color: #71717A; line-height: 1.4; margin-top: 4px;">
                        Edge, CAPI & architecture
                      </div>
                    </a>
                  </td>
                </tr>

                <tr>
                  <!-- Card 3: SquadCoders Studio -->
                  <td width="48%" class="col-half" style="vertical-align: top; padding-bottom: 10px;">
                    <a href="https://github.com/SquadCoders" class="email-subcard" style="display: block; padding: 12px 14px; background-color: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 6px; text-decoration: none;">
                      <div class="card-link-title" style="font-size: 13px; font-weight: 700; color: #09090B; font-family: 'SFMono-Regular', Consolas, monospace;">
                        SquadCoders Studio &rarr;
                      </div>
                      <div class="text-secondary" style="font-size: 11px; color: #71717A; line-height: 1.4; margin-top: 4px;">
                        Software studio & platforms
                      </div>
                    </a>
                  </td>

                  <td width="4%" class="col-space">&nbsp;</td>

                  <!-- Card 4: Digital Garden -->
                  <td width="48%" class="col-half" style="vertical-align: top; padding-bottom: 10px;">
                    <a href="https://sahillangoo.in/notes/" class="email-subcard" style="display: block; padding: 12px 14px; background-color: #FAFAFA; border: 1px solid #E4E4E7; border-radius: 6px; text-decoration: none;">
                      <div class="card-link-title" style="font-size: 13px; font-weight: 700; color: #09090B; font-family: 'SFMono-Regular', Consolas, monospace;">
                        Digital Garden &rarr;
                      </div>
                      <div class="text-secondary" style="font-size: 11px; color: #71717A; line-height: 1.4; margin-top: 4px;">
                        Atomic TILs & code patterns
                      </div>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- CTA Actions Row -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-top: 14px;" class="btn-row">
                <tr>
                  <td align="left">
                    <a href="https://sahillangoo.in/projects/" class="btn-primary" style="display: inline-block; padding: 9px 18px; background-color: #09090B; color: #FFFFFF; font-size: 11px; font-weight: 600; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 4px; text-decoration: none; mso-padding-alt: 0;">
                      <!--[if mso]><i style="letter-spacing: 18px; mso-font-width: -100%; mso-text-raise: 18pt;">&nbsp;</i><![endif]-->
                      <span style="mso-text-raise: 9pt;">Explore Case Studies</span>
                      <!--[if mso]><i style="letter-spacing: 18px; mso-font-width: -100%;">&nbsp;</i><![endif]-->
                    </a>
                  </td>
                  <td style="padding-left: 10px;">
                    <a href="https://sahillangoo.in/resume/" class="btn-outline" style="display: inline-block; padding: 8px 16px; background-color: #FFFFFF; border: 1px solid #E4E4E7; color: #09090B; font-size: 11px; font-weight: 600; font-family: 'SFMono-Regular', Consolas, Monaco, monospace; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 4px; text-decoration: none;">
                      View Resume
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Signature with Verified Links -->
          <tr>
            <td style="padding: 18px 28px; background-color: #FAFAFA; border-top: 1px solid #E4E4E7;" class="email-subcard border-divider">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Left: Signature -->
                  <td align="left" style="vertical-align: middle;">
                    <div class="text-primary" style="font-size: 13px; font-weight: 700; color: #09090B;">
                      Sahil Langoo
                    </div>
                    <div class="text-secondary" style="font-size: 11px; color: #71717A; margin-top: 2px; font-family: 'SFMono-Regular', Consolas, monospace;">
                      <a href="https://github.com/SquadCoders" class="text-mono-brand" style="color: #09090B; text-decoration: none; font-weight: 600;">@SquadCoders</a> &bull; <a href="https://sahillangoo.in" style="color: #71717A; text-decoration: none;">sahillangoo.in</a>
                    </div>
                  </td>

                  <!-- Right: Social Links -->
                  <td align="right" style="vertical-align: middle;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-left: 8px;">
                          <a href="https://github.com/sahillangoo" class="text-secondary" style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; color: #71717A; text-decoration: none;">
                            GitHub
                          </a>
                        </td>
                        <td style="padding-left: 6px; color: #D4D4D8;">&bull;</td>
                        <td style="padding-left: 6px;">
                          <a href="https://linkedin.com/in/sahillangoo" class="text-secondary" style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; color: #71717A; text-decoration: none;">
                            LinkedIn
                          </a>
                        </td>
                        <td style="padding-left: 6px; color: #D4D4D8;">&bull;</td>
                        <td style="padding-left: 6px;">
                          <a href="https://twitter.com/kashurgeek" class="text-secondary" style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; color: #71717A; text-decoration: none;">
                            X
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Sub-footer Notice -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 580px; margin-top: 14px;">
          <tr>
            <td align="center" class="text-muted" style="font-size: 10px; color: #A1A1AA; font-family: 'SFMono-Regular', Consolas, monospace; line-height: 1.5;">
              Automated confirmation sent to acknowledge receipt at hello@sahillangoo.in.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
```

---

## ✉️ Option 2: Clean Plain-Text Template (For Simple Auto-Responders)

### Subject Line:
```text
Thanks for reaching out — Sahil Langoo
```

### Body:
```text
Hi there,

Thanks for reaching out! This is an automated confirmation to let you know that your message has landed safely in my primary inbox at hello@sahillangoo.in.

I typically review and reply to all emails within 24–48 hours (Monday through Friday). If your inquiry is regarding a new web platform, architecture consulting, or engineering collaboration with SquadCoders, I will get back to you with next steps as soon as possible.

In the meantime, feel free to explore:
• Case Studies & Engineered Systems: https://sahillangoo.in/projects/
• Technical Journal & Architecture Essays: https://sahillangoo.in/blog/
• Digital Garden & TIL Notes: https://sahillangoo.in/notes/
• SquadCoders Studio: https://github.com/SquadCoders
• Verified Code & Repositories: https://github.com/sahillangoo

Looking forward to speaking with you!

Best regards,

Sahil Langoo
Full Stack Systems Engineer & Co-Founder at @SquadCoders
Website: https://sahillangoo.in
Studio: https://github.com/SquadCoders
Email: hello@sahillangoo.in
```
