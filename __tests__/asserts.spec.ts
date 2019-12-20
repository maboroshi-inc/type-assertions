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

  describe('isBoolean()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isBoolean)
      checksAPISpy = jest.spyOn(Checks, 'isBoolean')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isBoolean()` を呼び出す', () => {
      assertion(true)
      expect(checksAPISpy).toHaveBeenCalledWith(true)
    })

    it('`void` を返す', () => {
      expect(assertion(true)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a boolean')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isDate()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isDate)
      checksAPISpy = jest.spyOn(Checks, 'isDate')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    const date = new Date('2020-10-10')

    it('`Checks.isDate()` を呼び出す', () => {
      assertion(date)
      expect(checksAPISpy).toHaveBeenCalledWith(date)
    })

    it('`void` を返す', () => {
      expect(assertion(date)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a Date')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isValidDate()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isValidDate)
      checksAPISpy = jest.spyOn(Checks, 'isValidDate')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isValidDate()` を呼び出す', () => {
      const date = new Date('2020-10-10')

      assertion(date)
      expect(checksAPISpy).toHaveBeenCalledWith(date)
    })

    it.each([new Date(), new Date('2020-10-10')])(
      '%o => `void` を返す',
      value => {
        expect(() => assertion(value)).not.toThrowError()
        expect(checksAPISpy).toHaveReturnedWith(true)
      }
    )

    it.each([new Date('20201010'), null])('%o => 例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a valid Date')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isError()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isError)
      checksAPISpy = jest.spyOn(Checks, 'isError')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    const error = new Error()

    it('`Checks.isError()` を呼び出す', () => {
      assertion(error)
      expect(checksAPISpy).toHaveBeenCalledWith(error)
    })

    it('`void` を返す', () => {
      expect(assertion(error)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an Error')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isFiniteNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isFiniteNumber)
      checksAPISpy = jest.spyOn(Checks, 'isFiniteNumber')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isFiniteNumber()` を呼び出す', () => {
      assertion(0)
      expect(checksAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(Infinity)).toThrowError(
        'value is not a finite number'
      )
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isInteger()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isInteger)
      checksAPISpy = jest.spyOn(Checks, 'isInteger')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isInteger()` を呼び出す', () => {
      assertion(0)
      expect(checksAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an integer')
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

  describe('isNull()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNull)
      checksAPISpy = jest.spyOn(Checks, 'isNull')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isNull()` を呼び出す', () => {
      assertion(null)
      expect(checksAPISpy).toHaveBeenCalledWith(null)
    })

    it('`void` を返す', () => {
      expect(assertion(null)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(undefined)).toThrowError('value is not a null')
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

  describe('isStrictNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isStrictNumber)
      checksAPISpy = jest.spyOn(Checks, 'isStrictNumber')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isStrictNumber()` を呼び出す', () => {
      assertion(123)
      expect(checksAPISpy).toHaveBeenCalledWith(123)
    })

    it('`void` を返す', () => {
      expect(assertion(123)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(NaN)).toThrowError('value is not a strict number')
    })
  })

  describe('isObject()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isObject)
      checksAPISpy = jest.spyOn(Checks, 'isObject')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    const object = { key: 'VALUE' }

    it('`Checks.isObject()` を呼び出す', () => {
      assertion(object)
      expect(checksAPISpy).toHaveBeenCalledWith(object)
    })

    it('`void` を返す', () => {
      expect(assertion(object)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an object')
    })
  })

  describe('isPlainObject()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPlainObject)
      checksAPISpy = jest.spyOn(Checks, 'isPlainObject')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    const object = { key: 'VALUE' }

    it('`Checks.isPlainObject()` を呼び出す', () => {
      assertion(object)
      expect(checksAPISpy).toHaveBeenCalledWith(object)
    })

    it('`void` を返す', () => {
      expect(assertion(object)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a plane object')
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

  describe('isPromiseLike()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPromiseLike)
      checksAPISpy = jest.spyOn(Checks, 'isPromiseLike')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isPromiseLike()` を呼び出す', () => {
      assertion(Promise.resolve(true))
      expect(checksAPISpy).toHaveBeenCalledWith(Promise.resolve(true))
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function PromiseLike(): void {}

    PromiseLike.then = (value: unknown): Promise<unknown> =>
      Promise.resolve(value)

    it.each([
      new Promise(resolve => {
        resolve()
      }),
      Promise.resolve(true),
      Promise.reject(new Error('rejected')),

      // thenableなオブジェクト
      {
        then(value: unknown): Promise<unknown> {
          return Promise.resolve(value)
        }
      },

      // thenableなオブジェクト
      // 関数のプロパティに then メソッドがあるケース
      PromiseLike
    ])('チェックをパスする', promiseLike => {
      expect(() => assertion(promiseLike)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)

      promiseLike.then(null, () => {}) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a PromiseLike')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isRegExp', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isRegExp)
      checksAPISpy = jest.spyOn(Checks, 'isRegExp')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isRegExp()` を呼び出す', () => {
      const expected = /^.+$/

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(/^.+$/)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a RegExp')
    })
  })

  describe('isSafeInteger()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSafeInteger)
      checksAPISpy = jest.spyOn(Checks, 'isSafeInteger')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isSafeInteger()` を呼び出す', () => {
      assertion(0)
      expect(checksAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a safe integer')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isString()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isString)
      checksAPISpy = jest.spyOn(Checks, 'isString')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isString()` を呼び出す', () => {
      const expected = 'string'

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion('string')).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a string')
    })
  })

  describe('isSymbol', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSymbol)
      checksAPISpy = jest.spyOn(Checks, 'isSymbol')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isSymbol()` を呼び出す', () => {
      const expected = Symbol('symbol')

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(Symbol('symbol'))).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a symbol')
    })
  })

  describe('isUndefined', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isUndefined)
      checksAPISpy = jest.spyOn(Checks, 'isUndefined')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isUndefined()` を呼び出す', () => {
      const expected = undefined

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(undefined)).toBeUndefined()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an undefined')
    })
  })

  describe('isMap()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isMap)
      checksAPISpy = jest.spyOn(Checks, 'isMap')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isMap()` を呼び出す', () => {
      const expected = new Map()

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new Map()])('チェックをパスする', map => {
      expect(() => assertion(map)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new WeakMap(),
      null
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a Map')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isWeakMap()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isWeakMap)
      checksAPISpy = jest.spyOn(Checks, 'isWeakMap')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isWeakMap()` を呼び出す', () => {
      const expected = new WeakMap()

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new WeakMap()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new Map(),
      new WeakSet(),
      null
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a WeakMap')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isSet()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSet)
      checksAPISpy = jest.spyOn(Checks, 'isSet')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isSet()` を呼び出す', () => {
      const expected = new Set()

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new Set()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it.each([[], new WeakSet(), null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a Set')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isWeakSet()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isWeakSet)
      checksAPISpy = jest.spyOn(Checks, 'isWeakSet')
    })

    beforeEach(() => {
      checksAPISpy.mockClear()
    })

    afterAll(() => {
      checksAPISpy.mockRestore()
    })

    it('`Checks.isWeakSet()` を呼び出す', () => {
      const expected = new WeakSet()

      assertion(expected)
      expect(checksAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new WeakSet()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(checksAPISpy).toHaveReturnedWith(true)
    })

    it.each([[], new Set(), null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a WeakSet')
      expect(checksAPISpy).toHaveReturnedWith(false)
    })
  })
})
