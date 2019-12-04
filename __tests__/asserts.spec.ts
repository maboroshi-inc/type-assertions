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

    it('`Checks.isArray()` を呼び出す', () => {
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

  describe('isBigInt()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isBigInt)
      checksAPISpy = jest.spyOn(Checks, 'isBigInt')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.BigInt()` を呼び出す', () => {
      assertion(BigInt(9007199254740991))
      expect(checksAPISpy).toHaveBeenCalledWith(BigInt(9007199254740991))
    })

    it('`void` を返す', () => {
      expect(assertion(BigInt(9007199254740991))).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a bigint')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isNaN()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNaN)
      checksAPISpy = jest.spyOn(Checks, 'isNaN')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isNaN()` を呼び出す', () => {
      assertion(NaN)
      expect(checksAPISpy).toHaveBeenCalledWith(NaN)
    })

    it('`void` を返す', () => {
      expect(assertion(NaN)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a NaN')
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

  describe('isPromise()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPromise)
      checksAPISpy = jest.spyOn(Checks, 'isPromise')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isPromise()` を呼び出す', () => {
      assertion(Promise.resolve(true))
      expect(checksAPISpy).toHaveBeenCalledWith(Promise.resolve(true))
    })

    it.each([
      new Promise(resolve => {
        resolve()
      }),
      Promise.resolve(true),
      Promise.reject(new Error('rejected'))
    ])('チェックをパスする', promise => {
      expect(() => assertion(promise)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)

      promise.catch(() => {}) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([
      null,

      // thenableなオブジェクト
      {
        then(): Promise<unknown> {
          return Promise.resolve()
        }
      }
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a Promise')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })
})
