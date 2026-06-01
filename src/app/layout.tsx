import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/Toast"

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: 'swap',
})

const jost = Jost({ 
  subsets: ["latin"],
  variable: "--font-jost",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Winder Enterprise | Premium Furniture in West Bengal",
  description: "Premium home and office furniture, curated for the discerning few. Delivering excellence across West Bengal.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-[var(--color-gold)] selection:text-deep-black relative">
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />

        {/* Custom Cursor Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (window.innerWidth > 768) {
              const dot = document.getElementById('cursor-dot');
              const ring = document.getElementById('cursor-ring');
              
              let mouseX = window.innerWidth / 2;
              let mouseY = window.innerHeight / 2;
              
              let ringX = mouseX;
              let ringY = mouseY;
              
              window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                dot.style.transform = \`translate(\${mouseX}px, \${mouseY}px) translate(-50%, -50%)\`;
              });
              
              const render = () => {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                ring.style.transform = \`translate(\${ringX}px, \${ringY}px) translate(-50%, -50%)\`;
                requestAnimationFrame(render);
              }
              render();
            }
          `
        }} />
      </body>
    </html>
  )
}
