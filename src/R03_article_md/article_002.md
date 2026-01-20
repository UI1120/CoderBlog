# TypeScript 5.x の新機能

TypeScript 5.x では、さらに型安全で書きやすい機能が追加されました。

## Const Type Parameters

型引数に `const` をつけることで、推論される型をリテラル型として扱うことができます。

```typescript
function readonly<const T>(arg: T) {
  return arg;
}
```

## Decorators

ECMAScript のデコレータ仕様に基づいた新しいデコレータがサポートされました。

詳細な使い方は公式ドキュメントを参照してください。
