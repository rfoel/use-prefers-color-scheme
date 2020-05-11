import { renderHook } from '@testing-library/react-hooks'
import usePrefersColorScheme from '.'

describe('usePrefersColorScheme', () => {
  it('returns preferred color scheme', () => {
    const { result } = renderHook(() => usePrefersColorScheme())

    expect(result.current).toBe('no-preference')
  })
})
