import React from 'react'
import { useMyHook } from 'use-prefers-color-scheme'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App