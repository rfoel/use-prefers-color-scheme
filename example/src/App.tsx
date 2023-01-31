import React, { useEffect } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

const App = () => {
  const preferredColorSchema = usePrefersColorScheme()
  const isDarkMode = preferredColorSchema === 'dark'

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('.favicon')
    if (favicon) {
      if (isDarkMode) favicon.href = 'dark.png'
      else favicon.href = 'light.png'
    }
  })

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
