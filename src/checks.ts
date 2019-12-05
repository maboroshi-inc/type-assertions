import { getObjectTypeName } from './internal/getObjectTypeName'

/**
 * 型チェックAPI
 * @description 値が指定の方であるか否かを `boolean` で返す
 * @category API
 */
export const Checks = {
  /**
   * 値が配列か否かを返す
   * @alias `Array.isArray()`
   * @param value
   */
  isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value)
  },

  /**
   * 値がBigIntか否かを返す
   * @param value
   */
  isBigInt(value: unknown): value is bigint {
    return getObjectTypeName(value) === '[object BigInt]'
  },

  /**
   * 値がBooleanか否かを返す
   * @param value
   * @see https://qiita.com/amamamaou/items/ef0b797156b324bb4ef3#typeof-%E3%81%A0%E3%81%91%E3%81%A7%E5%88%A4%E5%AE%9A%E3%81%97%E3%81%A6%E3%82%82%E6%94%AF%E9%9A%9C%E3%81%8C%E3%81%AA%E3%81%84%E3%82%82%E3%81%AE
   */
  isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
  },

  /**
   * 値が `NaN` か否かを返す
   * @alias `Number.isNaN()`
   * @param value
   */
  isNaN(value: unknown): value is typeof NaN {
    return Checks.isNumber(value) && Number.isNaN(value)
  },

  /**
   * 値が数値か否かを返す
   * @description `NaN` を `true` とする
   * @param value
   */
  isNumber(value: unknown): value is number {
    return getObjectTypeName(value) === '[object Number]'
  },

  /**
   * 値が厳密に数値か否かを返す
   * @description `NaN` を `false` とする
   * @param value
   */
  isStrictNumber(value: unknown): value is number {
    return Checks.isNumber(value) && !Checks.isNaN(value)
  }
}

export default Checks
