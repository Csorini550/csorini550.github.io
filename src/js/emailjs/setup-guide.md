# EmailJS Setup Guide

This guide will walk you through setting up EmailJS for the contact form functionality.

## Overview

The website's contact form uses EmailJS, a service that allows sending emails directly from client-side JavaScript without needing a server. This makes deployment simpler and more maintainable.

## Setup Steps

### 1. Create an EmailJS Account

- Go to [EmailJS.com](https://www.emailjs.com/) and sign up for an account
- The free tier allows 200 emails per month, which should be sufficient for most personal websites

### 2. Set Up an Email Service

- In your EmailJS dashboard, go to "Email Services" and click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.) and follow the authentication steps
- Name your service (e.g., "personal-website-contact")
- Note the **Service ID** (e.g., "service_2uc99iw") - you'll need this later

### 3. Create an Email Template

- In your EmailJS dashboard, go to "Email Templates" and click "Create New Template"
- Name your template (e.g., "contact-form")
- Design the email template with the following variables:
  - `{{from_name}}` - The name of the person submitting the form
  - `{{reply_to}}` - The email address of the person submitting the form
  - `{{to_name}}` - The name of the website owner (you)
  - `{{to_email}}` - The email address where you want to receive messages (IMPORTANT: this is required for email delivery)
  - `{{subject}}` - The subject of the email
  - `{{message}}` - The message content

Sample template content:
```
From: {{from_name}} ({{reply_to}})
To: {{to_name}} <{{to_email}}>
Subject: {{subject}}

{{message}}
```

- Note the **Template ID** (e.g., "template_t1tmmg9") - you'll need this later

### 4. Update the Contact Component

The Contact component (src/components/Contact.js) has been updated to use configurable email settings. The component now:

1. Defines configurable properties for recipient name and email
2. Allows these to be set through HTML attributes
3. Uses these properties when sending emails

#### How to Configure the Contact Component

To set the recipient email and name, you can use these approaches:

1. **Using HTML attributes** when including the component:
   ```html
   <contact-form recipient-email="your@email.com" recipient-name="Your Name"></contact-form>
   ```

2. **Using JavaScript** to set properties:
   ```javascript
   const contactForm = document.querySelector('contact-form');
   contactForm.setAttribute('recipient-email', 'your@email.com');
   contactForm.setAttribute('recipient-name', 'Your Name');
   ```

3. **Default Values**: If no values are provided, the component uses "contact@example.com" as the default recipient email. Make sure to set a proper email address to receive contact form submissions.

#### Template Parameters

When sending an email, the following parameters are sent to EmailJS:

```javascript
const templateParams = {
  from_name: formData.name,
  reply_to: formData.email,
  to_name: this.recipientName,
  to_email: this.recipientEmail,
  subject: formData.subject,
  message: formData.message
};
```

Make sure your EmailJS template uses these exact parameter names.

### 5. Add EmailJS to Your Website

1. In your EmailJS dashboard, go to "Integration" and get your User ID
2. Add the EmailJS library and initialization to your website's index.html:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
  (function() {
    emailjs.init("YOUR_USER_ID_HERE");
  })();
</script>
```

## Testing EmailJS Integration

The repository includes a test page (src/emailjs-test.html) that allows you to test your EmailJS setup without using the full website.

To use the test page:
1. Open emailjs-test.html in your browser
2. Enter your EmailJS Service ID and Template ID
3. Enter the recipient email address (where messages should be sent)
4. Fill out the test form
5. Click "Send Test Email" and check your email

## Troubleshooting

- **Emails not sending**: Check the browser console for errors. Common issues include:
  - Incorrect Service ID or Template ID
  - Missing or incorrect template parameters
  - Exceeding the free tier limit (200 emails/month)
  - Missing or incorrect `to_email` parameter in your template

- **"Recipients address is empty" error**: This happens when the `to_email` parameter is missing or undefined. Make sure:
  - Your template includes the `{{to_email}}` variable
  - You've set the recipient email attribute on the contact form component
  - The recipient email is correctly passed to the EmailJS send method

- **CORS errors**: These are common during local development. Try:
  - Using a local development server instead of opening files directly
  - Temporarily disabling browser extensions that might interfere with CORS

## Production Deployment

When deploying to production:
1. Ensure your EmailJS account is active
2. Verify your service and template IDs are correct
3. Set up the proper recipient email in your HTML when including the contact form
4. Test the production setup with a real submission 