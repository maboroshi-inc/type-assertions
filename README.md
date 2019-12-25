# type-assertions

型アサーションユーティリティ  
https://github.com/maboroshi-inc/type-assertions

## インストール

```sh
npm install @maboroshi/type-assertions
```

or

```sh
yarn add @maboroshi/type-assertions
```

## 使い方

### Asserts API

TypeScript 3.7 より提供された [Assertion Function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) を用いた型アサート機能を提供する。

```typescript
import { Asserts } from '@maboroshi/type-assertions'

const fn = (value: number | null) => {
  Asserts.isNumber(value)
  return value.toString()
}

fn(123) // => `123`
fn(null) // => throw error!
```

### Guards API

[Type Guard](http://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) 機能を提供する。

```typescript
import { Guards } from '@maboroshi/type-assertions'

const fn = (value: number | null) => {
  if (Guards.isNumber(value)) {
    return value.toString()
  }
}

fn(123) // => `123`
fn(null) // => undefined
```

## API

[API ドキュメント](https://maboroshi-inc.github.io/type-assertions/) を見る
