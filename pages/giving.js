import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";

export default function GivingPage() {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </Head>

      <Layout>
        <div className="w-[80%] mx-auto pt-24 text-black text-center">
          <h1 className="text-4xl font-header mb-6">Giving</h1>

          <p className="text-lg mb-4">
            We are preparing to offer secure recurring donation options soon.
          </p>

          <Link
            href="/coming-soon"
            className="text-purple-moon underline hover:text-gold-aura transition"
          >
            Set up Recurring Donation (Coming Soon)
          </Link>
        </div>
      </Layout>
    </>
  );
}
