import { useEffect, useState } from 'react'

const darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)')

const lightQuery = window.matchMedia?.('(prefers-color-scheme: light)')

const usePrefersColorScheme = () => {
  const isDark = darkQuery?.matches
  const isLight = lightQuery?.matches

  const [preferredColorSchema, setPreferredColorSchema] = useState<
    'dark' | 'light' | 'no-preference'
  >(isDark ? 'dark' : isLight ? 'light' : 'no-preference')

  useEffect(() => {
    if (isDark) setPreferredColorSchema('dark')
    else if (isLight) setPreferredColorSchema('light')
    else setPreferredColorSchema('no-preference')
  }, [isDark, isLight])

  useEffect(() => {
    if (typeof darkQuery?.addEventListener === 'function') {
      // In modern browsers MediaQueryList should subclass EventTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList

      const darkListener = ({ matches }) =>
        matches && setPreferredColorSchema('dark')
      const lightListener = ({ matches }) =>
        matches && setPreferredColorSchema('light')

      darkQuery?.addEventListener('change', darkListener)
      lightQuery?.addEventListener('change', lightListener)

      return () => {
        darkQuery?.removeEventListener('change', darkListener)
        lightQuery?.removeEventListener('change', lightListener)
      }
    } else {
      // In some early implementations MediaQueryList existed, but did not
      // subclass EventTarget

      // Closing over isDark here would cause it to not update when
      // `darkQuery.matches` changes
      const listener = () =>
        setPreferredColorSchema(
          darkQuery.matches
            ? 'dark'
            : lightQuery.matches
            ? 'light'
            : 'no-preference',
        )

      // This is two state updates if a user changes from dark to light, but
      // both state updates will be consistent and should be batched by React,
      // resulting in only one re-render
      darkQuery?.addEventListener('change', listener)
      lightQuery?.addEventListener('change', listener)

      return () => {
        darkQuery?.removeEventListener('change', listener)
        lightQuery?.removeEventListener('change', listener)
      }
    }
  }, [])

  if (typeof window.matchMedia !== 'function') {
    return preferredColorSchema
  }

  return preferredColorSchema
}

export default usePrefersColorScheme
