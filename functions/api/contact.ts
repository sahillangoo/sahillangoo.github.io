/**
 * Cloudflare Pages Function: /api/contact
 *
 * Inbound project inquiry and lead capture endpoint:
 * 1. Validates incoming JSON or form payload (name, email, service, message, honeypot).
 * 2. Blocks automated bots via honeypot and optional Turnstile token validation.
 * 3. Returns structured machine-readable JSON response.
 */

interface ContactPayload {
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
  honeypot?: string;
  turnstileToken?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context: {
  request: Request;
  env: Record<string, string | undefined>;
}): Promise<Response> {
  const { request, env } = context;

  const jsonHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': 'https://sahillangoo.in',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    let payload: ContactPayload;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      payload = {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        service: String(formData.get('service') || ''),
        budget: String(formData.get('budget') || ''),
        message: String(formData.get('message') || ''),
        honeypot: String(formData.get('website') || formData.get('honeypot') || ''),
        turnstileToken: String(
          formData.get('cf-turnstile-response') || formData.get('turnstileToken') || ''
        ),
      };
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unsupported content type. Send JSON or form data.',
        }),
        { status: 415, headers: jsonHeaders }
      );
    }

    // 1. Honeypot check (hidden field for automated scrapers)
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      // Silently accept without processing to fool bots
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Inquiry received. Thank you.',
        }),
        { status: 200, headers: jsonHeaders }
      );
    }

    // 2. Input validation
    const name = payload.name?.trim() || '';
    const email = payload.email?.trim() || '';
    const message = payload.message?.trim() || '';
    const service = payload.service?.trim() || 'General Inquiry';
    const budget = payload.budget?.trim() || 'Flexible';

    if (!name || name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid name between 2 and 100 characters.',
        }),
        { status: 400, headers: jsonHeaders }
      );
    }

    if (!email || !EMAIL_REGEX.test(email) || email.length > 120) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid email address.',
        }),
        { status: 400, headers: jsonHeaders }
      );
    }

    if (!message || message.length < 10 || message.length > 3000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a detailed inquiry message between 10 and 3000 characters.',
        }),
        { status: 400, headers: jsonHeaders }
      );
    }

    // 3. Optional Cloudflare Turnstile token verification if TURNSTILE_SECRET_KEY is configured
    const turnstileSecret = env?.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && payload.turnstileToken) {
      try {
        const remoteIp = request.headers.get('cf-connecting-ip') || '';
        const verifyFormData = new FormData();
        verifyFormData.append('secret', turnstileSecret);
        verifyFormData.append('response', payload.turnstileToken);
        if (remoteIp) verifyFormData.append('remoteip', remoteIp);

        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: verifyFormData,
        });

        const verifyData = (await verifyRes.json()) as { success: boolean };
        if (!verifyData.success) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Security verification failed. Please refresh and try again.',
            }),
            { status: 403, headers: jsonHeaders }
          );
        }
      } catch (err) {
        // Log verification error but continue if network glitch
        console.warn('Turnstile verification error:', err);
      }
    }

    // 4. Return success status
    // In production, you can forward to a Discord/Telegram webhook or send via Cloudflare Workers email
    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Your inquiry has been received. Sahil will review your project details and respond within 24 business hours.',
        details: {
          name,
          email,
          service,
          budget,
          timestamp: new Date().toISOString(),
        },
      }),
      { status: 200, headers: jsonHeaders }
    );
  } catch {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          'An internal error occurred processing your inquiry. Please email hello@sahillangoo.in directly.',
      }),
      { status: 500, headers: jsonHeaders }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://sahillangoo.in',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
