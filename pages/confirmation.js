// pages/confirmation.js

import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function ConfirmationPage() {
  const router = useRouter();
  const data = router.query;

  return (
    <Layout>
      <style>{`
        @media print {
          header, footer, nav, .no-print {
            display: none !important;
          }
          .print-area {
            display: block !important;
          }
        }
      `}</style>
      <div className="print-area w-[60%] mx-auto mt-10 mb-12 text-black pt-6">
        <h1 className="text-3xl font-header text-center mb-6">Thank You for Joining Yellow Elm Ministries</h1>

        <p className="mb-6 text-center">
          Your submission has been received. Below is a summary of your responses:
        </p>

        <div className="bg-white border border-gold-aura rounded p-6 space-y-2">
          <p><strong>Name:</strong> {data.first_name} {data.last_name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          {data.phone && <p><strong>Phone:</strong> {data.phone}</p>}
          <p><strong>Address:</strong> {data.address_street}, {data.address_city}, {data.address_state} {data.address_zip}</p>
          {data.reason && <p><strong>Reason for Joining:</strong> {data.reason}</p>}

          {data.subscribe && <p>✅ Subscribed to Newsletter</p>}
          {data.volunteer_info && (
            <p><strong>Volunteer Interest:</strong> {data.volunteer_info}</p>
          )}
        </div>

        {(data.donationChecked === true || data.donationChecked === "true") && (
          <div className="mt-6 text-center">
            <p className="mb-2 font-semibold">Would you like to complete your recurring donation setup?</p>
            <a
              href="https://donate.yellowelm.org" // Replace this with your real link
              className="inline-block bg-green-forest text-white px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#204e39]"
            >
              Set Up Donation
            </a>
          </div>
        )}
              <div className="mt-6 text-center no-print">
          <button
            onClick={() => window.print()}
            className="bg-gold-aura text-black px-6 py-2 rounded shadow-md border border-black hover:shadow-[0_0_10px_2px_#d1a857]"
          >
            Print This Page
          </button>
        </div>
      </div>
    </Layout>
  );
}
