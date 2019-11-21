/**
 * @hidden オブジェクトの型名を文字列で返す
 * @see https://qiita.com/amamamaou/items/ef0b797156b324bb4ef3#objectprototypetostringcall-%E3%82%92%E4%BD%BF%E3%81%86
 * @param value 型名を得たいオブジェクト
 */
export function getObjectTypeName(value: unknown): string {
  return Object.prototype.toString.call(value)
}
