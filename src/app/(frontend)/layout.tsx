import Footer from '@/components/Footer'
import NavLinks from '@/components/NavLinks'
import { Toaster } from '@/components/ui/sonner'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen background-style">
        <NavLinks />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
