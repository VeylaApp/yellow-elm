import Layout from "../components/layout";
import { useState, useEffect } from "react";

export default function MailingListSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const handleCaptcha = () => {
      window.hcaptcha.render("hcaptcha-container", {
        sitekey: "a70ee3e8-03b6-498a-9638-de943de44c82",
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
    data["h-captcha-response"] = captchaToken;

    try {
      const response = await fetch("/api/addlead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Lead submission error:", error);
        alert("Something went wrong. Please try again later.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="w-[80%] mx-auto pt-24 text-black">
        <h1 className="text-3xl font-header mb-6 text-center">Join Our Mailing List</h1>

        {submitted ? (
          <p className="text-green-700 text-center text-lg">
            Thank you for signing up! You will start receiving updates soon.
          </p>
        ) : (
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

            <div>
              <label className="block mb-1">Email Address</label>
              <input type="email" name="email" required className="w-full bg-white border border-gold-aura rounded p-2" />
            </div>

            <div id="hcaptcha-container" className="my-4"></div>

            <button
              type="submit"
              className="bg-green-forest text-white px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#204e39]"
            >
              Sign Up
            </button>
          </form>
        )}

        <script src="https://js.hcaptcha.com/1/api.js?onload=onloadCallback&render=explicit" async defer></script>
      </div>
    </Layout>
  );
}
