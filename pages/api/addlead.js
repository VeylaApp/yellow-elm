require('dotenv').config(); // Add this line

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { first_name, last_name, email } = req.body;

  // Check for required secrets
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    console.error("❌ Missing one or more required environment variables.");
    return res.status(500).json({
      message: "Server misconfiguration. API credentials missing.",
    });
  }

  try {
    console.log("🔄 Requesting Zoho access token...");

    const tokenResponse = await fetch("https://accounts.zoho.com/oauth/v2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("🪪 Token Response:", tokenData);

    if (!tokenData.access_token) {
      throw new Error("Access token not received.");
    }

    const accessToken = tokenData.access_token;

    const contactPayload = {
      data: [
        {
          Membership_Status: "Prospect",
          First_Name: first_name,
          Last_Name: last_name,
          Email: email,
          Newsletter: true,
          Lead_Source: "Website",
          Tag: ["Newsletter"],
        },
      ],
      trigger: ["workflow"],
    };

    console.log("📤 Sending contact to Zoho...");

    const response = await fetch("https://www.zohoapis.com/crm/v2/Contacts", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    const result = await response.json();
    console.log("📬 Zoho CRM response:", result);

    if (result.data && result.data[0].code === "SUCCESS") {
      return res.status(200).json({ message: "Contact added to Zoho CRM." });
    } else {
      return res.status(500).json({
        message: "Failed to create contact in Zoho.",
        details: result,
      });
    }
  } catch (err) {
    console.error("💥 Zoho API error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
