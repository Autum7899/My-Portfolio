import { neon } from '@netlify/neon';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: 'Name, email, and message are required.',
      };
    }

    const sql = neon();

    await sql`
      INSERT INTO messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    return {
      statusCode: 200,
      body: 'Message submitted successfully!',
    };
  } catch (error) {
    console.error('Error submitting message:', error);
    return {
      statusCode: 500,
      body: 'Failed to submit message.',
    };
  }
};
