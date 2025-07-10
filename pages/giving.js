import Layout from "../components/layout";
import Link from "next/link";

export default function GivingPage() {
  return (
    <Layout>
      <div className="w-[60%] mx-auto pt-24 text-black text-center">
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
  );
}
