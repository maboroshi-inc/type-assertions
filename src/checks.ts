import { getObjectTypeName } from './internal/getObjectTypeName'

/**
 * unknown なオブジェクトを Thenable なオブジェクトとしてキャストして then にアクセスするための型
 * @hidden
 * @example
 * declare const myValue: unknown
 * (myValue as MaybeThenable).then // do something
 */
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
  isArray(value: unknown): value is unknown[] {
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
   */
  isBoolean(value: unknown): value is boolean {
    return getObjectTypeName(value) === '[object Boolean]'
  },

  /**
   * 値がDateか否かを返す
   * @param value
   */
  isDate(value: unknown): value is Date {
    return getObjectTypeName(value) === '[object Date]'
  },

  /**
   * 値がErrorか否かを返す
   * @param value
   */
  isError(value: unknown): value is Error {
    return getObjectTypeName(value) === '[object Error]'
  },

  /**
   * 値が有限数か否かを返す
   * @alias `Number.isFinite()`
   * @param value
   */
  isFiniteNumber(value: unknown): value is number {
    return Checks.isNumber(value) && Number.isFinite(value)
  },

  /**
   * 値が整数か否かを返す
   * @alias `Number.isInteger()`
   * @param value
   */
  isInteger(value: unknown): value is number {
    return Checks.isNumber(value) && Number.isInteger(value)
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
   * 値が `null` か否かを返す
   * @param value
   */
  isNull(value: unknown): value is null {
    return value === null
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
  },

  /**
   * 値が `Map` か否かを返す
   * @param value
   */
  isMap(value: unknown): value is Map<unknown, unknown> {
    return getObjectTypeName(value) === '[object Map]'
  },

  /**
   * 値が `WeakMap` か否かを返す
   * @param value
   */
  isWeakMap(value: unknown): value is WeakMap<object, unknown> {
    return getObjectTypeName(value) === '[object WeakMap]'
  },

  /**
   * 値が `Set` か否かを返す
   * @param value
   */
  isSet(value: unknown): value is Set<unknown> {
    return getObjectTypeName(value) === '[object Set]'
  },

  /**
   * 値が `WeakSet` か否かを返す
   * @param value
   */
  isWeakSet(value: unknown): value is WeakSet<object> {
    return getObjectTypeName(value) === '[object WeakSet]'
  }
}

export default Checks
