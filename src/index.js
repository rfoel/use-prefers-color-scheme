import { useEffect, useState } from 'react'

const query = ([mode]) => `(prefers-color-scheme: ${mode})`
const darkQuery = window.matchMedia?.(query`dark`)
const lightQuery = window.matchMedia?.(query`light`)

const usePrefersColorScheme = () => {
  const isDark = darkQuery?.matches
  const isLight = lightQuery?.matches

  const [preferredColorSchema, setPreferredColorSchema] = useState(
    isDark ? 'dark' : isLight ? 'light' : 'no-preference',
  )

  if (typeof window.matchMedia !== 'function') {
    return preferredColorSchema
  }

  useEffect(() => {
    if (isDark) setPreferredColorSchema('dark')
    else if (isLight) setPreferredColorSchema('light')
    else setPreferredColorSchema('no-preference')
  }, [isDark, isLight])

  useEffect(() => {
    if (typeof darkQuery!.addEventListener === 'function') {
      // In modern browsers MediaQueryList should subclass EventTarget
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
      
      const darkListener = ({ matches }) => matches && setPreferredColorSchema('dark')
      const lightListener = ({ matches }) => matches && setPreferredColorSchema('light')

      darkQuery!.addEventListener('change', darkListener)
      lightQuery!.addEventListener('change', lightListener)

      return () => {
        darkQuery!.removeEventListener('change', darkListener)
        lightQuery!.removeEventListener('change', lightListener)
      }
    } else {
      // In some early implementations MediaQueryList existed, but did not
      // subclass EventTarget
      
      // Closing over isDark here would cause it to not update when
      // `darkQuery.matches` changes
      const listener = () => setPreferredColorSchema(darkQuery.matches ? 'dark' : lightQuery.matches ? 'light' : 'no-preference'))

      // This is two state updates if a user changes from dark to light, but
      // both state updates will be consistent and should be batched by React,
      // resulting in only one re-render
      darkQuery!.addListener(listener)
      lightQuery!.addListener(listener)
      
      return () => {
        darkQuery!.removeListener(listener)
        lightQuery!.removeListener(listener)
      }
    }
  }, [])

  return preferredColorSchema
}

export default usePrefersColorScheme
