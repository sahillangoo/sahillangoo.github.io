---
title: 'Advanced TypeScript Utility Patterns'
description: 'Type-level snippets for deep immutability, conditional property mapping, and compile-time contract enforcement.'
publishDate: '2024-11-01'
topic: 'TypeScript'
tags: ['TypeScript', 'Generics', 'TypeLevel']
order: 1
---

TypeScript provides a rich set of built-in utility types such as `Partial<T>`, `Required<T>`, and `Readonly<T>`. However, standard library utilities operate only one level deep. In complex state machines, configuration pipelines, and API schemas, shallow immutability allows accidental mutations of nested properties.

Here are two advanced utility patterns that enforce strict type constraints at compile time with zero runtime overhead.

### 1. Recursive Deep Immutability

The `DeepReadonly<T>` type recursively traverses objects, nested tuples, collections, and primitives, applying the `readonly` modifier down to the leaf nodes:

```typescript
type Primitive = string | number | boolean | bigint | symbol | null | undefined | Function;

export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends Set<infer M>
      ? ReadonlySet<DeepReadonly<M>>
      : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepReadonly<U>>
        : { readonly [K in keyof T]: DeepReadonly<T[K]> };
```

This ensures that configuration trees or frozen application states cannot be altered even several levels deep.

### 2. Selective Property Filtering by Type

When modeling forms, database entities, or serialization boundaries, you often need to extract only keys whose values match a given predicate (for instance, extracting only string keys for search indexing):

```typescript
export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type PickByType<T, V> = Pick<T, KeysMatching<T, V>>;

// Example usage:
interface SystemConfig {
  host: string;
  port: number;
  ssl: boolean;
  endpoint: string;
}

// Resulting type: { host: string; endpoint: string }
type StringConfigs = PickByType<SystemConfig, string>;
```

These conditional mapping patterns turn TypeScript into a compile-time verification engine, catching schema mismatches before code reaches test runners or build stages.
