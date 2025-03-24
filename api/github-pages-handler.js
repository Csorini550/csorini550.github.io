// GitHub Pages API Handler
// This file adapts the SendGrid function to work with GitHub Pages

// Import the SendGrid module
const sgMail = require('@sendgrid/mail');

// Import the config with our API key
const { SENDGRID_API_KEY } = require('./config.js');

// Set the API key
sgMail.setApiKey(SENDGRID_API_KEY);

// Function to handle the email sending
async function sendEmail(payload) {
  try {
    // Log the email being sent
    console.log('Sending email via GitHub Pages handler:');
    console.log(`- From: ${payload.from.email} (${payload.from.name})`);
    console.log(`- To: ${payload.personalizations[0].to[0].email}`);
    console.log(`- Subject: ${payload.personalizations[0].subject}`);
    
    // Send the email using SendGrid
    const response = await sgMail.send(payload);
    
    return {
      success: true,
      message: 'Email sent successfully',
      statusCode: response[0].statusCode
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      success: false,
      error: 'Failed to send email',
      details: error.message
    };
  }
}

// Export the function for use in the browser
window.sendEmailViaGitHub = sendEmail; 