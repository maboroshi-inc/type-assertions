import { getObjectTypeName } from '../../src/internal/getObjectTypeName'

describe('getObjectTypeName()', () => {
  it('`Object.prototype.toString.call()` を呼び出す', () => {
    const spy = jest.spyOn(Object.prototype.toString as any, 'call') // eslint-disable-line @typescript-eslint/no-explicit-any
    getObjectTypeName(123)
    expect(spy).toHaveBeenCalledWith(123)
    spy.mockRestore()
  })

  it('"[object Undefined]" を返す', () => {
    expect(getObjectTypeName(undefined)).toBe('[object Undefined]')
  })

  it('"[object Null]" を返す', () => {
    expect(getObjectTypeName(null)).toBe('[object Null]')
  })

  it('"[object Number]" を返す', () => {
    expect(getObjectTypeName(NaN)).toBe('[object Number]')
    expect(getObjectTypeName(123)).toBe('[object Number]')
    expect(getObjectTypeName(new Number(123))).toBe('[object Number]') // eslint-disable-line no-new-wrappers
  })

  it('"[object String]" を返す', () => {
    expect(getObjectTypeName('string')).toBe('[object String]')
    expect(getObjectTypeName(new String('string'))).toBe('[object String]') // eslint-disable-line no-new-wrappers
  })

  it('"[object Boolean]" を返す', () => {
    expect(getObjectTypeName(true)).toBe('[object Boolean]')
    expect(getObjectTypeName(false)).toBe('[object Boolean]')
  })

  it('"[object Date]" を返す', () => {
    expect(getObjectTypeName(new Date('2020-10-10T12:34:56.789+09:00'))).toBe(
      '[object Date]'
    )
  })

  it('"[object RegExp]" を返す', () => {
    expect(getObjectTypeName(/^.+$/)).toBe('[object RegExp]')
    expect(getObjectTypeName(new RegExp('^.+$'))).toBe('[object RegExp]')
  })

  it('"[object Array]" を返す', () => {
    expect(getObjectTypeName([0, 1, 2])).toBe('[object Array]')
  })

  it('"[object Object]" を返す', () => {
    expect(getObjectTypeName({ key: 'value' })).toBe('[object Object]')
  })

  it('"[object Symbol]" を返す', () => {
    expect(getObjectTypeName(Symbol('symbol'))).toBe('[object Symbol]')
  })

  it('"[object Map]" を返す', () => {
    expect(getObjectTypeName(new Map([['key', 'value']]))).toBe('[object Map]')
  })

  it('"[object Set]" を返す', () => {
    expect(getObjectTypeName(new Set(['value']))).toBe('[object Set]')
  })

  it('"[object Function]" を返す', () => {
    expect(
      getObjectTypeName(function func() {
        return undefined
      })
    ).toBe('[object Function]')
    expect(getObjectTypeName(() => undefined)).toBe('[object Function]')
  })

  it('"[object GeneratorFunction]" を返す', () => {
    expect(
      getObjectTypeName(function* func() {
        return undefined
      })
    ).toBe('[object GeneratorFunction]')
  })
})
