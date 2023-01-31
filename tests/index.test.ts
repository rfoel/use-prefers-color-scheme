import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import usePrefersColorScheme from '../src'

describe('usePrefersColorScheme', () => {
  it('returns preferred color scheme', () => {
    const { result } = renderHook(() => usePrefersColorScheme())

    expect(result.current).toBe('no-preference')
  })
})
