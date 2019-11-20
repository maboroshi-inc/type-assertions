import Checks from './checks'

/**
 * 型アサートAPI
 * @description 型が指定の値であるかアサートする
 * @category API
 */
export const Asserts = {
  /**
   * 値が数値かアサートする
   * @param value
   * @throw {TypeError} 値が数値でない
   * @todo エラー生成などは内部機能で共通化する
   */
  isNumber(value: any): asserts value is number {
    if (!Checks.isNumber(value)) {
      throw new TypeError('value is not a number')
    }
  }
}

export default Asserts