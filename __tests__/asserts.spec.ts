import Asserts from '../src/asserts'
import Checks from '../src/checks'

describe('Asserts API', () => {
  describe('isNumber()', () => {
    it('`Checks.isNumber()` を呼び出す', () => {
      const spy = jest.spyOn(Checks, 'isNumber')
      const main = () => Asserts.isNumber(123)

      main()
      expect(spy).toHaveBeenCalledWith(123)

      spy.mockRestore()
    })

    it('例外を投げる', () => {
      expect(() => Asserts.isNumber(null)).toThrowError('value is not a number')
    })
  })
})
