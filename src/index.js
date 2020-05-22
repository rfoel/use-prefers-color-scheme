import { useEffect, useState } from 'react'

const query = ([mode]) => `(prefers-color-scheme: ${mode})`

const usePrefersColorScheme = () => {
  const [preferredColorSchema, setPreferredColorSchema] = useState(
    'no-preference',
  )

  if (typeof window.matchMedia !== 'function') {
    return preferredColorSchema
  }

  const isDark = window.matchMedia(query`dark`).matches
  const isLight = window.matchMedia(query`light`).matches

  useEffect(() => {
    if (isDark) setPreferredColorSchema('dark')
    else if (isLight) setPreferredColorSchema('light')
    else setPreferredColorSchema('no-preference')
  }, [isDark, isLight])

  useEffect(() => {
    try {
      window
        .matchMedia(query`dark`)
        .addEventListener(
          'change',
          ({ matches }) => matches && setPreferredColorSchema('dark'),
        )

      window
        .matchMedia(query`light`)
        .addEventListener(
          'change',
          ({ matches }) => matches && setPreferredColorSchema('light'),
        )
    } catch (error) {
      window
        .matchMedia(query`dark`)
        .addListener(() => setPreferredColorSchema(isDark ? 'light' : 'dark'))
    }

    return () => {
      window.matchMedia(query`dark`).removeEventListener()
      window.matchMedia(query`light`).removeEventListener()
    }
  }, [])

  return preferredColorSchema
}

export default usePrefersColorScheme
