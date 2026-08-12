import ContactMessage from '../models/ContactMessage.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      company,
      interest,
      message,
    });

    try {
      await transporter.sendMail({
        from: `"PorulonStack Website" <${process.env.SMTP_USER}>`,
        to: 'info@porulontech.com',
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <h3>New Contact Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Interest:</strong> ${interest || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (mailErr) {
      console.error('Failed to send email:', mailErr);
      // We still return success since it's saved in DB
    }

    return res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', data: mapContact(newMessage) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
