/**
 * 型チェックAPI
 * @description 値が指定の方であるか否かを `boolean` で返す
 * @category API
 */
export const Checks = {
  /**
   * 値が数値か否かを返す
   * @param value
   * @todo `value` を `unknown` 型とする
   * @todo `typeof` を使わない実装にする
   */
  isNumber(value: any): value is number {
    return typeof value === 'number'
  }
}

export default Checks
