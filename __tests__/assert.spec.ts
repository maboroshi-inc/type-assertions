import { assert } from '../src/internal/assert'

describe('assert()', () => {
  it('`void` を返す', () => {
    expect(assert(true)).toBeUndefined()
  })

  it('例外を投げる', () => {
    expect(() => assert(false, 'A DEFINED ERROR MESSAGE')).toThrowError(
      'A DEFINED ERROR MESSAGE'
    )
  })
})
