import { useState, useEffect } from 'react'
import Link from 'next/link'

function Dropdown({ title, items }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#32174d] text-white font-inter py-4 rounded-lg font-semibold hover:shadow-[0_0_10px_2px_#32174d] transition"
      >
        {title}
      </button>

      {open && isMobile && (
        <div className="fixed inset-0 bg-[#32174d] bg-opacity-95 z-[1000] p-6 overflow-y-auto flex flex-col items-center">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-xl self-end mb-4"
          >
            ✕
          </button>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-lg font-inter text-white hover:text-[#d1a857]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {open && !isMobile && (
        <div className="absolute top-full mt-1 w-[calc(100%-6px)] left-1/2 -translate-x-1/2 bg-[#32174d] rounded-md shadow-lg z-[100]">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm font-inter text-white hover:bg-[#d1a857] transition"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-[#f8f5f2] text-[#32174d] font-inter min-h-screen flex flex-col">
      {/* FIXED TRANSPARENT HEADER */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#f8f5f2] bg-opacity-95 backdrop-blur">
        {/* Responsive Nav */}
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-5 items-center py-[5px]">

          <div className="flex justify-center md:justify-start">
            <Link href="/" className="block">
              <img
                src="/logo.png"
                alt="Yellow Elm Logo"
                className="h-[60px] w-auto object-contain"
              />
            </Link>
          </div>
          <div className="text-center">
            <Link href="/membership" className="hover:text-[#d1a857] transition">Become a Member</Link>
          </div>
          <div className="text-center">
            <Link href="/about" className="hover:text-[#d1a857] transition">About Us</Link>
          </div>
          <div className="text-center">
            <Link href="/giving" className="hover:text-[#d1a857] transition">Giving</Link>
          </div>
          <div className="text-center">
            <Link href="/contact" className="hover:text-[#d1a857] transition">Contact</Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT with padding to avoid header overlap */}
      <main className="flex-grow relative overflow-visible pt-[120px]">
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
      <footer className="text-center text-xs text-[#32174d] mt-[20px] px-6 pt-10 pb-12 leading-relaxed bg-[#f8f5f2]">
        <div className="max-w-[90%] mx-auto flex flex-col gap-4 items-center">

          <div className="text-center">
            © 2025 Yellow Elm Ministries | A project of Second Bloom Solutions.<br />
            Yellow Elm is a registered 501(c)(3) nonprofit. All contributions are tax-deductible to the extent allowed by law.
          </div>
        </div>
      </footer>
    </div>
  )
}
