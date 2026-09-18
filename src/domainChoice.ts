import { useEffect, useState } from 'react'
import type { HostChoice } from './hostChoice'
import { proposal } from './proposal.config'

export type DomainChoice = 'subdomain' | 'existing' | 'new'

export const DOMAIN_STORAGE_KEY = 'forslagsrom_domain_choice'
export const DOMAIN_CHANGE_EVENT = 'forslagsrom-domain-change'

export function readDomainChoice(): DomainChoice | null {
  try {
    const raw = localStorage.getItem(DOMAIN_STORAGE_KEY)
    if (raw === 'subdomain' || raw === 'existing' || raw === 'new') return raw
  } catch {
    /* ignore */
  }
  return null
}

export function writeDomainChoice(next: DomainChoice | null): void {
  try {
    if (next == null) localStorage.removeItem(DOMAIN_STORAGE_KEY)
    else localStorage.setItem(DOMAIN_STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(DOMAIN_CHANGE_EVENT, { detail: next }))
}

export function isDomainAvailableForHost(
  domain: DomainChoice,
  host: HostChoice | null,
): boolean {
  const option = proposal.offer.domainOptions.find((item) => item.id === domain)
  if (!option) return false
  if (host == null) return true
  return (option.hosts as readonly HostChoice[]).includes(host)
}

export function filterDomainOptionsForHost(host: HostChoice | null) {
  return proposal.offer.domainOptions.filter((option) =>
    isDomainAvailableForHost(option.id, host),
  )
}

export function useDomainChoice(
  host: HostChoice | null,
): [DomainChoice | null, (next: DomainChoice) => void] {
  const [domain, setDomain] = useState<DomainChoice | null>(() =>
    typeof window === 'undefined' ? null : readDomainChoice(),
  )

  useEffect(() => {
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<DomainChoice | null>).detail
      if (detail === 'subdomain' || detail === 'existing' || detail === 'new') {
        setDomain(detail)
      } else if (detail == null) {
        setDomain(null)
      }
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== DOMAIN_STORAGE_KEY) return
      const value = event.newValue
      if (value === 'subdomain' || value === 'existing' || value === 'new') {
        setDomain(value)
      } else if (value == null) {
        setDomain(null)
      }
    }
    window.addEventListener(DOMAIN_CHANGE_EVENT, onCustom)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(DOMAIN_CHANGE_EVENT, onCustom)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    if (domain == null) return
    if (isDomainAvailableForHost(domain, host)) return
    setDomain(null)
    writeDomainChoice(null)
  }, [host, domain])

  function chooseDomain(next: DomainChoice) {
    setDomain(next)
    writeDomainChoice(next)
  }

  return [domain, chooseDomain]
}
