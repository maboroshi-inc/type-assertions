import { assert } from '../src/internal/assert'

describe('assert()', () => {
  it('`void` を返す', () => {
    expect(assert(true)).toBeUndefined()
  })
})
