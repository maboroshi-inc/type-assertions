import Checks from './checks'
import { assert } from './internal/assert'

/**
 * 型アサートAPI
 * @description 型が指定の値であるかアサートする
 * @category API
 */
export const Asserts = {
  /**
   * 値が数値かアサートする
   * @description `NaN` を許容する
   * @param value
   * @throw `value` が数値でない
   */
  isNumber(value: any): asserts value is number {
    return assert(Checks.isNumber(value), 'value is not a number')
  }
}

export default Asserts
