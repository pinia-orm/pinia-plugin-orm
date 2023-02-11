---
title: Typescript | Guide
outline: deep
---

# Typescript

::: tip
There are diffrent ways to write the classes and having typescript types. I want to show you here the diffrent approches.
:::

## Decorators with declare (recommanded)

```json
//tsconfig.json
{
  "compilerOptions": {
    // Default true if target is "ES2022" or "ESNext"
    "useDefineForClassFields": true,
    "experimentalDecorators": true,
  }
}
```

This is pretty new if you are a `vuex-orm` user. If you are a `vuex-orm-next` user than you are already used to it.

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Cast, Uid } from 'pinia-plugin-orm/dist/decorators'
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'

  @Uid() declare id: string
  @Cast(() => ArrayCast) @Attr('{}') declare meta: Record<string, any>
}
```

## Without declare

### With decorators

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Cast, Uid } from 'pinia-plugin-orm/dist/decorators'
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'

  @Uid() id!: string
  @Cast(() => ArrayCast) @Attr('{}') meta!: Record<string, any>
}
```

### without decorators (used way from vuex-orm)

```ts
import { Model } from 'pinia-plugin-orm'
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'

  static fields() {
    return {
      id: this.uid(),
      meta: this.attr('{}')
    }
  }

  static casts() {
    return {
      meta: ArrayCast,
    }
  }

  id!: number
  meta!: Record<string, any>
}
```
