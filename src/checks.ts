/**
 * 型チェック機能を提供する
 */
export namespace Checks {
  /**
   * 値が数値か否かを返す
   * @param value
   * @todo `typeof` を使わない実装にする
   */
  export function isNumber(value: any): value is number {
    return typeof value === 'number'
  }
}
