import { getObjectTypeName } from './internal/getObjectTypeName'

/**
 * 型チェックAPI
 * @description 値が指定の方であるか否かを `boolean` で返す
 * @category API
 */
export const Checks = {
  /**
   * 値が数値か否かを返す
   * @param value
   */
  isNumber(value: unknown): value is number {
    return getObjectTypeName(value) === '[object Number]'
  }
}

export default Checks
