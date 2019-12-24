import Guards from '../src/guards'

describe('Guards API', () => {
  const getObjectTypeNameSpy = jest.spyOn(
    require('../src/internal/getObjectTypeName'), // eslint-disable-line @typescript-eslint/no-var-requires
    'getObjectTypeName'
  )

  beforeEach(() => {
    getObjectTypeNameSpy.mockClear()
  })

  afterAll(() => {
    getObjectTypeNameSpy.mockRestore()
  })

  describe('isArray()', () => {
    it('`Array.isArray() を呼び出す', () => {
      const isArraySpy = jest.spyOn(Array, 'isArray')
      Guards.isArray([])
      expect(isArraySpy).toBeCalledWith([])
      isArraySpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isArray([])).toBe(true)
      expect(Guards.isArray(new Array())).toBe(true) // eslint-disable-line @typescript-eslint/no-array-constructor
    })

    it('`false` を返す', () => {
      expect(Guards.isArray(null)).toBe(false)
      expect(Guards.isArray(new Set())).toBe(false)
    })
  })

  describe('isBigInt()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Guards.isBigInt(BigInt(9007199254740991))
      expect(getObjectTypeNameSpy).toBeCalledWith(BigInt(9007199254740991))
    })

    it('`true` を返す', () => {
      expect(Guards.isBigInt(BigInt(9007199254740991))).toBe(true)
      expect(Guards.isBigInt(BigInt('9007199254740991'))).toBe(true)
      expect(Guards.isBigInt(BigInt('0x1fffffffffffff'))).toBe(true)
      expect(
        Guards.isBigInt(
          BigInt('0b11111111111111111111111111111111111111111111111111111')
        )
      ).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isBigInt(123)).toBe(false)
      expect(Guards.isBigInt(NaN)).toBe(false)
      expect(Guards.isBigInt(null)).toBe(false)
    })
  })

  describe('isBoolean()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Guards.isBoolean(true)
      expect(getObjectTypeNameSpy).toBeCalledWith(true)
    })

    it('`true` を返す', () => {
      expect(Guards.isBoolean(true)).toBe(true)
      expect(Guards.isBoolean(false)).toBe(true)
      expect(Guards.isBoolean(Boolean(0))).toBe(true)
      expect(Guards.isBoolean(Boolean(1))).toBe(true)
      expect(Guards.isBoolean(Boolean(null))).toBe(true)
      expect(Guards.isBoolean(new Boolean(0))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Guards.isBoolean(0)).toBe(false)
      expect(Guards.isBoolean(1)).toBe(false)
      expect(Guards.isBoolean(null)).toBe(false)
    })
  })

  describe('isDate()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const date = new Date('2020-10-10')
      Guards.isDate(date)
      expect(getObjectTypeNameSpy).toBeCalledWith(date)
    })

    it('`true` を返す', () => {
      expect(Guards.isDate(new Date('2020-10-10'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isDate('2020-10-10')).toBe(false)
      expect(Guards.isDate(null)).toBe(false)
    })
  })

  describe('isError()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const error = new Error()
      Guards.isError(error)
      expect(getObjectTypeNameSpy).toBeCalledWith(error)
    })

    it('`true` を返す', () => {
      expect(Guards.isError(new Error())).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isError(null)).toBe(false)
    })
  })

  describe('isFiniteNumber()', () => {
    it('`Guards.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Guards, 'isNumber')
      Guards.isFiniteNumber(NaN)
      expect(isNumberSpy).toBeCalledWith(NaN)
      isNumberSpy.mockRestore()
    })

    it('`Number.isFinite() を呼び出す`', () => {
      const isFiniteSpy = jest.spyOn(Number, 'isFinite')
      Guards.isFiniteNumber(0)
      expect(isFiniteSpy).toBeCalledWith(0)
      isFiniteSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isFiniteNumber(0)).toBe(true)
      expect(Guards.isFiniteNumber(1)).toBe(true)
      expect(Guards.isFiniteNumber(2e64)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isFiniteNumber(Infinity)).toBe(false)
      expect(Guards.isFiniteNumber(-Infinity)).toBe(false)
      expect(Guards.isFiniteNumber(NaN)).toBe(false)
      expect(Guards.isFiniteNumber('0')).toBe(false)
      expect(Guards.isFiniteNumber(null)).toBe(false)
    })
  })

  describe('isFunction()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const fn = (): number => 42

      Guards.isFunction(fn)
      expect(getObjectTypeNameSpy).toBeCalledWith(fn)
    })

    it.each([
      (): number => 42,
      // eslint-disable-next-line no-new-func
      new Function('return 42')
    ])('`true` を返す', value => {
      expect(Guards.isFunction(value)).toBe(true)
    })

    it.each([
      function*(): Generator<number, void> {
        yield 42
      },
      null
    ])('`false` を返す', value => {
      expect(Guards.isFunction(value)).toBe(false)
    })
  })

  describe('isGeneratorFunction()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      function* fn(): Generator<number, void> {
        yield 42
      }

      Guards.isGeneratorFunction(fn)
      expect(getObjectTypeNameSpy).toBeCalledWith(fn)
    })

    it.each([
      function* fn(): Generator<number, void> {
        yield 42
      }
    ])('`true` を返す', value => {
      expect(Guards.isGeneratorFunction(value)).toBe(true)
    })

    it.each([(): number => 42, null])('`false` を返す', value => {
      expect(Guards.isGeneratorFunction(value)).toBe(false)
    })
  })

  describe('isInteger()', () => {
    it('`Guards.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Guards, 'isNumber')
      Guards.isInteger(0)
      expect(isNumberSpy).toBeCalledWith(0)
      isNumberSpy.mockRestore()
    })

    it('`Number.isInteger() を呼び出す`', () => {
      const isIntegerSpy = jest.spyOn(Number, 'isInteger')
      Guards.isInteger(NaN)
      expect(isIntegerSpy).toBeCalledWith(NaN)
      isIntegerSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isInteger(0)).toBe(true)
      expect(Guards.isInteger(1)).toBe(true)
      expect(Guards.isInteger(-100000)).toBe(true)
      expect(Guards.isInteger(99999999999999999999999)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isInteger(0.1)).toBe(false)
      expect(Guards.isInteger(Math.PI)).toBe(false)
      expect(Guards.isInteger(NaN)).toBe(false)
      expect(Guards.isInteger(Infinity)).toBe(false)
      expect(Guards.isInteger(-Infinity)).toBe(false)
      expect(Guards.isInteger('10')).toBe(false)
      expect(Guards.isInteger(null)).toBe(false)
    })
  })

  describe('isMap()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new Map()

      Guards.isMap(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new Map()])('`true` を返す', map => {
      expect(Guards.isMap(map)).toBe(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new WeakMap(),
      null
    ])('`false` を返す', value => {
      expect(Guards.isMap(value)).toBe(false)
    })
  })

  describe('isNaN()', () => {
    it('`Guards.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Guards, 'isNumber')
      Guards.isNaN(NaN)
      expect(isNumberSpy).toBeCalledWith(NaN)
      isNumberSpy.mockRestore()
    })

    it('`Number.isNaN() を呼び出す`', () => {
      const isNaNSpy = jest.spyOn(Number, 'isNaN')
      Guards.isNaN(NaN)
      expect(isNaNSpy).toBeCalledWith(NaN)
      isNaNSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isNaN(NaN)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isNaN(123)).toBe(false)
      expect(Guards.isNaN('string')).toBe(false)
      expect(Guards.isNaN(null)).toBe(false)
    })
  })

  describe('isNull()', () => {
    it('`true` を返す', () => {
      expect(Guards.isNull(null)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isNull(undefined)).toBe(false)
    })
  })

  describe('isNumber()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Guards.isNumber(123)
      expect(getObjectTypeNameSpy).toBeCalledWith(123)
    })

    it('`true` を返す', () => {
      expect(Guards.isNumber(NaN)).toBe(true)
      expect(Guards.isNumber(123)).toBe(true)
      expect(Guards.isNumber(new Number(123))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Guards.isNumber(null)).toBe(false)
      expect(Guards.isNumber('123')).toBe(false)
    })
  })

  describe('isObject()', () => {
    const object = { key: 'VALUE' }
    class DummyClassForIsObjectTesting {
      key = 'VALUE'
    }

    it('`Guards.isNull() を呼び出す`', () => {
      const isNullSpy = jest.spyOn(Guards, 'isNull')
      Guards.isObject(object)
      expect(isNullSpy).toBeCalledWith(object)
      isNullSpy.mockRestore()
    })

    it.each([
      object,
      [],
      new Boolean(0), // eslint-disable-line no-new-wrappers
      new Number(123), // eslint-disable-line no-new-wrappers
      new String('string'), // eslint-disable-line no-new-wrappers
      new Map(),
      new Set(),
      new DummyClassForIsObjectTesting()
    ])('`true` を返す', value => {
      expect(Guards.isObject(value)).toBe(true)
    })

    it.each([
      undefined,
      null,
      123,
      NaN,
      'string',
      true,
      false,
      Symbol('symbol'),
      (): void => undefined
    ])('`false` を返す', value => {
      expect(Guards.isObject(value)).toBe(false)
    })
  })

  describe('isPlainObject()', () => {
    const object = { key: 'VALUE' }
    class DummyClassForIsPlaneObjectTesting {
      key = 'VALUE'
    }

    it('`getObjectTypeName()` を呼び出す', () => {
      Guards.isPlainObject(object)
      expect(getObjectTypeNameSpy).toBeCalledWith(object)
    })

    it('`Guards.isObject() を呼び出す`', () => {
      const isObjectSpy = jest.spyOn(Guards, 'isObject')
      Guards.isPlainObject(object)
      expect(isObjectSpy).toBeCalledWith(object)
      isObjectSpy.mockRestore()
    })

    it.each([
      object,
      new Object(), // eslint-disable-line no-new-object
      Object.create(object)
    ])('`true` を返す', value => {
      expect(Guards.isPlainObject(value)).toBe(true)
    })

    it.each([
      undefined,
      null,
      123,
      NaN,
      'string',
      true,
      false,
      Symbol('symbol'),
      (): void => undefined,
      [],
      Object.create(null),
      new Boolean(0), // eslint-disable-line no-new-wrappers
      new Number(123), // eslint-disable-line no-new-wrappers
      new String('string'), // eslint-disable-line no-new-wrappers
      new Map(),
      new Set(),
      new DummyClassForIsPlaneObjectTesting()
    ])('`false` を返す', value => {
      expect(Guards.isPlainObject(value)).toBe(false)
    })
  })

  describe('isPromise()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Guards.isPromise(Promise.resolve(123))
      expect(getObjectTypeNameSpy).toBeCalledWith(Promise.resolve(123))
    })

    it.each([
      new Promise(resolve => {
        resolve()
      }),
      Promise.resolve(true),
      Promise.reject(new Error('rejected'))
    ])('`true` を返す', promise => {
      expect(Guards.isPromise(promise)).toBe(true)

      promise.catch((): void => {
        return undefined
      }) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([
      null,

      // thenableなオブジェクト
      {
        then(): Promise<unknown> {
          return Promise.resolve()
        }
      }
    ])('`false` を返す', value => {
      expect(Guards.isPromise(value)).toBe(false)
    })
  })

  describe('isPromiseLike()', () => {
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
    ])('`true` を返す', promise => {
      expect(Guards.isPromiseLike(promise)).toBe(true)

      promise.then(null, (): void => {
        return undefined
      }) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([null])('`false` を返す', value => {
      expect(Guards.isPromiseLike(value)).toBe(false)
    })
  })

  describe('isRegExp()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = /^.+$/

      Guards.isRegExp(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it('`true` を返す', () => {
      expect(Guards.isRegExp(/^.+$/)).toBe(true)
      expect(Guards.isRegExp(new RegExp('^.+$'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isRegExp(`/^.+$/`)).toBe(false)
      expect(Guards.isRegExp(null)).toBe(false)
    })
  })

  describe('isSafeInteger', () => {
    it('`Guards.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Guards, 'isNumber')
      Guards.isSafeInteger(123)
      expect(isNumberSpy).toBeCalledWith(123)
      isNumberSpy.mockRestore()
    })

    it('`Number.isSafeInteger() を呼び出す`', () => {
      const isSafeIntegerSpy = jest.spyOn(Number, 'isSafeInteger')
      Guards.isSafeInteger(123)
      expect(isSafeIntegerSpy).toBeCalledWith(123)
      isSafeIntegerSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isSafeInteger(123)).toBe(true)
      expect(Guards.isSafeInteger(Math.pow(2, 53) - 1)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isSafeInteger(Math.pow(2, 53))).toBe(false)
      expect(Guards.isSafeInteger(Math.PI)).toBe(false)
      expect(Guards.isSafeInteger(NaN)).toBe(false)
      expect(Guards.isSafeInteger(Infinity)).toBe(false)
      expect(Guards.isSafeInteger(-Infinity)).toBe(false)
      expect(Guards.isSafeInteger('string')).toBe(false)
      expect(Guards.isSafeInteger(null)).toBe(false)
    })
  })

  describe('isSet()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new Set()

      Guards.isSet(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new Set()])('`true` を返す', value => {
      expect(Guards.isSet(value)).toBe(true)
    })

    it.each([[], new WeakSet(), null])('`false` を返す', value => {
      expect(Guards.isSet(value)).toBe(false)
    })
  })

  describe('isStrictNumber()', () => {
    it('`Guards.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Guards, 'isNumber')
      Guards.isStrictNumber(123)
      expect(isNumberSpy).toBeCalledWith(123)
      isNumberSpy.mockRestore()
    })

    it('`Guards.isNaN() を呼び出す`', () => {
      const isNaNSpy = jest.spyOn(Guards, 'isNaN')
      Guards.isStrictNumber(123)
      expect(isNaNSpy).toBeCalledWith(123)
      isNaNSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Guards.isStrictNumber(123)).toBe(true)
      expect(Guards.isStrictNumber(new Number(123))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Guards.isStrictNumber(NaN)).toBe(false)
      expect(Guards.isStrictNumber(null)).toBe(false)
      expect(Guards.isStrictNumber('123')).toBe(false)
    })
  })

  describe('isString()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = 'string'

      Guards.isString(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it('`true` を返す', () => {
      expect(Guards.isString('string')).toBe(true)
      expect(Guards.isString(new String())).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Guards.isString(123)).toBe(false)
      expect(Guards.isString(null)).toBe(false)
    })
  })

  describe('isSymbol()', () => {
    it('`true` を返す', () => {
      expect(Guards.isSymbol(Symbol('symbol'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isSymbol(null)).toBe(false)
      expect(Guards.isSymbol(Object.create(null))).toBe(false)
    })
  })

  describe('isUndefined()', () => {
    it('`true` を返す', () => {
      expect(Guards.isUndefined(undefined)).toBe(true)
      expect(Guards.isUndefined(void 0)).toBe(true) // eslint-disable-line no-void
    })

    it('`false` を返す', () => {
      expect(Guards.isUndefined(0)).toBe(false)
      expect(Guards.isUndefined(null)).toBe(false)
    })
  })

  describe('isValidDate()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const date = new Date('2020-10-10')
      Guards.isDate(date)
      expect(getObjectTypeNameSpy).toBeCalledWith(date)
    })

    it('`true` を返す', () => {
      expect(Guards.isValidDate(new Date('2020-10-10'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Guards.isValidDate(new Date('20201010'))).toBe(false)
      expect(Guards.isValidDate(null)).toBe(false)
    })
  })

  describe('isWeakMap()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new WeakMap()

      Guards.isWeakMap(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new WeakMap()])('`true` を返す', value => {
      expect(Guards.isWeakMap(value)).toBe(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new Map(),
      new WeakSet(),
      null
    ])('`false` を返す', value => {
      expect(Guards.isWeakMap(value)).toBe(false)
    })
  })

  describe('isWeakSet()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new WeakSet()

      Guards.isWeakSet(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new WeakSet()])('`true` を返す', value => {
      expect(Guards.isWeakSet(value)).toBe(true)
    })

    it.each([[], new Set(), null])('`false` を返す', value => {
      expect(Guards.isWeakSet(value)).toBe(false)
    })
  })
})
