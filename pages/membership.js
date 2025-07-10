import Layout from "../components/layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MembershipForm() {
  const [volunteerChecked, setVolunteerChecked] = useState(false);
  const [donationChecked, setDonationChecked] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleCaptcha = () => {
      window.hcaptcha.render("hcaptcha-container", {
        sitekey: "6ae8f532-055e-4dec-9236-cb0e221e74d4",
        callback: (token) => setCaptchaToken(token),
      });
    };

    if (window.hcaptcha) {
      handleCaptcha();
    } else {
      window.onloadCallback = handleCaptcha;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the hCaptcha.");
      return;
    }

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    data.donationChecked = donationChecked;
    data["h-captcha-response"] = captchaToken;

    try {
      const response = await fetch('/api/submitToZoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Zoho submission error:', error);
        alert(`Submission failed: ${error.message || 'Unknown error'}`);
        return;
      }

      router.push({
        pathname: '/confirmation',
        query: data,
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong submitting your application. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="w-[60%] mx-auto mt-6 mb-12 text-black pt-24">
        <h1 className="text-4xl font-header text-center mb-6">Join Yellow Elm Ministries</h1>

        <p className="mb-4 text-sm text-center">
          Learn more about our <a href="/mission" target="_blank" rel="noopener noreferrer" className="underline text-purple-moon">Mission</a> and <a href="/statementfaith" target="_blank" rel="noopener noreferrer" className="underline text-purple-moon">Statement of Faith</a>.
         </p>
          <p>Membership is open to all who align with our values and wish to contribute to our community and is always free. 
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-[45%]">
              <label className="block mb-1">First Name</label>
              <input type="text" name="first_name" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[45%]">
              <label className="block mb-1">Last Name</label>
              <input type="text" name="last_name" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-[45%]">
              <label className="block mb-1">Email Address</label>
              <input type="email" name="email" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[45%]">
              <label className="block mb-1">Phone Number (optional)</label>
              <input type="tel" name="phone" className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-[45%]">
              <label className="block mb-1">Birthday</label>
              <input type="date" name="birthday" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[45%]">
              <label className="block mb-1">Sex</label>
              <select name="sex" required className="w-full bg-white border border-gold-aura rounded p-2">
                <option value="">Select...</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Do not wish to disclose">Do not wish to disclose</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-[45%]">
              <label className="block mb-1">Pronouns</label>
              <input type="text" name="pronouns" placeholder="e.g. she/her, they/them" className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[45%]">
              <label className="block mb-1">Preferred Contact Method</label>
              <select name="preferred_contact" className="w-full bg-white border border-gold-aura rounded p-2">
                <option value="">Select...</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Text">Text</option>
                <option value="No Preference">No Preference</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="w-full">
              <label className="block mb-1">Street Address</label>
              <input type="text" name="address_street" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[50%]">
              <label className="block mb-1">City</label>
              <input type="text" name="address_city" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[20%]">
              <label className="block mb-1">State / Province</label>
              <input type="text" name="address_state" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
            <div className="w-[20%]">
              <label className="block mb-1">Zip / Postal Code</label>
              <input type="text" name="address_zip" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block mb-1">What draws you to join?</label>
            <textarea name="reason" rows="4" className="w-full bg-white border border-gold-aura rounded p-2"></textarea>
          </div>

          <div>
            <label className="inline-flex items-start">
              <input type="checkbox" name="affirmation" required className="mr-2 mt-1" />
              <span>
                I have read the Mission and Statement of Faith of Yellow Elm Ministries and align with those values. I wish to join the community.
              </span>
            </label>
          </div>

          <div className="h-[10px]"></div>

          <div>
            <label className="block font-semibold mb-2">Additional Options:</label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="subscribe" className="mr-2" /> Subscribe to Newsletter
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="donate"
                  className="mr-2"
                  checked={donationChecked}
                  onChange={(e) => setDonationChecked(e.target.checked)}
                />
                Set up Recurring Donation (optional)
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="volunteer"
                  className="mr-2"
                  checked={volunteerChecked}
                  onChange={(e) => setVolunteerChecked(e.target.checked)}
                />
                Get more information on volunteering
              </label>

              {volunteerChecked && (
                <div className="mt-2">
                  <label className="block mb-1">How would you be available to volunteer?</label>
                  <textarea
                    name="volunteer_info"
                    rows="3"
                    className="w-full bg-white border border-gold-aura rounded p-2"
                  ></textarea>
                </div>
              )}
            </div>
          </div>

          {/* hCaptcha */}
          <div id="hcaptcha-container" className="my-4"></div>

          <button type="submit"
            className="mt-6 bg-green-forest text-white px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#204e39]"
          >
            Join the Circle
          </button>
        </form>

        <script src="https://js.hcaptcha.com/1/api.js?onload=onloadCallback&render=explicit" async defer></script>
      </div>
    </Layout>
  );
}
