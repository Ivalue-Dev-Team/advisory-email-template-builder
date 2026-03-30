const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname));

// Serve index.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Get list of template files
app.get('/templates', (req, res) => {
  const templateDir = path.join(__dirname, 'template');
  fs.readdir(templateDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read templates' });
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    res.json(htmlFiles);
  });
});

// Get a specific template file
app.get('/template/:filename', (req, res) => {
  const file = req.params.filename;
  const filePath = path.join(__dirname, 'template', file);
  if (!file.endsWith('.html')) return res.status(400).send('Invalid file');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Not found');
    res.send(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>Preview</title></head><body>${data}</body></html>`);
  });
});

const nodemailer = require('nodemailer');

// Get recipients list from .env
app.get('/recipients', (req, res) => {
  const recipients = process.env.RECIPIENTS ? process.env.RECIPIENTS.split(',').map(e => e.trim()) : [];
  res.json(recipients);
});

// Send emails with HTML content and metadata
app.post('/send', async (req, res) => {
  const { toEmails, subject, htmlContent, cveId, severity, threatType, dateIssued } = req.body;

  // Validate request
  if (!toEmails || toEmails.length === 0) {
    return res.status(400).json({ error: 'No recipients selected' });
  }
  if (!subject || !htmlContent) {
    return res.status(400).json({ error: 'Missing subject or content' });
  }

  // Get email credentials from environment
  const fromEmail = process.env.EMAIL_USER;
  const fromPass = process.env.EMAIL_PASSWORD;
  const fromName = process.env.EMAIL_NAME || 'Security Advisory';

  if (!fromEmail || !fromPass) {
    return res.status(500).json({ error: 'Email credentials not configured' });
  }

  // Create transporter for Office 365
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: fromEmail,
      pass: fromPass
    }
  });

  try {
    const results = [];
    
    // Send to each recipient
    for (const toEmail of toEmails) {
      try {
        const mailOptions = {
          from: `"${fromName}" <${fromEmail}>`,
          to: toEmail.trim(),
          subject,
          html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        results.push({
          email: toEmail,
          status: 'sent',
          messageId: info.messageId
        });
        
        console.log(`Email sent to ${toEmail} - Message ID: ${info.messageId}`);
      } catch (err) {
        results.push({
          email: toEmail,
          status: 'failed',
          error: err.message
        });
        
        console.error(`Failed to send to ${toEmail}: ${err.message}`);
      }
    }

    // Return results
    res.json({
      message: `Email sending completed`,
      results,
      summary: {
        total: toEmails.length,
        sent: results.filter(r => r.status === 'sent').length,
        failed: results.filter(r => r.status === 'failed').length,
        cveId: cveId,
        severity: severity,
        threatType: threatType,
        dateIssued: dateIssued
      }
    });

    console.log(`Summary: Total=${toEmails.length}, Sent=${results.filter(r => r.status === 'sent').length}, Failed=${results.filter(r => r.status === 'failed').length}`);
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ 
      error: 'Failed to send emails', 
      details: err.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

app.listen(PORT, () => {
  console.log(`Email Sender Server running on http://localhost:${PORT}`);
  console.log(`Email User: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`Recipients: ${process.env.RECIPIENTS ? process.env.RECIPIENTS.split(',').length : 0} configured`);
});
