import { getObjectTypeName } from './internal/getObjectTypeName'

type MaybeThenable = {
  then?: unknown
}

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
   * 値がビルトインの `Promise` オブジェクトか否かを返す
   * @param value
   */
  isPromise(value: unknown): value is Promise<unknown> {
    return getObjectTypeName(value) === '[object Promise]'
  },

  /**
   * 値が `PromiseLike` なオブジェクトか否かを返す
   * @param value
   */
  isPromiseLike(value: unknown): value is PromiseLike<unknown> {
    if (Checks.isPromise(value)) {
      return true
    }

    return (
      !!value &&
      /** @todo `Checks.isFunction` が実装されたらそれを使う */
      getObjectTypeName((value as MaybeThenable).then) === '[object Function]'
    )
  }
}

export default Checks
