import { Checks } from './checks'

/**
 * 型アサート機能を提供する
 */
export namespace Asserts {
  /**
   * 値が数値かアサートする
   * @param value
   * @throw {TypeError} 値が数値でない
   * @todo エラー生成などは内部機能で共通化する
   */
  export function isNumber(value: any): asserts value is number {
    if (!Checks.isNumber(value)) {
      throw new TypeError('value is not a number')
    }
  }
}
