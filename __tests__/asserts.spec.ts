import Asserts from '../src/asserts'
import Guards from '../src/guards'

describe('Asserts API', () => {
  const createAssertion = (assertion: (value: unknown) => void) => (
    value: unknown
  ) => assertion(value)
  let assertion: ReturnType<typeof createAssertion>
  let guardsAPISpy: jest.SpyInstance

  describe('isArray()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isArray)
      guardsAPISpy = jest.spyOn(Guards, 'isArray')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isArray()` を呼び出す', () => {
      assertion([])
      expect(guardsAPISpy).toHaveBeenCalledWith([])
    })

    it('`void` を返す', () => {
      expect(assertion([])).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる。', () => {
      expect(() => assertion(null)).toThrowError('value is not an array')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isBigInt()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isBigInt)
      guardsAPISpy = jest.spyOn(Guards, 'isBigInt')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.BigInt()` を呼び出す', () => {
      assertion(BigInt(9007199254740991))
      expect(guardsAPISpy).toHaveBeenCalledWith(BigInt(9007199254740991))
    })

    it('`void` を返す', () => {
      expect(assertion(BigInt(9007199254740991))).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a bigint')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isBoolean()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isBoolean)
      guardsAPISpy = jest.spyOn(Guards, 'isBoolean')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isBoolean()` を呼び出す', () => {
      assertion(true)
      expect(guardsAPISpy).toHaveBeenCalledWith(true)
    })

    it('`void` を返す', () => {
      expect(assertion(true)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a boolean')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isDate()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isDate)
      guardsAPISpy = jest.spyOn(Guards, 'isDate')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    const date = new Date('2020-10-10')

    it('`Guards.isDate()` を呼び出す', () => {
      assertion(date)
      expect(guardsAPISpy).toHaveBeenCalledWith(date)
    })

    it('`void` を返す', () => {
      expect(assertion(date)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a Date')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isError()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isError)
      guardsAPISpy = jest.spyOn(Guards, 'isError')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    const error = new Error()

    it('`Guards.isError()` を呼び出す', () => {
      assertion(error)
      expect(guardsAPISpy).toHaveBeenCalledWith(error)
    })

    it('`void` を返す', () => {
      expect(assertion(error)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an Error')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isFiniteNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isFiniteNumber)
      guardsAPISpy = jest.spyOn(Guards, 'isFiniteNumber')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isFiniteNumber()` を呼び出す', () => {
      assertion(0)
      expect(guardsAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(Infinity)).toThrowError(
        'value is not a finite number'
      )
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isFunction()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isFunction)
      guardsAPISpy = jest.spyOn(Guards, 'isFunction')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isFunction()` を呼び出す', () => {
      const fn = (): number => 42

      assertion(fn)
      expect(guardsAPISpy).toHaveBeenCalledWith(fn)
    })

    it.each([
      (): number => 42,
      // eslint-disable-next-line no-new-func
      new Function('return 42')
    ])('チェックをパスする', value => {
      expect(assertion(value)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([
      function*(): Generator<number, void> {
        yield 42
      },
      null
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a function')
    })
  })

  describe('isGeneratorFunction()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isGeneratorFunction)
      guardsAPISpy = jest.spyOn(Guards, 'isGeneratorFunction')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isGeneratorFunction()` を呼び出す', () => {
      function* fn(): Generator<number> {
        yield 42
      }

      assertion(fn)
      expect(guardsAPISpy).toHaveBeenCalledWith(fn)
    })

    it.each([
      function* fn(): Generator<number> {
        yield 42
      }
    ])('チェックをパスする', value => {
      expect(assertion(value)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([(): number => 42, null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError(
        'value is not a generator function'
      )
    })
  })

  describe('isInteger()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isInteger)
      guardsAPISpy = jest.spyOn(Guards, 'isInteger')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isInteger()` を呼び出す', () => {
      assertion(0)
      expect(guardsAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an integer')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isMap()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isMap)
      guardsAPISpy = jest.spyOn(Guards, 'isMap')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isMap()` を呼び出す', () => {
      const expected = new Map()

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new Map()])('チェックをパスする', map => {
      expect(() => assertion(map)).not.toThrowError()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new WeakMap(),
      null
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a Map')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isNaN()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNaN)
      guardsAPISpy = jest.spyOn(Guards, 'isNaN')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isNaN()` を呼び出す', () => {
      assertion(NaN)
      expect(guardsAPISpy).toHaveBeenCalledWith(NaN)
    })

    it('`void` を返す', () => {
      expect(assertion(NaN)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a NaN')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isNull()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNull)
      guardsAPISpy = jest.spyOn(Guards, 'isNull')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isNull()` を呼び出す', () => {
      assertion(null)
      expect(guardsAPISpy).toHaveBeenCalledWith(null)
    })

    it('`void` を返す', () => {
      expect(assertion(null)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(undefined)).toThrowError('value is not a null')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isNumber)
      guardsAPISpy = jest.spyOn(Guards, 'isNumber')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isNumber()` を呼び出す', () => {
      assertion(123)
      expect(guardsAPISpy).toHaveBeenCalledWith(123)
    })

    it('`void` を返す', () => {
      expect(assertion(123)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a number')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isObject()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isObject)
      guardsAPISpy = jest.spyOn(Guards, 'isObject')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    const object = { key: 'VALUE' }

    it('`Guards.isObject()` を呼び出す', () => {
      assertion(object)
      expect(guardsAPISpy).toHaveBeenCalledWith(object)
    })

    it('`void` を返す', () => {
      expect(assertion(object)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an object')
    })
  })

  describe('isPlainObject()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPlainObject)
      guardsAPISpy = jest.spyOn(Guards, 'isPlainObject')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    const object = { key: 'VALUE' }

    it('`Guards.isPlainObject()` を呼び出す', () => {
      assertion(object)
      expect(guardsAPISpy).toHaveBeenCalledWith(object)
    })

    it('`void` を返す', () => {
      expect(assertion(object)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a plane object')
    })
  })

  describe('isPromise()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPromise)
      guardsAPISpy = jest.spyOn(Guards, 'isPromise')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isPromise()` を呼び出す', () => {
      assertion(Promise.resolve(true))
      expect(guardsAPISpy).toHaveBeenCalledWith(Promise.resolve(true))
    })

    it.each([
      new Promise(resolve => {
        resolve()
      }),
      Promise.resolve(true),
      Promise.reject(new Error('rejected'))
    ])('チェックをパスする', promise => {
      expect(() => assertion(promise)).not.toThrowError()
      expect(guardsAPISpy).toHaveReturnedWith(true)

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
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isPromiseLike()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isPromiseLike)
      guardsAPISpy = jest.spyOn(Guards, 'isPromiseLike')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isPromiseLike()` を呼び出す', () => {
      assertion(Promise.resolve(true))
      expect(guardsAPISpy).toHaveBeenCalledWith(Promise.resolve(true))
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
      expect(guardsAPISpy).toHaveReturnedWith(true)

      promiseLike.then(null, () => {}) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a PromiseLike')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isRegExp', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isRegExp)
      guardsAPISpy = jest.spyOn(Guards, 'isRegExp')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isRegExp()` を呼び出す', () => {
      const expected = /^.+$/

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(/^.+$/)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a RegExp')
    })
  })

  describe('isSafeInteger()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSafeInteger)
      guardsAPISpy = jest.spyOn(Guards, 'isSafeInteger')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isSafeInteger()` を呼び出す', () => {
      assertion(0)
      expect(guardsAPISpy).toHaveBeenCalledWith(0)
    })

    it('`void` を返す', () => {
      expect(assertion(0)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a safe integer')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isSet()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSet)
      guardsAPISpy = jest.spyOn(Guards, 'isSet')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isSet()` を呼び出す', () => {
      const expected = new Set()

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new Set()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([[], new WeakSet(), null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a Set')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isStrictNumber()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isStrictNumber)
      guardsAPISpy = jest.spyOn(Guards, 'isStrictNumber')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isStrictNumber()` を呼び出す', () => {
      assertion(123)
      expect(guardsAPISpy).toHaveBeenCalledWith(123)
    })

    it('`void` を返す', () => {
      expect(assertion(123)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(NaN)).toThrowError('value is not a strict number')
    })
  })

  describe('isString()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isString)
      guardsAPISpy = jest.spyOn(Guards, 'isString')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isString()` を呼び出す', () => {
      const expected = 'string'

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion('string')).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a string')
    })
  })

  describe('isSymbol', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isSymbol)
      guardsAPISpy = jest.spyOn(Guards, 'isSymbol')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isSymbol()` を呼び出す', () => {
      const expected = Symbol('symbol')

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(Symbol('symbol'))).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not a symbol')
    })
  })

  describe('isUndefined', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isUndefined)
      guardsAPISpy = jest.spyOn(Guards, 'isUndefined')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isUndefined()` を呼び出す', () => {
      const expected = undefined

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it('`void` を返す', () => {
      expect(assertion(undefined)).toBeUndefined()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it('例外を投げる', () => {
      expect(() => assertion(null)).toThrowError('value is not an undefined')
    })
  })

  describe('isValidDate()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isValidDate)
      guardsAPISpy = jest.spyOn(Guards, 'isValidDate')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isValidDate()` を呼び出す', () => {
      const date = new Date('2020-10-10')

      assertion(date)
      expect(guardsAPISpy).toHaveBeenCalledWith(date)
    })

    it.each([new Date(), new Date('2020-10-10')])(
      '%o => `void` を返す',
      value => {
        expect(() => assertion(value)).not.toThrowError()
        expect(guardsAPISpy).toHaveReturnedWith(true)
      }
    )

    it.each([new Date('20201010'), null])('%o => 例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a valid Date')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isWeakMap()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isWeakMap)
      guardsAPISpy = jest.spyOn(Guards, 'isWeakMap')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isWeakMap()` を呼び出す', () => {
      const expected = new WeakMap()

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new WeakMap()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new Map(),
      new WeakSet(),
      null
    ])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a WeakMap')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })

  describe('isWeakSet()', () => {
    beforeAll(() => {
      assertion = createAssertion(Asserts.isWeakSet)
      guardsAPISpy = jest.spyOn(Guards, 'isWeakSet')
    })

    beforeEach(() => {
      guardsAPISpy.mockClear()
    })

    afterAll(() => {
      guardsAPISpy.mockRestore()
    })

    it('`Guards.isWeakSet()` を呼び出す', () => {
      const expected = new WeakSet()

      assertion(expected)
      expect(guardsAPISpy).toHaveBeenCalledWith(expected)
    })

    it.each([new WeakSet()])('チェックをパスする', value => {
      expect(() => assertion(value)).not.toThrowError()
      expect(guardsAPISpy).toHaveReturnedWith(true)
    })

    it.each([[], new Set(), null])('例外を投げる', value => {
      expect(() => assertion(value)).toThrowError('value is not a WeakSet')
      expect(guardsAPISpy).toHaveReturnedWith(false)
    })
  })
})
