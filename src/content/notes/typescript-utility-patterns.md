---
title: 'Advanced TypeScript Utility Patterns'
description: 'Compact snippet for creating deeply immutable types and type-safe key transformations.'
publishDate: '2024-11-01'
topic: 'TypeScript'
tags: ['TypeScript', 'Generics', 'TypeLevel']
order: 1
---

When building robust design systems or API clients, you often need deep immutability:

```typescript
type DeepReadonly<T> = T extends Function | boolean | number | string | null | undefined
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends Map<infer K, infer V>
      ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
      : T extends Set<infer M>
        ? ReadonlySet<DeepReadonly<M>>
        : { readonly [P in keyof T]: DeepReadonly<T[P]> };
```

This prevents accidental mutation in deeply nested configuration objects.
