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
    // POST - Create new project
    if (event.httpMethod === "POST") {
      const data = JSON.parse(event.body);

      const [result] = await sql`
        INSERT INTO portfolio_projects (title, description, image, tags, demo, repo)
        VALUES (${data.title}, ${data.description}, ${data.image}, ${data.tags}, ${data.demo}, ${data.repo})
        RETURNING id
      `;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          id: result.id,
          message: "Project added successfully",
        }),
      };
    }

    // PUT - Update project
    if (event.httpMethod === "PUT") {
      const data = JSON.parse(event.body);

      await sql`
        UPDATE portfolio_projects SET
          title = ${data.title},
          description = ${data.description},
          image = ${data.image},
          tags = ${data.tags},
          demo = ${data.demo},
          repo = ${data.repo},
          updated_at = NOW()
        WHERE id = ${data.id}
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Project updated successfully" }),
      };
    }

    // DELETE - Delete project
    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body);

      await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Project deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error managing projects:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to manage projects" }),
    };
  }
};
