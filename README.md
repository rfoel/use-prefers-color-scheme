# use-prefers-color-scheme

> React hook for determining the preferred color scheme

[![NPM](https://img.shields.io/npm/v/use-prefers-color-scheme.svg)](https://www.npmjs.com/package/use-prefers-color-scheme)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features:

- SSR support
- Written in Typescript

## Install

```bash
npm install --save use-prefers-color-scheme
```

## Usage

> **Tip** When rendered in node (SSR) the hook returns `no-preference`.

```jsx
import React from 'react'

import usePrefersColorScheme from 'use-prefers-color-scheme'

const App = () => {
  const prefersColorScheme = usePrefersColorScheme()
  const isDarkMode = prefersColorScheme === 'dark'

  return (
    <div>You are using {isDarkMode ? 'Dark Mode 🌚' : 'Light Mode 🌞'}!</div>
  )
}
```


## Online Demo

[![Open Codesanbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/use-prefers-color-scheme-example-xb134y?file=/src/App.js)


## License

MIT © [rfoel](https://github.com/rfoel)
