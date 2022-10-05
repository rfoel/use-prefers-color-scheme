import { renderHook } from '@testing-library/react'
import usePrefersColorScheme from '.'

describe('usePrefersColorScheme', () => {
  it('returns preferred color scheme', () => {
    const { result } = renderHook(() => usePrefersColorScheme())

    expect(result.current).toBe('no-preference')
  })
})
