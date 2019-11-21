import Checks from '../src/checks'

describe('Checks API', () => {
  describe('isNumber()', () => {
    it('`true` を返す', () => {
      expect(Checks.isNumber(123)).toBe(true)
      expect(Checks.isNumber(new Number(123))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Checks.isNumber(null)).toBe(false)
      expect(Checks.isNumber(NaN)).toBe(false)
    })
  })
})
