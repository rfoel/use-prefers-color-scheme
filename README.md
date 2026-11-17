# use-prefers-color-scheme

> React hook for determining the preferred color scheme

[![npm](https://img.shields.io/npm/v/use-prefers-color-scheme.svg)](https://www.npmjs.com/package/use-prefers-color-scheme)
[![npm downloads](https://img.shields.io/npm/dm/use-prefers-color-scheme.svg)](https://www.npmjs.com/package/use-prefers-color-scheme)
[![bundle size](https://img.shields.io/bundlejs/size/use-prefers-color-scheme)](https://bundlejs.com/?q=use-prefers-color-scheme)

## Features

- Updates live when the user changes their system theme
- SSR and hydration safe (Next.js, Remix, etc.)
- Zero dependencies, < 1 kB
- Written in TypeScript, ships ESM and CommonJS

## Install

```bash
npm install use-prefers-color-scheme
```

Requires React 18 or newer.

## Usage

```tsx
import usePrefersColorScheme from 'use-prefers-color-scheme'

const App = () => {
  const colorScheme = usePrefersColorScheme()
  const isDarkMode = colorScheme === 'dark'

  return (
    <div>You are using {isDarkMode ? 'Dark Mode 🌚' : 'Light Mode 🌞'}!</div>
  )
}
```

The hook returns one of `'dark'`, `'light'` or `'no-preference'`. The `ColorScheme`
type and a named `usePrefersColorScheme` export are also available:

```ts
import {
  usePrefersColorScheme,
  type ColorScheme,
} from 'use-prefers-color-scheme'
```

## Server-side rendering

The server can't know the user's preference, so the hook returns `'no-preference'`
on the server and during hydration, then re-renders with the real value right
after. This keeps server and client markup identical and avoids hydration
mismatch errors.

If the first paint must already have the right colors, style it with the CSS
[`prefers-color-scheme`](https://developer.mozilla.org/docs/Web/CSS/@media/prefers-color-scheme)
media query or the [`color-scheme`](https://developer.mozilla.org/docs/Web/CSS/color-scheme)
property, and use the hook for anything that needs the value in JavaScript.

## Migrating from 1.x

- React 18 or newer is required (the hook is built on `useSyncExternalStore`).
- During hydration the hook now returns `'no-preference'` first, instead of the
  client value that caused hydration mismatches ([#76](https://github.com/rfoel/use-prefers-color-scheme/issues/76)).
  Client-only renders still get the right value on the first render.
- Browsers whose `MediaQueryList` lacks `addEventListener` (Safari 13 and older)
  are no longer supported.
- Imports must go through the package entry point; deep imports such as
  `use-prefers-color-scheme/dist/index.cjs.js` no longer resolve.

## Demo

[rfoel.github.io/use-prefers-color-scheme](https://rfoel.github.io/use-prefers-color-scheme/)

## License

MIT © [rfoel](https://github.com/rfoel)
