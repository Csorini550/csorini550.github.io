// SendGrid Email Endpoint
// This file is designed to run on serverless functions or be bundled for GitHub Pages

// Import SendGrid
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key - use environment variables or config
let SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// Log the start of the function and that we're using the API key (without showing the full key)
console.log('SendGrid function initialized');
console.log(`API Key exists: ${!!SENDGRID_API_KEY}`);

if (SENDGRID_API_KEY) {
  console.log(`API Key prefix: ${SENDGRID_API_KEY.substring(0, 8) + '...'}`);
  
  // Set the API key for SendGrid
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('SendGrid API key set successfully');
  } catch (error) {
    console.error('Error setting SendGrid API key:', error.message);
  }
}

// For GitHub Pages compatibility
if (typeof window !== 'undefined') {
  window.handleSendGridRequest = async function(payload) {
    try {
      console.log('GitHub Pages handling SendGrid request');
      const response = await sgMail.send(payload);
      return {
        success: true,
        message: 'Email sent successfully',
        response: response
      };
    } catch (error) {
      console.error('GitHub Pages SendGrid error:', error);
      return {
        success: false,
        error: error.message,
        details: error.response ? error.response.body : null
      };
    }
  };
}

// For Netlify functions
exports.handler = async (event, context) => {
  console.log('Function invoked with method:', event.httpMethod);
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Options request handled successfully' })
    };
  }

  // Only handle POST requests
  if (event.httpMethod !== 'POST') {
    console.log(`Method not allowed: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming request body
    console.log('Parsing request body');
    const payload = JSON.parse(event.body);
    console.log('Request payload:', JSON.stringify(payload, null, 2));
    
    // Validate required fields
    if (!payload.personalizations || !payload.from || !payload.content) {
      console.error('Missing required fields in payload');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          missing: {
            personalizations: !payload.personalizations,
            from: !payload.from,
            content: !payload.content
          }
        })
      };
    }

    // Log the email being sent
    console.log('Sending email:');
    console.log(`- From: ${payload.from.email} (${payload.from.name})`);
    console.log(`- To: ${payload.personalizations[0].to[0].email} (${payload.personalizations[0].to[0].name})`);
    console.log(`- Subject: ${payload.personalizations[0].subject}`);
    
    // Send the email using SendGrid
    console.log('Calling SendGrid API');
    const response = await sgMail.send(payload);
    console.log('SendGrid response:', response);

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Email sent successfully',
        sendgridResponse: response[0] ? {
          statusCode: response[0].statusCode,
          headers: response[0].headers
        } : 'No response details'
      })
    };
  } catch (error) {
    console.error('SendGrid Error:', error);
    
    // Extract more detailed error information
    const errorDetails = {
      message: error.message,
      code: error.code,
      response: error.response ? {
        body: error.response.body,
        statusCode: error.response.statusCode
      } : 'No response details'
    };
    
    console.error('Detailed error:', JSON.stringify(errorDetails, null, 2));
    
    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error sending email',
        details: error.message,
        errorInfo: errorDetails
      })
    };
  }
};

// For Vercel Edge Functions
export default async function handler(request) {
  console.log('Vercel function invoked with method:', request.method);
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(JSON.stringify({ message: 'Options request handled successfully' }), {
      status: 200,
      headers
    });
  }

  // Only handle POST requests
  if (request.method !== 'POST') {
    console.log(`Method not allowed: ${request.method}`);
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers
    });
  }

  try {
    // Parse the incoming request body
    console.log('Parsing request body');
    const payload = await request.json();
    console.log('Request payload:', JSON.stringify(payload, null, 2));
    
    // Validate required fields
    if (!payload.personalizations || !payload.from || !payload.content) {
      console.error('Missing required fields in payload');
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers
      });
    }

    // Log the email being sent
    console.log('Sending email:');
    console.log(`- From: ${payload.from.email} (${payload.from.name})`);
    console.log(`- To: ${payload.personalizations[0].to[0].email} (${payload.personalizations[0].to[0].name})`);
    console.log(`- Subject: ${payload.personalizations[0].subject}`);
    
    // Send the email using SendGrid
    console.log('Calling SendGrid API');
    const response = await sgMail.send(payload);
    console.log('SendGrid response:', response);

    // Return success response
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('SendGrid Error:', error);
    
    // Extract more detailed error information
    const errorDetails = {
      message: error.message,
      code: error.code,
      response: error.response ? {
        body: error.response.body,
        statusCode: error.response.statusCode
      } : 'No response details'
    };
    
    console.error('Detailed error:', JSON.stringify(errorDetails, null, 2));
    
    // Return error response
    return new Response(JSON.stringify({ 
      error: 'Error sending email',
      details: error.message,
      errorInfo: errorDetails
    }), {
      status: 500,
      headers
    });
  }
} 