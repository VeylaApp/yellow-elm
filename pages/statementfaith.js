// pages/statementfaith.js
import Layout from "../components/layout";

export default function StatementOfFaith() {
  return (
    <Layout>
      <div className="w-[60%] mx-auto pt-6 text-black">
        <h1 className="text-3xl font-header text-center mb-4">Our Statement of Faith</h1>
        <p className="text-center mb-6">
          You can view our full Statement of Faith below or open it in a new tab.
        </p>

        <div className="text-center mb-4">
          <a
            href="/Statement-of-Faith.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-purple-moon"
          >
            Open Full PDF in New Tab
          </a>
        </div>

        <div className="aspect-video w-full h-[80vh]">
          <iframe
            src="/Statement-of-Faith.pdf"
            width="100%"
            height="100%"
            style={{ border: "1px solid #ccc" }}
            title="Statement of Faith PDF"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
}
