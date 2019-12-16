import Checks from '../src/checks'

describe('Checks API', () => {
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
      Checks.isArray([])
      expect(isArraySpy).toBeCalledWith([])
      isArraySpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Checks.isArray([])).toBe(true)
      expect(Checks.isArray(new Array())).toBe(true) // eslint-disable-line @typescript-eslint/no-array-constructor
    })

    it('`false` を返す', () => {
      expect(Checks.isArray(null)).toBe(false)
      expect(Checks.isArray(new Set())).toBe(false)
    })
  })

  describe('isBigInt()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Checks.isBigInt(BigInt(9007199254740991))
      expect(getObjectTypeNameSpy).toBeCalledWith(BigInt(9007199254740991))
    })

    it('`true` を返す', () => {
      expect(Checks.isBigInt(BigInt(9007199254740991))).toBe(true)
      expect(Checks.isBigInt(BigInt('9007199254740991'))).toBe(true)
      expect(Checks.isBigInt(BigInt('0x1fffffffffffff'))).toBe(true)
      expect(
        Checks.isBigInt(
          BigInt('0b11111111111111111111111111111111111111111111111111111')
        )
      ).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isBigInt(123)).toBe(false)
      expect(Checks.isBigInt(NaN)).toBe(false)
      expect(Checks.isBigInt(null)).toBe(false)
    })
  })

  describe('isBoolean()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Checks.isBoolean(true)
      expect(getObjectTypeNameSpy).toBeCalledWith(true)
    })

    it('`true` を返す', () => {
      expect(Checks.isBoolean(true)).toBe(true)
      expect(Checks.isBoolean(false)).toBe(true)
      expect(Checks.isBoolean(Boolean(0))).toBe(true)
      expect(Checks.isBoolean(Boolean(1))).toBe(true)
      expect(Checks.isBoolean(Boolean(null))).toBe(true)
      expect(Checks.isBoolean(new Boolean(0))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Checks.isBoolean(0)).toBe(false)
      expect(Checks.isBoolean(1)).toBe(false)
      expect(Checks.isBoolean(null)).toBe(false)
    })
  })

  describe('isDate()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const date = new Date('2020-10-10')
      Checks.isDate(date)
      expect(getObjectTypeNameSpy).toBeCalledWith(date)
    })

    it('`true` を返す', () => {
      expect(Checks.isDate(new Date('2020-10-10'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isDate('2020-10-10')).toBe(false)
      expect(Checks.isDate(null)).toBe(false)
    })
  })

  describe('isValidDate()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const date = new Date('2020-10-10')
      Checks.isDate(date)
      expect(getObjectTypeNameSpy).toBeCalledWith(date)
    })

    it('`true` を返す', () => {
      expect(Checks.isValidDate(new Date('2020-10-10'))).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isValidDate(new Date('20201010'))).toBe(false)
      expect(Checks.isValidDate(null)).toBe(false)
    })
  })

  describe('isError()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const error = new Error()
      Checks.isError(error)
      expect(getObjectTypeNameSpy).toBeCalledWith(error)
    })

    it('`true` を返す', () => {
      expect(Checks.isError(new Error())).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isError(null)).toBe(false)
    })
  })

  describe('isFiniteNumber()', () => {
    it('`Checks.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Checks, 'isNumber')
      Checks.isFiniteNumber(NaN)
      expect(isNumberSpy).toBeCalledWith(NaN)
      isNumberSpy.mockRestore()
    })

    it('`Number.isFinite() を呼び出す`', () => {
      const isFiniteSpy = jest.spyOn(Number, 'isFinite')
      Checks.isFiniteNumber(0)
      expect(isFiniteSpy).toBeCalledWith(0)
      isFiniteSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Checks.isFiniteNumber(0)).toBe(true)
      expect(Checks.isFiniteNumber(1)).toBe(true)
      expect(Checks.isFiniteNumber(2e64)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isFiniteNumber(Infinity)).toBe(false)
      expect(Checks.isFiniteNumber(-Infinity)).toBe(false)
      expect(Checks.isFiniteNumber(NaN)).toBe(false)
      expect(Checks.isFiniteNumber('0')).toBe(false)
      expect(Checks.isFiniteNumber(null)).toBe(false)
    })
  })

  describe('isInteger()', () => {
    it('`Checks.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Checks, 'isNumber')
      Checks.isInteger(0)
      expect(isNumberSpy).toBeCalledWith(0)
      isNumberSpy.mockRestore()
    })

    it('`Number.isInteger() を呼び出す`', () => {
      const isIntegerSpy = jest.spyOn(Number, 'isInteger')
      Checks.isInteger(NaN)
      expect(isIntegerSpy).toBeCalledWith(NaN)
      isIntegerSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Checks.isInteger(0)).toBe(true)
      expect(Checks.isInteger(1)).toBe(true)
      expect(Checks.isInteger(-100000)).toBe(true)
      expect(Checks.isInteger(99999999999999999999999)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isInteger(0.1)).toBe(false)
      expect(Checks.isInteger(Math.PI)).toBe(false)
      expect(Checks.isInteger(NaN)).toBe(false)
      expect(Checks.isInteger(Infinity)).toBe(false)
      expect(Checks.isInteger(-Infinity)).toBe(false)
      expect(Checks.isInteger('10')).toBe(false)
      expect(Checks.isInteger(null)).toBe(false)
    })
  })

  describe('isNaN()', () => {
    it('`Checks.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Checks, 'isNumber')
      Checks.isNaN(NaN)
      expect(isNumberSpy).toBeCalledWith(NaN)
      isNumberSpy.mockRestore()
    })

    it('`Number.isNaN() を呼び出す`', () => {
      const isNaNSpy = jest.spyOn(Number, 'isNaN')
      Checks.isNaN(NaN)
      expect(isNaNSpy).toBeCalledWith(NaN)
      isNaNSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Checks.isNaN(NaN)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isNaN(123)).toBe(false)
      expect(Checks.isNaN('string')).toBe(false)
      expect(Checks.isNaN(null)).toBe(false)
    })
  })

  describe('isNull()', () => {
    it('`true` を返す', () => {
      expect(Checks.isNull(null)).toBe(true)
    })

    it('`false` を返す', () => {
      expect(Checks.isNull(undefined)).toBe(false)
    })
  })

  describe('isNumber()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Checks.isNumber(123)
      expect(getObjectTypeNameSpy).toBeCalledWith(123)
    })

    it('`true` を返す', () => {
      expect(Checks.isNumber(NaN)).toBe(true)
      expect(Checks.isNumber(123)).toBe(true)
      expect(Checks.isNumber(new Number(123))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Checks.isNumber(null)).toBe(false)
      expect(Checks.isNumber('123')).toBe(false)
    })
  })

  describe('isStrictNumber()', () => {
    it('`Checks.isNumber() を呼び出す`', () => {
      const isNumberSpy = jest.spyOn(Checks, 'isNumber')
      Checks.isStrictNumber(123)
      expect(isNumberSpy).toBeCalledWith(123)
      isNumberSpy.mockRestore()
    })

    it('`Checks.isNaN() を呼び出す`', () => {
      const isNaNSpy = jest.spyOn(Checks, 'isNaN')
      Checks.isStrictNumber(123)
      expect(isNaNSpy).toBeCalledWith(123)
      isNaNSpy.mockRestore()
    })

    it('`true` を返す', () => {
      expect(Checks.isStrictNumber(123)).toBe(true)
      expect(Checks.isStrictNumber(new Number(123))).toBe(true) // eslint-disable-line no-new-wrappers
    })

    it('`false` を返す', () => {
      expect(Checks.isStrictNumber(NaN)).toBe(false)
      expect(Checks.isStrictNumber(null)).toBe(false)
      expect(Checks.isStrictNumber('123')).toBe(false)
    })
  })

  describe('isPromise()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      Checks.isPromise(Promise.resolve(123))
      expect(getObjectTypeNameSpy).toBeCalledWith(Promise.resolve(123))
    })

    it.each([
      new Promise(resolve => {
        resolve()
      }),
      Promise.resolve(true),
      Promise.reject(new Error('rejected'))
    ])('`true` を返す', promise => {
      expect(Checks.isPromise(promise)).toBe(true)

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
    ])('`false` を返す', value => {
      expect(Checks.isPromise(value)).toBe(false)
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
      expect(Checks.isPromiseLike(promise)).toBe(true)

      promise.then(null, () => {}) // UnhandledPromiseRejectionWarning の警告が出るため catch してる風を装う(謎)
    })

    it.each([null])('`false` を返す', value => {
      expect(Checks.isPromiseLike(value)).toBe(false)
    })
  })

  describe('isMap()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new Map()

      Checks.isMap(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new Map()])('`true` を返す', map => {
      expect(Checks.isMap(map)).toBe(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new WeakMap(),
      null
    ])('`false` を返す', value => {
      expect(Checks.isMap(value)).toBe(false)
    })
  })

  describe('isWeakMap()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new WeakMap()

      Checks.isWeakMap(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new WeakMap()])('`true` を返す', value => {
      expect(Checks.isWeakMap(value)).toBe(true)
    })

    it.each([
      Object.create(null), // dictionary
      new Set(),
      new Map(),
      new WeakSet(),
      null
    ])('`false` を返す', value => {
      expect(Checks.isWeakMap(value)).toBe(false)
    })
  })

  describe('isSet()', () => {
    it('`getObjectTypeName()` を呼び出す', () => {
      const expected = new Set()

      Checks.isSet(expected)
      expect(getObjectTypeNameSpy).toBeCalledWith(expected)
    })

    it.each([new Set()])('`true` を返す', value => {
      expect(Checks.isSet(value)).toBe(true)
    })

    it.each([[], new WeakSet(), null])('`false` を返す', value => {
      expect(Checks.isSet(value)).toBe(false)
    })
  })
})
