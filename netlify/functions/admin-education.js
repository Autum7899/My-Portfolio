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
    // POST - Create new education
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);

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
          message: "Education added successfully",
        }),
      };
    }

    // PUT - Update education
    if (event.httpMethod === "PUT") {
      const data = JSON.parse(event.body);

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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Education updated successfully" }),
      };
    }

    // DELETE - Delete education
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);

      await sql`DELETE FROM portfolio_education WHERE id = ${id}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Education deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error managing education:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to manage education" }),
    };
  }
};
