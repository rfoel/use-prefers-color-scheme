import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  sourcemap: true,
  exports: true,
  publint: true,
  attw: { profile: 'node16' },
  // Same CommonJS shape as 1.x: `require()` returns { default, usePrefersColorScheme }.
  outputOptions: { exports: 'named' },
})
