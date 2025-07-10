import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="bg-[#f8f5f2] text-[#32174d] font-inter min-h-screen flex flex-col">
      {/* FIXED TRANSPARENT HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f5f2] bg-opacity-95 backdrop-blur">

        <div className="w-[60%] mx-auto grid grid-cols-5 items-center py-4">
          <div className="flex justify-center">
            <Link href="/" className="block">
              <img
                src="/logo.png"
                alt="Yellow Elm Logo"
                className="max-h-[75px] w-auto object-contain"
              />
            </Link>
          </div>
          <div className="text-center">
            <Link href="/membership" className="hover:text-[#d1a857] transition">
              Become a Member
            </Link>
          </div>
          <div className="text-center">
            <Link href="/about" className="hover:text-[#d1a857] transition">
              About Us
            </Link>
          </div>
          <div className="text-center">
            <Link href="/giving" className="hover:text-[#d1a857] transition">
              Giving
            </Link>
          </div>
          <div className="text-center">
            <Link href="/contact" className="hover:text-[#d1a857] transition">
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT with padding to avoid header overlap */}
      <main className="flex-grow relative overflow-hidden pt-[96px]">
        {/* Global Watermark */}
        <img
          src="/logo.png"
          alt="Yellow Elm Watermark"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 w-[400px] max-w-[90%] pointer-events-none z-0"
        />

        {/* Page Content Wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-[#32174d] mt-16 py-8">
        © 2025 Yellow Elm Ministries | A project of Second Bloom Solutions.<br />
        Yellow Elm is a registered 501(c)(3) nonprofit. All contributions are tax-deductible to the extent allowed by law.
      </footer>
    </div>
  )
}
