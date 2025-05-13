// netlify/functions/zapier-proxy.js

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    console.log("🔥 Forwarding this data to Zapier:", data);

    const response = await fetch("https://hooks.zapier.com/hooks/catch/21029478/273uyrd/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseText = await response.text();

    console.log("✅ Zapier responded with:", response.status, responseText);

    return {
      statusCode: response.status,
      body: JSON.stringify({ message: "Forwarded to Zapier", response: responseText })
    };

  } catch (error) {
    console.error("❌ Error in zapier-proxy:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
