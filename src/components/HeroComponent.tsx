import Image from 'next/image'
import Link from 'next/link'

type HeroComponentProps = {
  title: string
  subtitle?: string | null
  backgroundImage: any
  ctaText?: string | null
  ctaLink?: string | null
}

export default function HeroComponent({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
}: HeroComponentProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt || title || 'Hero image'}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>

        {subtitle && <p className="text-xl md:text-2xl mb-8 text-gray-200">{subtitle}</p>}

        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
