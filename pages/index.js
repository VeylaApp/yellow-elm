import Layout from '@/components/layout'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// DROPDOWN COMPONENT (with outside click close)
function Dropdown({ title, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#32174d] text-white font-inter py-4 rounded-lg font-semibold hover:shadow-[0_0_10px_2px_#32174d] transition"
        style={{ fontFamily: 'Inter, sans-serif', color: '#fff' }}
      >
        {title}
      </button>

      {open && (
  <div className="absolute top-full mt-1 bg-[#32174d] rounded-md shadow-lg z-[100] w-[calc(100%-6px)] left-1/2 -translate-x-1/2">


          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm font-inter hover:bg-[#d1a857] transition"
              style={{ color: '#fff' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Layout>
      <div className="h-[.5px]"></div>

<div className="w-full bg-purple-moon text-white text-center px-4 py-[10px] mb-[10px] text-sm tracking-wide">
   Yellow Elm Ministries is a sacred, inclusive space for queer, trans, and spiritually sovereign beings. You are welcome here.
</div>


      {/* MAIN HERO + RIGHT CARDS */}
      <section className="w-[80%] mx-auto">
        <div className="flex gap-[10px]">
          {/* LEFT: Forest Image */}
          <div
            className="w-[60%] rounded-lg shadow-md bg-cover bg-center h-[500px] flex items-start justify-center pt-[15px]"
            style={{ backgroundImage: "url('/forest-circle.jpg')" }}
          >
            <h1
              className="text-[1.5rem] font-inter text-white text-center drop-shadow-xl px-4"
              style={{ color: '#fff' }}
            >
              Welcome to Yellow Elm Ministries
            </h1>
          </div>

          {/* RIGHT: 3 Linked Cards */}
          <div className="w-[40%] h-[500px] flex flex-col gap-[10px]">
            {/* Mission */}
            <Link href="/mission" passHref legacyBehavior>
              <a className="block h-[160px]">
                <div
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-md flex items-center justify-center hover:scale-[1.03] hover:-translate-y-[2px] transition-transform duration-300 ease-in-out"
                  style={{ backgroundImage: "url('/mission.png')" }}
                >
                  <span
                    className="text-[1.25rem] font-inter text-center drop-shadow"
                    style={{ color: '#fff' }}
                  >
                    Mission Statement
                  </span>
                </div>
              </a>
            </Link>

            {/* Membership */}
            <Link href="/membership" passHref legacyBehavior>
              <a className="block h-[160px]">
                <div
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-md flex items-center justify-center hover:scale-[1.03] hover:-translate-y-[2px] transition-transform duration-300 ease-in-out"
                  style={{ backgroundImage: "url('/member.jpg')" }}
                >
                  <span
                    className="text-[1.25rem] font-inter text-center drop-shadow"
                    style={{ color: '#fff' }}
                  >
                    Become a Member
                  </span>
                </div>
              </a>
            </Link>

            {/* Giving */}
            <Link href="/coming-soon" passHref legacyBehavior>
              <a className="block h-[160px]">
                <div
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-md flex items-center justify-center hover:scale-[1.03] hover:-translate-y-[2px] transition-transform duration-300 ease-in-out"
                  style={{ backgroundImage: "url('/giving.jpg')" }}
                >
                  <span
                    className="text-[1.25rem] font-inter text-center drop-shadow"
                    style={{ color: '#fff' }}
                  >
                    Giving
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* DROPDOWN BUTTON ROW */}
      <section className="w-[80%] mx-auto mt-[10px]">
        <div className="flex flex-wrap justify-between gap-[10px]">

          {/* Education Dropdown */}
          <Dropdown
            title="Education & Counseling"
            items={[
              { label: 'YouTube Meditation Series', href: '/coming-soon' },
              { label: 'Online Classes', href: '/coming-soon' },
              { label: 'On Site Classes', href: '/coming-soon' },
              { label: 'Clergy Counseling', href: '/coming-soon'},
            ]}
          />

          {/* Sacred Circle */}
          <Dropdown
            title="Sacred Circle"
            items={[
              { label: 'Meeting Calendar', href: '/coming-soon' },
              { label: 'Special Events', href: '/coming-soon' },
              { label: 'Retreats', href: '/coming-soon' },
            ]}
          />

          {/* Let's Connect */}
          <Dropdown
            title="Let's Connect"
            items={[
              { label: 'Join the Ministry', href: '/membership' },
              { label: 'Join the Mailing List', href: '/mailinglist' },
              { label: 'Volunteer Opportunities', href: '/coming-soon' },
              { label: 'Media Request', href: '/coming-soon' },
            ]}
          />
        </div>
        
      </section>
    </Layout>
  )
}
