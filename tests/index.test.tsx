import { act, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import usePrefersColorScheme, {
  type ColorScheme,
  usePrefersColorScheme as namedExport,
} from '../src'

/**
 * Minimal controllable `matchMedia`: every MediaQueryList for the same query
 * shares one set of listeners, and `setScheme` flips `matches` and fires
 * `change` on the queries whose result changed, like a browser does.
 */
const mockMatchMedia = (initial: ColorScheme) => {
  let scheme = initial
  const listeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>()
  const matches = (query: string) =>
    query === `(prefers-color-scheme: ${scheme})`

  const matchMedia = vi.fn((query: string) => {
    const set = listeners.get(query) ?? new Set()
    listeners.set(query, set)
    return {
      media: query,
      get matches() {
        return matches(query)
      },
      addEventListener: (
        _: 'change',
        listener: (e: MediaQueryListEvent) => void,
      ) => set.add(listener),
      removeEventListener: (
        _: 'change',
        listener: (e: MediaQueryListEvent) => void,
      ) => set.delete(listener),
    } as unknown as MediaQueryList
  })

  vi.stubGlobal('matchMedia', matchMedia)

  return {
    matchMedia,
    listenerCount: () =>
      [...listeners.values()].reduce((total, set) => total + set.size, 0),
    setScheme: (next: ColorScheme) => {
      const before = new Map([...listeners.keys()].map(q => [q, matches(q)]))
      scheme = next
      for (const [query, set] of listeners) {
        if (before.get(query) === matches(query)) continue
        const event = { matches: matches(query), media: query }
        for (const listener of set) listener(event as MediaQueryListEvent)
      }
    },
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('usePrefersColorScheme', () => {
  it.each<ColorScheme>(['dark', 'light', 'no-preference'])(
    'returns %s on the first render',
    scheme => {
      mockMatchMedia(scheme)
      const { result } = renderHook(() => usePrefersColorScheme())
      expect(result.current).toBe(scheme)
    },
  )

  it('updates when the preference changes', () => {
    const media = mockMatchMedia('light')
    const { result } = renderHook(() => usePrefersColorScheme())

    act(() => media.setScheme('dark'))
    expect(result.current).toBe('dark')

    act(() => media.setScheme('light'))
    expect(result.current).toBe('light')

    // Neither query matches anymore; only "change" events with matches=false fire.
    act(() => media.setScheme('no-preference'))
    expect(result.current).toBe('no-preference')
  })

  it('removes its listeners on unmount', () => {
    const media = mockMatchMedia('dark')
    const { unmount } = renderHook(() => usePrefersColorScheme())
    expect(media.listenerCount()).toBeGreaterThan(0)

    unmount()
    expect(media.listenerCount()).toBe(0)
  })

  it('returns no-preference when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    const { result } = renderHook(() => usePrefersColorScheme())
    expect(result.current).toBe('no-preference')
  })

  it('renders no-preference on the server and hydrates without a mismatch', async () => {
    const seen: ColorScheme[] = []
    const App = () => {
      const scheme = usePrefersColorScheme()
      seen.push(scheme)
      return createElement('span', null, scheme)
    }

    vi.stubGlobal('matchMedia', undefined)
    const html = renderToString(createElement(App))
    expect(html).toBe('<span>no-preference</span>')

    mockMatchMedia('dark')
    const container = document.createElement('div')
    container.innerHTML = html
    const onRecoverableError = vi.fn()

    await act(async () => {
      hydrateRoot(container, createElement(App), { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(container.textContent).toBe('dark')
  })

  it('exposes the hook as both default and named export', () => {
    expect(namedExport).toBe(usePrefersColorScheme)
  })
})
