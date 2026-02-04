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

  // Simple auth check - in production use proper JWT/session
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
    if (event.httpMethod === "PUT") {
      const userData = JSON.parse(event.body);

      // Check if user exists
      const [existing] = await sql`SELECT id FROM portfolio_user LIMIT 1`;

      if (existing) {
        await sql`
          UPDATE portfolio_user SET
            name = ${userData.name},
            title = ${userData.title},
            location = ${userData.location},
            bio = ${userData.bio},
            profile_image = ${userData.profileImage},
            email = ${userData.email},
            github = ${userData.socials?.github || ""},
            linkedin = ${userData.socials?.linkedin || ""},
            twitter = ${userData.socials?.twitter || ""},
            updated_at = NOW()
          WHERE id = ${existing.id}
        `;
      } else {
        await sql`
          INSERT INTO portfolio_user (name, title, location, bio, profile_image, email, github, linkedin, twitter)
          VALUES (
            ${userData.name},
            ${userData.title},
            ${userData.location},
            ${userData.bio},
            ${userData.profileImage},
            ${userData.email},
            ${userData.socials?.github || ""},
            ${userData.socials?.linkedin || ""},
            ${userData.socials?.twitter || ""}
          )
        `;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "User updated successfully" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to update user" }),
    };
  }
};
