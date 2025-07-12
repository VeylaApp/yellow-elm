import Layout from "../components/layout";
import { useState } from "react"; // Removed useEffect as it's no longer strictly needed for direct onload
import Script from "next/script"; // Import the Script component

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  // Function to render hCaptcha once the script is loaded
  const renderCaptcha = () => {
    // Ensure hCaptcha is available and the container exists
    if (window.hcaptcha && document.getElementById("hcaptcha-container")) {
      window.hcaptcha.render("hcaptcha-container", {
        sitekey: "6ae8f532-055e-4dec-9236-cb0e221e74d4", // Your public sitekey
        callback: (token) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(null), // Clear token if it expires
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure captcha is completed before submission
    if (!captchaToken) {
      alert("Please complete the hCaptcha.");
      return;
    }

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    data["h-captcha-response"] = captchaToken; // Add the hCaptcha token to the form data

    console.log("Captcha Token to be sent:", captchaToken);
    console.log("Full data to be sent:", data);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed: An unknown error occurred.");
      }

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form fields
      setCaptchaToken(null); // Reset captcha token
      if (window.hcaptcha) {
        window.hcaptcha.reset(); // Reset the hCaptcha widget for subsequent submissions
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus(`Submission failed: ${error.message}`);
    }
  };

  return (
    <Layout>
      {/* The Script component from next/script handles loading the hCaptcha script.
        The onLoad prop ensures renderCaptcha is called only when the script is fully loaded.
      */}
      <Script
        src="https://js.hcaptcha.com/1/api.js"
        async
        defer
        onLoad={renderCaptcha} // Call renderCaptcha when the script is loaded
      />

      <div className="flex flex-col items-center justify-center min-h-screen-75 bg-cover bg-center">
        <h1 className="text-4xl font-bold text-green-forest mb-8">Contact Us</h1>

        <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full bg-white border border-gold-aura rounded p-2"
            ></textarea>
            <p className="text-xs text-gray-600 mt-1">Max 1000 characters</p>
          </div>

          {/* hCaptcha container */}
          <div id="hcaptcha-container" className="my-4"></div>

          <button
            type="submit"
            className="bg-green-forest text-white px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#204e39]"
          >
            Send Message
          </button>

          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </div>
    </Layout>
  );
}