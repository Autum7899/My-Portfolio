import { neon } from "@netlify/neon";

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);

    // Check against environment variable
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          token: process.env.ADMIN_SECRET || "dev-secret-token",
        }),
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ success: false, error: "Invalid password" }),
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Login failed" }),
    };
  }
};
