import Footer from '@/components/Footer'
import NavLinks from '@/components/NavLinks'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <NavLinks />
        {children}
        <Footer />
      </body>
    </html>
  )
}
