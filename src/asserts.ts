import Checks from './checks'
import { assert } from './internal/assert'

/**
 * 型アサートAPI
 * @description 型が指定の値であるかアサートする
 * @category API
 */
export const Asserts = {
  /**
   * 値が配列かアサートする
   * @param value
   */
  isArray<T>(value: unknown): asserts value is T[] {
    return assert(Checks.isArray<T>(value), 'value is not an array')
  },

  /**
   * 値がBigIntかアサートする
   * @param value
   * @throw `value` がBigIntでない
   */
  isBigInt(value: unknown): asserts value is bigint {
    return assert(Checks.isBigInt(value), 'value is not a bigint')
  },

  /**
   * 値が `NaN` かアサートする
   * @param value
   */
  isNaN(value: unknown): asserts value is typeof NaN {
    return assert(Checks.isNaN(value), 'value is not a NaN')
  },

  /**
   * 値が数値かアサートする
   * @description `NaN` を許容する
   * @param value
   * @throw `value` が数値でない
   */
  isNumber(value: any): asserts value is number {
    return assert(Checks.isNumber(value), 'value is not a number')
  },

  /**
   * 値がビルトインの `Promise` オブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseでない
   */
  isPromise<T>(value: unknown): asserts value is Promise<T> {
    assert(Checks.isPromise(value), 'value is not a Promise')
  },

  /**
   * 値が `PromiseLike` なオブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseLikeでない
   */
  isPromiseLike<T>(value: unknown): asserts value is PromiseLike<T> {
    assert(Checks.isPromiseLike(value), 'value is not a PromiseLike')
  }
}

export default Asserts
