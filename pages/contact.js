import Layout from "../components/layout";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const handleCaptcha = () => {
      // Check if hCaptcha script is loaded.
      // window.hcaptcha will be available once the script from the <script> tag executes.
      if (window.hcaptcha && document.getElementById("hcaptcha-container")) {
        window.hcaptcha.render("hcaptcha-container", {
          sitekey: "6ae8f532-055e-4dec-9236-cb0e221e74d4",
          callback: (token) => setCaptchaToken(token),
        });
      } else {
        // If script isn't loaded yet, try again after a short delay or on window load.
        // This is a fallback if the async script hasn't rendered immediately.
        // For production, consider using next/script for better control.
        window.onloadCallback = handleCaptcha; // Keeping for compatibility, but see below
      }
    };

    // If hCaptcha is already loaded (e.g., on fast refreshes), render immediately.
    // Otherwise, attach to window.onloadCallback, which is called by the hCaptcha script
    // when it finishes loading if 'onload=onloadCallback' is in the script URL.
    // However, for Next.js, a simpler approach is to only run render if hcaptcha is available.
    if (window.hcaptcha) {
        handleCaptcha();
    } else {
        // If window.hcaptcha is not yet available, and the script tag has onload=onloadCallback,
        // it *will* eventually call this. But better to remove onload from script.
        // For now, keeping your existing logic but advising to remove onload from script tag.
        window.onloadCallback = handleCaptcha;
    }

    // --- Cleanup function for useEffect ---
    return () => {
      if (window.hcaptcha && document.getElementById("hcaptcha-container")) {
        window.hcaptcha.reset(); // Resets the captcha if the component unmounts
      }
      // Clean up the global onloadCallback if it was set by this component
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

    setStatus("Sending message..."); // Give user feedback

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, "h-captcha-response": captchaToken }),
      });
      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
        if (window.hcaptcha) {
          window.hcaptcha.reset(); // Reset hCaptcha on success
        }
        setCaptchaToken(null); // Clear captcha token
      } else {
        setStatus(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Client-side form submission error:", err);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
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
        {/* IMPORTANT: Remove onload=onloadCallback&render=explicit from this script tag */}
        <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      </div>
    </Layout>
  );
}