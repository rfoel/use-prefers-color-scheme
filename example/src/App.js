import React from 'react'
import styled, { css } from 'styled-components'
import usePrefersColorScheme from 'use-prefers-color-scheme'

const Container = styled.div(({ isDarkMode }) => {
  const background = isDarkMode ? 'black' : 'white'
  const color = isDarkMode ? 'white' : 'dark'

  return css`
    align-items: center;
    background: ${background};
    color: ${color};
    display: flex;
    font-size: 2em;
    height: 100%;
    justify-content: center;
  `
})

const App = () => {
  const preferredColorSchema = usePrefersColorScheme()
  const isDarkMode = preferredColorSchema === 'dark'

  return (
    <Container isDarkMode={isDarkMode}>
      You are using {isDarkMode ? 'Dark Mode 🌚' : 'Light Mode 🌞'}!
    </Container>
  )
}

export default App
