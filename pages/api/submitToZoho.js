// pages/api/submitToZoho.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    first_name,
    last_name,
    email,
    phone,
    address_street,
    address_city,
    address_state,
    address_zip,
    reason,
    subscribe,
    volunteer_info,
    donationChecked,
    birthday,
    sex,
    preferred_contact,
    pronouns,
  } = req.body;

  try {
    const refreshToken = badkey;
    const clientId = badkey;
    const clientSecret = badkey;

    const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const contactPayload = {
      data: [
        {
          First_Name: first_name,
          Last_Name: last_name,
          Email: email,
          Phone: phone || '',
          Mailing_Street: address_street,
          Mailing_City: address_city,
          Mailing_State: address_state,
          Mailing_Zip: address_zip,
          Description: reason || '',
          Application_Date: new Date().toISOString().split('T')[0],
          Membership_Status: 'Applied',
          Date_of_Birth: birthday,
          Sex: sex,
          Preferred_Contact_Method: preferred_contact || '',
          Pronouns: pronouns || '',
          Volunteer_Info: volunteer_info || '',
          Newsletter: Boolean(subscribe),
          Donor: Boolean(donationChecked),
          Lead_Source: 'Web Signup',
          Tag: [
            'Member',
            ...(volunteer_info ? ['Volunteer Prospect'] : []),
          ],
        },
      ],
      trigger: ["workflow"],
    };

    const response = await fetch('https://www.zohoapis.com/crm/v2/Contacts', {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });

    const zohoResult = await response.json();

    if (!zohoResult.data || !zohoResult.data[0] || zohoResult.data[0].code !== 'SUCCESS') {
      console.error('Zoho error response:', JSON.stringify(zohoResult, null, 2));
      return res.status(500).json({
        message: 'Zoho returned an error during contact creation.',
        details: zohoResult,
      });
    }

    return res.status(200).json({ message: 'Contact submitted to Zoho', result: zohoResult });
  } catch (err) {
    console.error('Zoho API error:', err);
    return res.status(500).json({ message: 'Zoho API integration failed', error: err });
  }
}
