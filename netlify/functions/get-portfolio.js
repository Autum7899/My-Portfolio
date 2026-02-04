import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const sql = neon();

  try {
    // GET - Fetch all portfolio data
    if (event.httpMethod === "GET") {
      const [user] = await sql`SELECT * FROM portfolio_user LIMIT 1`;

      // Try career table first, fallback to education table
      let career = [];
      try {
        career = await sql`SELECT * FROM portfolio_career ORDER BY id`;
      } catch (e) {
        career = await sql`SELECT * FROM portfolio_education ORDER BY id`;
      }

      const projects = await sql`SELECT * FROM portfolio_projects ORDER BY id`;
      const skills =
        await sql`SELECT * FROM portfolio_skills ORDER BY category, id`;

      // Group skills by category
      const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push({
          id: skill.id,
          name: skill.name,
          logo: skill.logo,
          level: skill.level,
          invert: skill.invert,
        });
        return acc;
      }, {});

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          user: user || null,
          career,
          projects: projects.map((p) => ({
            ...p,
            tags: p.tags || [],
          })),
          skills: groupedSkills,
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch portfolio data" }),
    };
  }
};
