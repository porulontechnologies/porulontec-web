import 'dotenv/config';
import { Resend } from 'resend';

/**
 * Sends an email using the Resend API with complete crash protection.
 * @param {Object} options
 * @param {string|string[]} options.to - Recipient email address(es)
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body of the email
 */
export async function sendMail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Resend Notice] No RESEND_API_KEY set in environment. Skipping email.');
    return null;
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Porulon Technologies <info@porulontech.com>';
    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error(`[Resend Error]: ${error.message}`);
    return null;
  }
}
