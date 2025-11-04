import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "McDonald's AI Assistant",
  description: "Your friendly McDonald's ordering assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
