/**
 * 型チェックAPI
 * 値が指定の方であるか否かを `boolean` で返す
 */
export default {
  /**
   * 値が数値か否かを返す
   * @param value
   * @todo `typeof` を使わない実装にする
   */
  isNumber(value: any): value is number {
    return typeof value === 'number'
  }
}
