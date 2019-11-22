import Asserts from '../src/asserts'
import Checks from '../src/checks'

describe('Asserts API', () => {
  const createAssertion = (assertion: (value: unknown) => void) => (
    value: unknown
  ) => assertion(value)

  describe('isNumber()', () => {
    const assertion = createAssertion(Asserts.isNumber)
    let spy: jest.SpyInstance

    beforeEach(() => {
      spy = jest.spyOn(Checks, 'isNumber')
    })

    afterEach(() => {
      spy.mockRestore()
    })

    it('`Checks.isNumber()` を呼び出す', () => {
      assertion(123)
      expect(spy).toHaveBeenCalledWith(123)
    })

    it('`void` を返す', () => {
      expect(assertion(123)).toBeUndefined()
      expect(spy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a number')
      expect(spy).toHaveReturnedWith(false)
    })
  })
})
