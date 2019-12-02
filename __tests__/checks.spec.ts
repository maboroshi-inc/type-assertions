import Checks from '../src/checks'

describe('Checks API', () => {
  let getObjectTypeNameSpy = jest.spyOn(
    require('../src/internal/getObjectTypeName'),
    'getObjectTypeName'
  )

  beforeEach(() => {
    getObjectTypeNameSpy.mockClear()
  })

  afterAll(() => {
    getObjectTypeNameSpy.mockRestore()
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
})
