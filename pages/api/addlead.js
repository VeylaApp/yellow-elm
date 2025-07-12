// pages/api/addLead.js → Now adds directly to Contacts

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { first_name, last_name, email } = req.body;

  try {
    const refreshToken = badkey;
    const clientId = badkey;
    const clientSecret = badkey;

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

    const response = await fetch("https://www.zohoapis.com/crm/v2/Contacts", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    const result = await response.json();

    if (result.data && result.data[0].code === "SUCCESS") {
      return res.status(200).json({ message: "Contact added to Zoho CRM." });
    } else {
      console.error("Zoho error:", result);
      return res.status(500).json({ message: "Failed to create contact in Zoho.", details: result });
    }
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
}
