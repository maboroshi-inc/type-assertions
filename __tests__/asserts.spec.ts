import Asserts from '../src/asserts'
import Checks from '../src/checks'

describe('Asserts API', () => {
  const createAssertion = (assertion: (value: unknown) => void) => (
    value: unknown
  ) => assertion(value)
  let assertion: ReturnType<typeof createAssertion>
  let checksAPISpy: jest.SpyInstance

  describe('isArray()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isArray)
      checksAPISpy = jest.spyOn(Checks, 'isArray')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Chekcs.isArray()` を呼び出す', () => {
      assertion([])
      expect(checksAPISpy).toHaveBeenCalledWith([])
    })

    it('`void` を返す', () => {
      expect(assertion([])).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる。', () => {
      expect(() => assertion(null)).toThrowError('value is not an array')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNumber)
      checksAPISpy = jest.spyOn(Checks, 'isNumber')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isNumber()` を呼び出す', () => {
      assertion(123)
      expect(checksAPISpy).toHaveBeenCalledWith(123)
    })

    it('`void` を返す', () => {
      expect(assertion(123)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a number')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })
})
