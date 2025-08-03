import Head from "next/head";
import Layout from "../components/layout";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const handleCaptcha = () => {
      if (window.hcaptcha && document.getElementById("hcaptcha-container")) {
        window.hcaptcha.render("hcaptcha-container", {
          sitekey: "a70ee3e8-03b6-498a-9638-de943de44c82",
          callback: (token) => setCaptchaToken(token),
        });
      } else {
        window.onloadCallback = handleCaptcha;
      }
    };

    if (window.hcaptcha) {
      handleCaptcha();
    } else {
      window.onloadCallback = handleCaptcha;
    }

    return () => {
      if (window.hcaptcha && document.getElementById("hcaptcha-container")) {
        window.hcaptcha.reset();
      }
      if (window.onloadCallback === handleCaptcha) {
        delete window.onloadCallback;
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setStatus("Please complete the hCaptcha.");
      return;
    }

    setStatus("Sending message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "h-captcha-response": captchaToken }),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        if (window.hcaptcha) window.hcaptcha.reset();
        setCaptchaToken(null);
      } else {
        const result = await response.json();
        setStatus(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Client-side form submission error:", err);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Yellow Elm Ministries</title>
      </Head>

      <Layout>
        <div className="w-[80%] mx-auto pt-6 text-black">
          <h1 className="text-4xl font-header text-center mb-6">Contact Us</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gold-aura rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gold-aura rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea
                name="message"
                rows="6"
                maxLength={1000}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gold-aura rounded p-2"
              ></textarea>
              <p className="text-xs text-gray-600 mt-1">Max 1000 characters</p>
            </div>
            <div id="hcaptcha-container" className="my-4"></div>
            <button
              type="submit"
              className="bg-green-forest text-white px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#204e39]"
            >
              Send Message
            </button>
            {status && <p className="text-center text-sm mt-2">{status}</p>}
          </form>

          <script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>
        </div>
      </Layout>
    </>
  );
}
