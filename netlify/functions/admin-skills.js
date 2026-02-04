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
    // POST - Create new skill
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);

      const [result] = await sql`
        INSERT INTO portfolio_skills (category, name, logo, level, invert)
        VALUES (${data.category}, ${data.name}, ${data.logo}, ${data.level}, ${data.invert || false})
        RETURNING id
      `;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          id: result.id,
          message: "Skill added successfully",
        }),
      };
    }

    // PUT - Update skill
    if (event.httpMethod === "PUT") {
      const data = JSON.parse(event.body);

      await sql`
        UPDATE portfolio_skills SET
          category = ${data.category},
          name = ${data.name},
          logo = ${data.logo},
          level = ${data.level},
          invert = ${data.invert || false},
          updated_at = NOW()
        WHERE id = ${data.id}
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Skill updated successfully" }),
      };
    }

    // DELETE - Delete skill
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);

      await sql`DELETE FROM portfolio_skills WHERE id = ${id}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Skill deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error managing skills:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to manage skills" }),
    };
  }
};
