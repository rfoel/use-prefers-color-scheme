import { useSyncExternalStore } from 'react'

export type ColorScheme = 'dark' | 'light' | 'no-preference'

const DARK_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_QUERY = '(prefers-color-scheme: light)'

const isSupported = (): boolean =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'

const subscribe = (onChange: () => void): (() => void) => {
  if (!isSupported()) return () => {}

  const queries = [
    window.matchMedia(DARK_QUERY),
    window.matchMedia(LIGHT_QUERY),
  ]
  for (const query of queries) query.addEventListener('change', onChange)

  return () => {
    for (const query of queries) query.removeEventListener('change', onChange)
  }
}

const getSnapshot = (): ColorScheme => {
  if (!isSupported()) return 'no-preference'
  if (window.matchMedia(DARK_QUERY).matches) return 'dark'
  if (window.matchMedia(LIGHT_QUERY).matches) return 'light'
  return 'no-preference'
}

const getServerSnapshot = (): ColorScheme => 'no-preference'

/**
 * React hook that returns the user's preferred color scheme
 * (`prefers-color-scheme`) and re-renders when it changes.
 *
 * Returns `no-preference` on the server, during hydration and in environments
 * without `window.matchMedia`, so server and client markup always match.
 *
 * @see https://github.com/rfoel/use-prefers-color-scheme#usage
 */
export function usePrefersColorScheme(): ColorScheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default usePrefersColorScheme
