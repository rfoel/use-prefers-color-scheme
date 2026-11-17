import { useEffect } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

const App = () => {
  const colorScheme = usePrefersColorScheme()
  const isDarkMode = colorScheme === 'dark'

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('.favicon')
    if (favicon) favicon.href = isDarkMode ? 'dark.png' : 'light.png'
  }, [isDarkMode])

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? 'black' : 'white',
        color: isDarkMode ? 'white' : 'black',
      }}
    >
      You are using {isDarkMode ? 'Dark Mode 🌚' : 'Light Mode 🌞'}!
    </div>
  )
}

export default App
