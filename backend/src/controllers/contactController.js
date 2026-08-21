import ContactMessage from '../models/ContactMessage.js';
import { sendMail } from '../config/mailer.js';

const mapContact = (c) => {
  if (!c) return null;
  const plain = c.toJSON ? c.toJSON() : c;
  return { ...plain, _id: plain.id };
};

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, company, interest, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // 1. Save to Database first
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      interest: interest || 'General Inquiry',
      message,
    });

    // 2. Send Email Notifications via Resend
    const userEmailClean = email.trim();
    const adminEmail = process.env.RESEND_ADMIN_EMAIL || 'info@porulontech.com';

    // 2a. Admin Notification Email
    try {
      await sendMail({
        to: adminEmail,
        subject: `[New Inquiry] ${name} - ${interest || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #7c3aed; margin-top: 0;">New Website Inquiry Received</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${userEmailClean}">${userEmailClean}</a></p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Interest / Category:</strong> ${interest || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            <p style="font-size: 12px; color: #888; margin-top: 20px;">This email was sent automatically from your website contact form.</p>
          </div>
        `,
      });
      console.log(`[Resend Success] Admin notification email delivered to ${adminEmail}`);
    } catch (adminErr) {
      console.error('[Resend Error] Admin notification email failed:', adminErr.message);
    }

    // 2b. User Confirmation Thank-You Email
    try {
      await sendMail({
        to: userEmailClean,
        subject: `Thank you for contacting Porulon Technologies`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #7c3aed; margin: 0; font-size: 24px; font-weight: 800;">Porulon Technologies</h1>
              <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Engineering Intelligent Futures</p>
            </div>
            
            <h3 style="color: #0f172a; margin-top: 0;">Hello ${name},</h3>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              Thank you for reaching out to <strong>Porulon Technologies</strong>! We have successfully received your inquiry regarding <strong>${interest || 'our solutions'}</strong>.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              Our principal solutions architects and engineering leaders are reviewing your details. You can expect a response from us within <strong>24 business hours</strong>.
            </p>

            <div style="background-color: #f8fafc; border-left: 4px solid #7c3aed; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <p style="font-size: 11px; font-weight: bold; color: #64748b; margin: 0 0 6px 0; text-transform: uppercase;">Summary of Your Submitted Message:</p>
              <p style="font-size: 13px; color: #334155; margin: 0; white-space: pre-wrap; font-style: italic;">"${message}"</p>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              If you need immediate assistance, feel free to reply directly to this email or reach us at <a href="mailto:info@porulontech.com" style="color: #7c3aed; font-weight: bold; text-decoration: none;">info@porulontech.com</a>.
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

            <div style="text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 4px 0;"><strong>Porulon Technologies Inc.</strong></p>
              <p style="margin: 0;">Coimbatore HQ, TN, India | <a href="https://porulontech.com" style="color: #7c3aed; text-decoration: none;">porulontech.com</a></p>
            </div>
          </div>
        `,
      });
      console.log(`[Resend Success] User confirmation email delivered to ${userEmailClean}`);
    } catch (userErr) {
      console.error('[Resend Error] User confirmation email failed:', userErr.message);
      // We do NOT block contact submission if email sending fails, because inquiry is safely stored in Database
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      data: mapContact(newMessage),
    });
  } catch (error) {
    console.error('[Contact Submit Error]:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json(messages.map(mapContact));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.update({ status: req.body.status || message.status });
    return res.json(mapContact(message));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.destroy();
    return res.json({ message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
