import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rodrigo Assis',
  icons: {
    icon: '/favicon-32x32.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
