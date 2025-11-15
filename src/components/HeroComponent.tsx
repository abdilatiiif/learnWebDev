import Image from 'next/image'
import Link from 'next/link'

type HeroComponentProps = {
  title: string
  subtitle?: string | null
  image_url?: string | null
  ctaText?: string | null
  ctaLink?: string | null
}

export default function HeroComponent({
  title,
  subtitle,
  image_url,
  ctaText,
  ctaLink,
}: HeroComponentProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {image_url && (
          <Image
            src={image_url}
            alt={title || 'Hero image'}
            fill
            className="object-cover kenburns-top-right"
            priority
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 bg-black/20">'</div>

      {/* Hero Content */}
      <div className="relative z-20 text-center p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md">{subtitle}</p>
        )}

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
