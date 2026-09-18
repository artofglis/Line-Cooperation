import './mid-banner.css'

type Props = {
  variant: 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6'
  image: string
  alt?: string
  caption: string
  objectPosition?: string
}

/** Full-bleed midtbanner — atmosfære midt på siden, stil via variant. */
export function MidBanner({
  variant,
  image,
  alt = '',
  caption,
  objectPosition = 'center center',
}: Props) {
  return (
    <section
      className={`mid-banner mid-banner--${variant}`}
      aria-label={caption}
    >
      <div className="mid-banner__media" aria-hidden={alt ? undefined : true}>
        <img
          src={image}
          alt={alt}
          width={2400}
          height={900}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
        />
      </div>
      <div className="mid-banner__veil" aria-hidden="true" />
      <p className="mid-banner__caption">{caption}</p>
    </section>
  )
}
