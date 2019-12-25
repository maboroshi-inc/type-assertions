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
 * 型ガードAPI
 * @description 値が指定の方であるか否かを `boolean` で返す
 * @see {@link https://github.com/maboroshi-inc/type-assertions/blob/master/__tests__/guards.spec.ts|テストケース}
 * @category API
 */
export const Guards = {
  /**
   * 値が配列か否かを返す
   * @alias `Array.isArray()`
   * @param value
   */
  isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
  },

  /**
   * 値が BigInt か否かを返す
   * @param value
   */
  isBigInt(value: unknown): value is bigint {
    return getObjectTypeName(value) === '[object BigInt]'
  },

  /**
   * 値が Boolean か否かを返す
   * @param value
   */
  isBoolean(value: unknown): value is boolean {
    return getObjectTypeName(value) === '[object Boolean]'
  },

  /**
   * 値が Date か否かを返す
   * @param value
   */
  isDate(value: unknown): value is Date {
    return getObjectTypeName(value) === '[object Date]'
  },

  /**
   * 値が Error か否かを返す
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
    return Guards.isNumber(value) && Number.isFinite(value)
  },

  /**
   * 値が関数か否かを返す
   * @param value
   */
  isFunction(value: unknown): value is Function {
    return getObjectTypeName(value) === '[object Function]'
  },

  /**
   * 値がジェネレーター関数か否かを返す
   * @param value
   */
  isGeneratorFunction(value: unknown): value is GeneratorFunction {
    return getObjectTypeName(value) === '[object GeneratorFunction]'
  },

  /**
   * 値が整数か否かを返す
   * @alias `Number.isInteger()`
   * @param value
   */
  isInteger(value: unknown): value is number {
    return Guards.isNumber(value) && Number.isInteger(value)
  },

  /**
   * 値が Map か否かを返す
   * @param value
   */
  isMap(value: unknown): value is Map<unknown, unknown> {
    return getObjectTypeName(value) === '[object Map]'
  },

  /**
   * 値が NaN か否かを返す
   * @alias `Number.isNaN()`
   * @param value
   */
  isNaN(value: unknown): value is typeof NaN {
    return Guards.isNumber(value) && Number.isNaN(value)
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
   * 値が Object を継承したオブジェクトか否かを返す
   * @description `null` 及びプリミティブ値以外をすべて `true` とする
   * @param value
   */
  isObject(value: unknown): value is object {
    return typeof value === 'object' && !Guards.isNull(value)
  },

  /**
   * 値が Object オブジェクトか否かを返す
   * @description `Object` のみを `true` とする
   * @param value
   */
  isPlainObject(value: unknown): value is object {
    return (
      Guards.isObject(value) && // パフォーマンスアップのために最初にプリミティブ値を弾く
      getObjectTypeName(value) === '[object Object]' &&
      value.constructor === Object.prototype.constructor // constructor を比較してカスタムクラスを弾く
    )
  },

  /**
   * 値がビルトインの Promise オブジェクトか否かを返す
   * @param value
   */
  isPromise(value: unknown): value is Promise<unknown> {
    return getObjectTypeName(value) === '[object Promise]'
  },

  /**
   * 値が PromiseLike なオブジェクトか否かを返す
   * @param value
   */
  isPromiseLike(value: unknown): value is PromiseLike<unknown> {
    if (Guards.isPromise(value)) {
      return true
    }

    return !!value && Guards.isFunction((value as MaybeThenable).then)
  },

  /**
   * 値が正規表現オブジェクトか否かを返す
   * @param value
   */
  isRegExp(value: unknown): value is RegExp {
    return getObjectTypeName(value) === '[object RegExp]'
  },

  /**
   * 値が safe integer か否かを返す
   * @alias `Number.isSafeInteger()`
   * @param value
   */
  isSafeInteger(value: unknown): value is number {
    return Guards.isNumber(value) && Number.isSafeInteger(value)
  },

  /**
   * 値が Set か否かを返す
   * @param value
   */
  isSet(value: unknown): value is Set<unknown> {
    return getObjectTypeName(value) === '[object Set]'
  },

  /**
   * 値が厳密に数値か否かを返す
   * @description `NaN` を `false` とする
   * @param value
   */
  isStrictNumber(value: unknown): value is number {
    return Guards.isNumber(value) && !Guards.isNaN(value)
  },

  /**
   * 値が文字列か否かを返す
   * @param value
   */
  isString(value: unknown): value is string {
    return getObjectTypeName(value) === '[object String]'
  },

  /**
   * 値が Symbol か否かを返す
   * @param value
   */
  isSymbol(value: unknown): value is symbol {
    return typeof value === 'symbol'
  },

  /**
   * 値が `undefined` か否かを返す
   * @param value
   */
  isUndefined(value: unknown): value is undefined {
    return value === undefined
  },

  /**
   * 値が有効な Date か否かを返す
   * @param value
   */
  isValidDate(value: unknown): value is Date {
    // Invalid Date の getTime の返り値は NaN。 なので返り値が NaN ではない場合は有効な Date とみなす。
    return Guards.isDate(value) && !Guards.isNaN(value.getTime())
  },

  /**
   * 値が WeakMap か否かを返す
   * @param value
   */
  isWeakMap(value: unknown): value is WeakMap<object, unknown> {
    return getObjectTypeName(value) === '[object WeakMap]'
  },

  /**
   * 値が WeakSet か否かを返す
   * @param value
   */
  isWeakSet(value: unknown): value is WeakSet<object> {
    return getObjectTypeName(value) === '[object WeakSet]'
  }
}

export default Guards
