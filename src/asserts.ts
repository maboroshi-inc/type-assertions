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
  isArray(value: unknown): asserts value is unknown[] {
    return assert(Checks.isArray(value), 'value is not an array')
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
   * 値がBooleanかアサートする
   * @param value
   * @throw `value` がBooleanでない
   */
  isBoolean(value: unknown): asserts value is boolean {
    return assert(Checks.isBoolean(value), 'value is not a boolean')
  },

  /**
   * 値がDateかアサートする
   * @param value
   * @throw `value` がDateでない
   */
  isDate(value: unknown): asserts value is Date {
    return assert(Checks.isDate(value), 'value is not a Date')
  },

  /**
   * 値が有効なDateかアサートする
   * @param value
   * @throw `value` が有効なDateでない
   */
  isValidDate(value: unknown): asserts value is Date {
    assert(Checks.isValidDate(value), 'value is not a valid Date')
  },

  /**
   * 値がErrorかアサートする
   * @param value
   * @throw `value` がErrorでない
   */
  isError(value: unknown): asserts value is Error {
    return assert(Checks.isError(value), 'value is not an Error')
  },

  /**
   * 値が有限数かアサートする
   * @param value
   * @throw `value` が有限数でない
   */
  isFiniteNumber(value: unknown): asserts value is number {
    return assert(Checks.isFiniteNumber(value), 'value is not a finite number')
  },

  /**
   * 値が整数かアサートする
   * @param value
   * @throw `value` が整数でない
   */
  isInteger(value: unknown): asserts value is number {
    return assert(Checks.isInteger(value), 'value is not an integer')
  },

  /**
   * 値が `NaN` かアサートする
   * @param value
   */
  isNaN(value: unknown): asserts value is typeof NaN {
    return assert(Checks.isNaN(value), 'value is not a NaN')
  },

  /**
   * 値が `null` かアサートする
   * @param value
   * @throw `value` が `null` でない
   */
  isNull(value: unknown): asserts value is null {
    return assert(Checks.isNull(value), 'value is not a null')
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
   * 値が厳密に数値かアサートする
   * @description `NaN` を例外とする
   * @param value
   * @throw `value` が厳密に数値でない
   */
  isStrictNumber(value: unknown): asserts value is number {
    return assert(Checks.isStrictNumber(value), 'value is not a strict number')
  },

  /**
   * 値がビルトインのobjectかアサートする
   * @param value
   * @throw `value` がobjectでない
   */
  isObject(value: unknown): asserts value is object {
    return assert(Checks.isObject(value), 'value is not an object')
  },

  /**
   * 値がObjectオブジェクトかアサートする
   * @param value
   * @throw `value` がObjectオブジェクトでない
   */
  isPlainObject(value: unknown): asserts value is object {
    return assert(Checks.isPlainObject(value), 'value is not a plane object')
  },

  /**
   * 値がビルトインの `Promise` オブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseでない
   */
  isPromise(value: unknown): asserts value is Promise<unknown> {
    assert(Checks.isPromise(value), 'value is not a Promise')
  },

  /**
   * 値が `PromiseLike` なオブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseLikeでない
   */
  isPromiseLike(value: unknown): asserts value is PromiseLike<unknown> {
    assert(Checks.isPromiseLike(value), 'value is not a PromiseLike')
  },

  /**
   * 値が正規表現オブジェクトかアサートする
   * @param value
   * @throw `value` が正規表現オブジェクトでない
   */
  isRegExp(value: unknown): asserts value is RegExp {
    return assert(Checks.isRegExp(value), 'value is not a RegExp')
  },

  /**
   * 値が safe integer かアサートする
   * @param value
   * @throw `value` が safe integer でない
   */
  isSafeInteger(value: unknown): asserts value is number {
    return assert(Checks.isSafeInteger(value), 'value is not a safe integer')
  },

  /**
   * 値が文字列かアサートする
   * @param value
   * @throw `value` が文字列でない
   */
  isString(value: unknown): asserts value is string {
    return assert(Checks.isString(value), 'value is not a string')
  },

  /**
   * 値がsymbolかアサートする
   * @param value
   * @throw `value` がsymbolでない
   */
  isSymbol(value: unknown): asserts value is symbol {
    return assert(Checks.isSymbol(value), 'value is not a symbol')
  },

  /**
   * 値が undefined かアサートする
   * @param value
   * @throw `value` が undefined でない
   */
  isUndefined(value: unknown): asserts value is undefined {
    return assert(Checks.isUndefined(value), 'value is not an undefined')
  },

  /**
   * 値が `Map` かアサートする
   * @param value
   * @throw `value` が `Map` でない
   */
  isMap(value: unknown): asserts value is Map<unknown, unknown> {
    assert(Checks.isMap(value), 'value is not a Map')
  },

  /**
   * 値が `WeakMap` かアサートする
   * @param value
   * @throw `value` が `WeakMap` でない
   */
  isWeakMap(value: unknown): asserts value is WeakMap<object, unknown> {
    assert(Checks.isWeakMap(value), 'value is not a WeakMap')
  },

  /**
   * 値が `Set` かアサートする
   * @param value
   * @throw `value` が `Set` でない
   */
  isSet(value: unknown): asserts value is Set<unknown> {
    assert(Checks.isSet(value), 'value is not a Set')
  },

  /**
   * 値が `WeakSet` かアサートする
   * @param value
   * @throw `value` が `WeakSet` でない
   */
  isWeakSet(value: unknown): asserts value is WeakSet<object> {
    assert(Checks.isWeakSet(value), 'value is not a WeakSet')
  }
}

export default Asserts
