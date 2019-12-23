import Guards from './guards'
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
    return assert(Guards.isArray(value), 'value is not an array')
  },

  /**
   * 値がBigIntかアサートする
   * @param value
   * @throw `value` がBigIntでない
   */
  isBigInt(value: unknown): asserts value is bigint {
    return assert(Guards.isBigInt(value), 'value is not a bigint')
  },

  /**
   * 値がBooleanかアサートする
   * @param value
   * @throw `value` がBooleanでない
   */
  isBoolean(value: unknown): asserts value is boolean {
    return assert(Guards.isBoolean(value), 'value is not a boolean')
  },

  /**
   * 値がDateかアサートする
   * @param value
   * @throw `value` がDateでない
   */
  isDate(value: unknown): asserts value is Date {
    return assert(Guards.isDate(value), 'value is not a Date')
  },

  /**
   * 値が有効なDateかアサートする
   * @param value
   * @throw `value` が有効なDateでない
   */
  isValidDate(value: unknown): asserts value is Date {
    assert(Guards.isValidDate(value), 'value is not a valid Date')
  },

  /**
   * 値がErrorかアサートする
   * @param value
   * @throw `value` がErrorでない
   */
  isError(value: unknown): asserts value is Error {
    return assert(Guards.isError(value), 'value is not an Error')
  },

  /**
   * 値が有限数かアサートする
   * @param value
   * @throw `value` が有限数でない
   */
  isFiniteNumber(value: unknown): asserts value is number {
    return assert(Guards.isFiniteNumber(value), 'value is not a finite number')
  },

  /**
   * 値が整数かアサートする
   * @param value
   * @throw `value` が整数でない
   */
  isInteger(value: unknown): asserts value is number {
    return assert(Guards.isInteger(value), 'value is not an integer')
  },

  /**
   * 値が `NaN` かアサートする
   * @param value
   */
  isNaN(value: unknown): asserts value is typeof NaN {
    return assert(Guards.isNaN(value), 'value is not a NaN')
  },

  /**
   * 値が `null` かアサートする
   * @param value
   * @throw `value` が `null` でない
   */
  isNull(value: unknown): asserts value is null {
    return assert(Guards.isNull(value), 'value is not a null')
  },

  /**
   * 値が数値かアサートする
   * @description `NaN` を許容する
   * @param value
   * @throw `value` が数値でない
   */
  isNumber(value: any): asserts value is number {
    return assert(Guards.isNumber(value), 'value is not a number')
  },

  /**
   * 値が厳密に数値かアサートする
   * @description `NaN` を例外とする
   * @param value
   * @throw `value` が厳密に数値でない
   */
  isStrictNumber(value: unknown): asserts value is number {
    return assert(Guards.isStrictNumber(value), 'value is not a strict number')
  },

  /**
   * 値がビルトインのobjectかアサートする
   * @param value
   * @throw `value` がobjectでない
   */
  isObject(value: unknown): asserts value is object {
    return assert(Guards.isObject(value), 'value is not an object')
  },

  /**
   * 値がObjectオブジェクトかアサートする
   * @param value
   * @throw `value` がObjectオブジェクトでない
   */
  isPlainObject(value: unknown): asserts value is object {
    return assert(Guards.isPlainObject(value), 'value is not a plane object')
  },

  /**
   * 値が関数かアサートする
   * @param value
   * @throw `value` が関数でない
   */
  isFunction(value: unknown): asserts value is Function {
    return assert(Guards.isFunction(value), 'value is not a function')
  },

  /**
   * 値がジェネレーター関数かアサートする
   * @param value
   * @throw `value` がジェネレーター関数でない
   */
  isGeneratorFunction(value: unknown): asserts value is GeneratorFunction {
    return assert(
      Guards.isGeneratorFunction(value),
      'value is not a generator function'
    )
  },

  /**
   * 値がビルトインの `Promise` オブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseでない
   */
  isPromise(value: unknown): asserts value is Promise<unknown> {
    assert(Guards.isPromise(value), 'value is not a Promise')
  },

  /**
   * 値が `PromiseLike` なオブジェクトかアサートする
   * @param value
   * @throw `value` がPromiseLikeでない
   */
  isPromiseLike(value: unknown): asserts value is PromiseLike<unknown> {
    assert(Guards.isPromiseLike(value), 'value is not a PromiseLike')
  },

  /**
   * 値が正規表現オブジェクトかアサートする
   * @param value
   * @throw `value` が正規表現オブジェクトでない
   */
  isRegExp(value: unknown): asserts value is RegExp {
    return assert(Guards.isRegExp(value), 'value is not a RegExp')
  },

  /**
   * 値が safe integer かアサートする
   * @param value
   * @throw `value` が safe integer でない
   */
  isSafeInteger(value: unknown): asserts value is number {
    return assert(Guards.isSafeInteger(value), 'value is not a safe integer')
  },

  /**
   * 値が文字列かアサートする
   * @param value
   * @throw `value` が文字列でない
   */
  isString(value: unknown): asserts value is string {
    return assert(Guards.isString(value), 'value is not a string')
  },

  /**
   * 値がsymbolかアサートする
   * @param value
   * @throw `value` がsymbolでない
   */
  isSymbol(value: unknown): asserts value is symbol {
    return assert(Guards.isSymbol(value), 'value is not a symbol')
  },

  /**
   * 値が undefined かアサートする
   * @param value
   * @throw `value` が undefined でない
   */
  isUndefined(value: unknown): asserts value is undefined {
    return assert(Guards.isUndefined(value), 'value is not an undefined')
  },

  /**
   * 値が `Map` かアサートする
   * @param value
   * @throw `value` が `Map` でない
   */
  isMap(value: unknown): asserts value is Map<unknown, unknown> {
    assert(Guards.isMap(value), 'value is not a Map')
  },

  /**
   * 値が `WeakMap` かアサートする
   * @param value
   * @throw `value` が `WeakMap` でない
   */
  isWeakMap(value: unknown): asserts value is WeakMap<object, unknown> {
    assert(Guards.isWeakMap(value), 'value is not a WeakMap')
  },

  /**
   * 値が `Set` かアサートする
   * @param value
   * @throw `value` が `Set` でない
   */
  isSet(value: unknown): asserts value is Set<unknown> {
    assert(Guards.isSet(value), 'value is not a Set')
  },

  /**
   * 値が `WeakSet` かアサートする
   * @param value
   * @throw `value` が `WeakSet` でない
   */
  isWeakSet(value: unknown): asserts value is WeakSet<object> {
    assert(Guards.isWeakSet(value), 'value is not a WeakSet')
  }
}

export default Asserts
