type Props = {
  className?: string
  title?: string
}

/** HoliSti tree mark — same asset as platform.holisti.no */
export function HolistiTreeLogo({ className, title = 'HoliSti' }: Props) {
  return (
    <img
      className={className}
      src="/images/logo/holisti-tre.svg"
      alt={title}
      width={40}
      height={40}
      decoding="async"
    />
  )
}
