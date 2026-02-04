import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  const sql = neon();

  try {
    // POST - Create new career entry
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);

      // Try new table first, fallback to old table name
      try {
        const [result] = await sql`
          INSERT INTO portfolio_career (institution, degree, major, date, description)
          VALUES (${data.institution}, ${data.degree}, ${data.major}, ${data.date}, ${data.description})
          RETURNING id
        `;
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            id: result.id,
            message: "Career entry added successfully",
          }),
        };
      } catch (e) {
        // Fallback to portfolio_education table
        const [result] = await sql`
          INSERT INTO portfolio_education (institution, degree, major, date, description)
          VALUES (${data.institution}, ${data.degree}, ${data.major}, ${data.date}, ${data.description})
          RETURNING id
        `;
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            id: result.id,
            message: "Career entry added successfully",
          }),
        };
      }
    }

    // PUT - Update career entry
    if (event.httpMethod === "PUT") {
      const data = JSON.parse(event.body);

      try {
        await sql`
          UPDATE portfolio_career SET
            institution = ${data.institution},
            degree = ${data.degree},
            major = ${data.major},
            date = ${data.date},
            description = ${data.description},
            updated_at = NOW()
          WHERE id = ${data.id}
        `;
      } catch (e) {
        await sql`
          UPDATE portfolio_education SET
            institution = ${data.institution},
            degree = ${data.degree},
            major = ${data.major},
            date = ${data.date},
            description = ${data.description},
            updated_at = NOW()
          WHERE id = ${data.id}
        `;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Career entry updated successfully" }),
      };
    }

    // DELETE - Delete career entry
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);

      try {
        await sql`DELETE FROM portfolio_career WHERE id = ${id}`;
      } catch (e) {
        await sql`DELETE FROM portfolio_education WHERE id = ${id}`;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Career entry deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error managing career:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to manage career" }),
    };
  }
};
