import Layout from '@/components/layout'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-96px)] w-full bg-[#f8f5f2] flex items-center justify-center overflow-hidden">
        {/* Watermark Logo */}
        <img
          src="/logo.png"
          alt="Yellow Elm Logo Watermark"
          className="absolute opacity-10 w-[400px] max-w-[90%] pointer-events-none"
        />

        {/* Foreground Box */}
        <div className="bg-black/80 p-10 rounded-lg text-center w-[60%] z-10">
          <h1 className="text-5xl font-inter text-white mb-6">Coming Soon</h1>
          <Link
            href="/mailinglist "
            className="text-white font-inter underline hover:text-[#d1a857] transition"
          >
            Sign up for updates
          </Link>
        </div>
      </div>
    </Layout>
  )
}
