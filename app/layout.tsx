import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mihika Sharma - Data Science Portfolio",
  description:
    "Professional portfolio of Mihika Sharma - Data Science Enthusiast, Python Developer, and AI/ML Specialist. Showcasing projects, skills, and experience in data science and technology.",
  keywords: "Mihika Sharma, Data Science, Python, AI, ML, Portfolio, BCA, Jagran Lakecity University",
  authors: [{ name: "Mihika Sharma" }],
  openGraph: {
    title: "Mihika Sharma - Data Science Portfolio",
    description: "Professional portfolio showcasing data science projects and technical expertise",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihika Sharma - Data Science Portfolio",
    description: "Professional portfolio showcasing data science projects and technical expertise",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
