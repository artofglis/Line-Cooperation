import type { DesignId, PageId } from '../content'
import { isPageVisibleForHost, useHostChoice } from '../hostChoice'

type Props = {
  design: DesignId
  className?: string
}

const links: { page: PageId; label: string }[] = [
  { page: 'om', label: 'Om' },
  { page: 'metoder', label: 'Metoder' },
  { page: 'time', label: 'En time' },
  { page: 'faq', label: 'FAQ' },
  { page: 'ro', label: 'Ro' },
  { page: 'sovn', label: 'Søvn' },
  { page: 'signatur', label: 'Signatur' },
  { page: 'forsta', label: 'Forstå' },
  { page: 'tilbud', label: 'Kampanje' },
  { page: 'holisti', label: 'Tilbudet' },
]

/** Lenker mellom sidene i forslagsrommet — filtreres ved Wix-valg. */
export function ProposalLinks({ design, className }: Props) {
  const [host] = useHostChoice()
  const visible = links.filter((link) => isPageVisibleForHost(link.page, host))

  if (visible.length === 0) return null

  return (
    <nav className={className ?? 'proposal-links'} aria-label="Andre sider i forslaget">
      {visible.map((link, index) => (
        <span key={link.page}>
          {index > 0 ? <span aria-hidden="true"> · </span> : null}
          <a
            href={
              link.page === 'holisti'
                ? '?page=holisti'
                : `?page=${link.page}&design=${design}`
            }
          >
            {link.label}
          </a>
        </span>
      ))}
    </nav>
  )
}
