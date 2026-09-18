import { proposal, FIRM_NAME } from '../proposal.config'

export type ClientLogoVariant = 'full' | 'ring' | 'wordmark'

type Props = {
  className?: string
  title?: string
  /** `ring` = kun emblem, `wordmark` = navn/tagline, `full` = begge */
  variant?: ClientLogoVariant
}

const SRC: Record<ClientLogoVariant, string> = {
  full: proposal.client.logo.full,
  ring: proposal.client.logo.ring,
  wordmark: proposal.client.logo.src,
}

/** Kundens logo — stier settes i `proposal.config.ts` (`client.logo`). */
export function ClientLogo({
  className,
  title = FIRM_NAME,
  variant = 'wordmark',
}: Props) {
  const decorative = title === ''
  return (
    <img
      className={className}
      src={SRC[variant]}
      alt={decorative ? '' : title}
      decoding="async"
    />
  )
}

/** Dempet bakgrunns-mark — utenfor dokumentflyt, endrer ikke sidestørrelse. */
export function ClientMarkBg({
  className,
  variant = 'ring',
}: {
  className?: string
  variant?: Exclude<ClientLogoVariant, 'full'>
}) {
  return (
    <div className={`client-mark-bg ${className ?? ''}`} aria-hidden="true">
      <ClientLogo className="client-mark-bg__img" variant={variant} title="" />
    </div>
  )
}
