import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, honeypot } = req.body || {};

    // 1. Honeypot check: If the honeypot field is filled, pretend it succeeded (silently reject)
    if (honeypot) {
      console.warn('Spam submission detected via honeypot');
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    }

    // 2. Validate input and trim whitespace
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPhone = phone?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!trimmedEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!trimmedMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in the environment variables');
      return res.status(500).json({ error: 'Mail server configuration error' });
    }

    const toEmail = process.env.CONTACT_EMAIL || 'strenovix@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // 3. Initialize Resend and send the email
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: trimmedEmail,
      subject: `New Portfolio Contact: ${trimmedName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f7fafc;
      margin: 0;
      padding: 24px;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #000000;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: #F04A00;
      font-size: 20px;
      margin: 0;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 32px 24px;
    }
    .field {
      margin-bottom: 24px;
    }
    .label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #718096;
      margin-bottom: 6px;
    }
    .value {
      font-size: 15px;
      color: #1a202c;
      background-color: #f8fafc;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #edf2f7;
      white-space: pre-wrap;
    }
    .value-link {
      color: #F04A00;
      text-decoration: none;
    }
    .footer {
      background-color: #f7fafc;
      padding: 16px 24px;
      border-top: 1px solid #edf2f7;
      text-align: center;
      font-size: 12px;
      color: #a0aec0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Portfolio Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${trimmedName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${trimmedEmail}" class="value-link">${trimmedEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${trimmedPhone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value">${trimmedMessage}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from your portfolio website contact form.
    </div>
  </div>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Server error handling contact form:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
