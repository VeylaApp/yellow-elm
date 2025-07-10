import '@/styles/globals.css'
import { Cinzel_Decorative, Inter } from 'next/font/google'

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${cinzel.variable} ${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
