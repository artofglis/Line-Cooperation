import { useEffect, useState } from 'react'
import type { PageId } from './content'
import { proposal } from './proposal.config'

export type HostChoice = 'wix' | 'external'

export const HOST_STORAGE_KEY = 'forslagsrom_host_choice'
export const HOST_CHANGE_EVENT = 'forslagsrom-host-change'

/** Alltid synlig i menyen — også ved Wix */
const WIX_MENU_PAGES: readonly PageId[] = ['hjem', 'sovn', 'holisti']

/** Sider som kun hører til ekstern-leveransen (skjules i meny ved Wix) */
export function getExternalOnlyPageIds(): Set<PageId> {
  const { deliveryScope } = proposal.offer
  const fromScope = [
    ...deliveryScope.externalPages.map((p) => p.page),
    ...deliveryScope.bonusPages.map((p) => p.page),
  ] as PageId[]
  return new Set<PageId>([...fromScope, 'signatur', 'forsta'])
}

export function readHostChoice(): HostChoice | null {
  try {
    const raw = localStorage.getItem(HOST_STORAGE_KEY)
    if (raw === 'wix' || raw === 'external') return raw
  } catch {
    /* ignore */
  }
  return null
}

export function writeHostChoice(next: HostChoice): void {
  try {
    localStorage.setItem(HOST_STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(HOST_CHANGE_EVENT, { detail: next }))
}

export function isPageVisibleForHost(
  page: PageId,
  host: HostChoice | null,
): boolean {
  if (host !== 'wix') return true
  return WIX_MENU_PAGES.includes(page)
}

export function filterPagesForHost<T extends { id: PageId }>(
  all: readonly T[],
  host: HostChoice | null,
): T[] {
  return all.filter((item) => isPageVisibleForHost(item.id, host))
}

export function useHostChoice(): [HostChoice | null, (next: HostChoice) => void] {
  const [host, setHost] = useState<HostChoice | null>(() =>
    typeof window === 'undefined' ? null : readHostChoice(),
  )

  useEffect(() => {
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<HostChoice>).detail
      if (detail === 'wix' || detail === 'external') setHost(detail)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key !== HOST_STORAGE_KEY) return
      const value = event.newValue
      if (value === 'wix' || value === 'external') setHost(value)
      else if (value == null) setHost(null)
    }
    window.addEventListener(HOST_CHANGE_EVENT, onCustom)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(HOST_CHANGE_EVENT, onCustom)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  function chooseHost(next: HostChoice) {
    setHost(next)
    writeHostChoice(next)
  }

  return [host, chooseHost]
}
