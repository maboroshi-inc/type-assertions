/**
 * @hidden 指定の条件でアサートする
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
 * @param condition
 * @param errorMessage
 * @throw `condition` が Falthy ならば `errorMessage` を内容とする例外を投げる
 */
export function assert(
  condition: unknown,
  errorMessage?: string
): asserts condition {
  if (!condition) {
    throw new Error(errorMessage)
  }
}
