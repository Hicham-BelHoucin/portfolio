import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Hicham Bel Houcin — Full-Stack & DevOps Engineer',
  description: "Explore Hicham's engineering portfolio through a classic scroll view or a direct interactive AI agent. Ask about Next.js, NestJS, DevOps, systems, and automation projects.",
  keywords: [
    'Hicham Bel Houcin',
    'Belhoucin Hicham',
    'Full-Stack Engineer',
    'DevOps Specialist',
    'Casablanca Developer',
    'Morocco Fullstack',
    '1337 Coding School',
    '42 Network student',
    'Next.js Developer',
    'NestJS Developer',
    'Automation Developer'
  ],
  authors: [{ name: 'Hicham Bel Houcin', url: 'https://github.com/Hicham-BelHoucin' }],
  creator: 'Hicham Bel Houcin',
  openGraph: {
    title: 'Hicham Bel Houcin — Full-Stack & DevOps Portfolio',
    description: "Interactive AI Chatbot & Classic portfolio for Hicham Bel Houcin, Full-Stack Engineer based in Casablanca, Morocco.",
    url: 'https://hicham-belhoucin.vercel.app',
    siteName: 'Hicham Bel Houcin Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hicham Bel Houcin Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hicham Bel Houcin — Full-Stack & DevOps Portfolio',
    description: "Interactive AI Chatbot & Classic portfolio for Hicham Bel Houcin, Full-Stack Engineer based in Casablanca, Morocco.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
