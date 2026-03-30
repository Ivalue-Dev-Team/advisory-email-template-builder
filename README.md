# Advisory Email Template Builder

A powerful visual email template builder for creating professional threat intelligence advisory emails with WYSIWYG editing capabilities and batch email distribution.

**Developed by:** [iValue](https://www.ivaluegroup.com) | [Sec360](https://sec360.ai)  
**Author:** Chinmaya Kumar Biswal  
**Version:** 1.0.0  
**License:** MIT

---

## Project Overview

The Advisory Email Template Builder is a comprehensive solution designed for security professionals and threat intelligence teams at iValue and Sec360. It enables users to:

- **Design** professional threat intelligence advisory emails without coding
- **Customize** templates with dynamic content and branding
- **Preview** emails in real-time with live WYSIWYG editor
- **Distribute** advisories to multiple recipients with batch sending
- **Track** delivery status with detailed results reporting

This tool is specifically built to generate security advisories compliant with industry standards, featuring structured metadata, severity indicators, and comprehensive threat analysis sections.

---

## Features

### Template Customization
- **Hardcoded Branding**: iValue & Sec360 logos, corporate colors, and footer
- **Dynamic Subtitle**: Customize security alert descriptions
- **Alert Messages**: Create high-priority warning banners
- **Accent Colors**: Customize border and highlight colors throughout the template

### Email Content
- **CVE Information**: CVE ID, severity level, threat type, and issue dates
- **Rich Text Editor**: Full HTML/WYSIWYG editing with formatting options
- **Structured Metadata**: Professional metadata display in grid layout
- **Professional Layout**: Email container with responsive design

### Recipient Management
- **Select Recipients**: Checkbox-based recipient selection
- **Bulk Operations**: Select/deselect all recipients at once
- **Live Counter**: Real-time recipient count display

### Email Distribution
- **Batch Sending**: Send to multiple recipients simultaneously
- **Status Tracking**: Real-time delivery status for each recipient
- **Error Handling**: Detailed error messages and logs
- **Result Dashboard**: View sending results in detailed table format

### Security
- **Environment Variables**: Sensitive data stored in `.env` (not in code)
- **SMTP Configuration**: Secure email delivery via SMTP
- **Input Validation**: Form validation before sending

---

## Project Structure

```
advisoryEmailTemplate/
├── index.html                 # Main builder application
├── advisorymailtemp7.html    # Reference template example
├── index.js                  # Backend server
├── package.json              # Project dependencies & metadata
├── .env.example              # Environment variables template
├── .env                      # Environment variables (local, not in repo)
├── recipients.json           # Email recipients list
└── README.md                 # This file
```

---

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- SMTP server access (Gmail, Office365, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ivalue-Dev-Team/advisory-email-template-builder
cd advisory-email-template-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your SMTP and application settings
```

4. **Set up recipients**
Edit `recipients.json` with your email list:
```json
[
  "security-team@company.com",
  "management@company.com",
  "operations@company.com"
]
```

5. **Start the application**
```bash
# Development
npm run dev

# Production
npm start
```

Visit `http://localhost:3000` in your browser.

---

## Template Content Guide

When customizing your threat intelligence advisory template, follow the structure in **advisorymailtemp7.html**:

### Header Section (Hardcoded)
- **iValue & Sec360 Logos** - Professional branding
- **Title**: "Threat Intelligence Advisory" 
- **Subtitle**: Customizable (e.g., "Security Alert - GDI+ Buffer Over-read Vulnerability")

### Alert Box
- High-alert warning banner
- Example: " HIGH ALERT: Potential Exploitation Risk of CVE-2026-20846. Immediate action required."

### Metadata Section
- **Severity**: CRITICAL | HIGH | MEDIUM | LOW
- **Threat Type**: Classification of vulnerability (e.g., Buffer Over-read / DoS)
- **Date Issued**: When the advisory was published
- **CVE ID**: Unique vulnerability identifier

### Executive Summary
Include:
- Technical description of the vulnerability
- Attack vector and exploitation method
- Potential impact on affected systems
- List of possible successful exploitation scenarios
- Which systems are affected

### Key Content Sections
1. **Inventory List** - Affected components and exposure count
2. **Why This Matters** - Business impact analysis
3. **Technical Overview** - Detailed technical information
   - CVE ID, Vulnerability Type, Attack Vector
   - Authentication Requirements
   - Impact Assessment
   - Exploitability Score
4. **Affected Environments** - Risk contextualization
5. **Detection & Mitigation** - Actionable recommendations
6. **Indicators of Compromise (IOCs)** - Detection signatures
7. **MITRE ATT&CK Mapping** - Threat framework alignment
8. **References** - External documentation links

### Footer Section (Hardcoded)
- **Title**: "Threat Intelligence Advisory - {CVE_ID}"
- **Note**: "This advisory is provided for informational purposes only."
- **Copyright**: "© 2026 iValue | Sec360. All rights reserved."

---

## API Endpoints

### GET `/`
Serves the main template builder interface.

### GET `/recipients`
Returns list of email recipients from `recipients.json`.

**Response:**
```json
[
  "email1@company.com",
  "email2@company.com"
]
```

### POST `/send`
Sends emails to selected recipients.

**Request Body:**
```json
{
  "toEmails": ["recipient@company.com"],
  "subject": "Security Alert - CVE-2026-20846",
  "htmlContent": "<html>...</html>",
  "cveId": "CVE-2026-20846",
  "severity": "HIGH",
  "threatType": "Buffer Over-read",
  "dateIssued": "2026-02-10"
}
```

**Response:**
```json
{
  "summary": {
    "total": 5,
    "sent": 4,
    "failed": 1
  },
  "results": [
    {
      "email": "user@company.com",
      "status": "sent",
      "messageId": "<message-id>"
    }
  ]
}
```

---

## Configuration

### Environment Variables (.env)

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=3000
NODE_ENV=development

# Email Settings
SENDER_EMAIL=noreply@ivaluetv.com
SENDER_NAME=iValue Sec360 Threat Intelligence

# Application
APP_NAME=Advisory Email Template Builder
APP_VERSION=1.0.0

# Recipients
RECIPIENTS_FILE=./recipients.json

# Logging
LOG_LEVEL=info
```

### Recipients File (recipients.json)

```json
[
  "security-team@example.com",
  "ciso@example.com",
  "incident-response@example.com",
  "compliance-team@example.com"
]
```

---

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Rich Text Editor**: Summernote v0.8.20
- **Backend**: Express.js v5.1.0
- **Email**: Nodemailer v7.0.6
- **Configuration**: dotenv v17.3.1
- **HTTP Body Parsing**: body-parser v2.2.0

---

## Usage Workflow

1. **Launch Builder** → Open http://localhost:3000
2. **Customize Template** → Fill in alert details and accent color
3. **Add Content** → Use rich text editor to compose advisory
4. **Preview** → See live preview in real-time
5. **Select Recipients** → Choose who receives the advisory
6. **Review** → Check all required fields are completed
7. **Send** → Click "Send to Selected Recipients"
8. **Track** → View delivery status and results

---

## Security Considerations

- **Never commit `.env`** - Store sensitive credentials locally
- **Use App Passwords** - For Gmail or similar services
- **SMTP Validation** - Test SMTP settings before production
- **Input Sanitization** - HTML content is escaped in templates
- **HTTPS in Production** - Deploy with SSL/TLS certificates

---

## Contributing

Contributions from the iValue and Sec360 teams are welcome!

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## Support & Contact

**Organization:** iValue | Sec360  
**Author:** Chinmaya Kumar Biswal  
**Email:** chinmaya.kumar@ivalue.co.in  
**Website:** https://sec360.ai

For issues, feature requests, or technical support, please contact the development team.

---

## License

MIT License - See LICENSE file for details.

---


## Changelog

### v1.0.0 (March 2026)
- Initial release
- Core template builder functionality
- Batch email sending
- Live preview with Summernote editor
- Recipient management
- Results tracking and reporting

---

**Last Updated:** March 30, 2026  
**Built with ❤️ by the iValue | Sec360 Team**
