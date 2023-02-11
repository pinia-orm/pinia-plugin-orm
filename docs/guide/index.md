---
title: Getting Started | Guide
outline: deep
---

# Getting Started

## Overview

Note that in this documentation, we borrow many examples and texts from Vuex ORM Next. We would like to credit [Vuex ORM Next](https://next.vuex-orm.org) and the author of the section [Kia King Ishii](https://twitter.com/KiaKing85) for the awesome work.

## Adding Plugin to your Project

::: code-group

```bash [npm]
npm i -D pinia-orm pinia
```

```bash [yarn]
yarn add -D pinia-orm pinia
```

```bash [pnpm]
pnpm add -D pinia-orm pinia
```

:::

::: tip
This plugin requires pinia >= 2.0.29
:::

## Adding the plugin to your pinia store

::: code-group

```ts [vue3]
import { createORM } from 'pinia-plugin-orm'
import { createPinia } from 'pinia'

const pinia = createPinia().use(createORM())
```

```ts [vue2]
import { createORM } from 'pinia-plugin-orm'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia().use(createORM())
```

:::

## Define models

Models represent a schema of data that will be stored in Pinia. The schema often follows a servers API response, but it could also be whatever you like it to be.

Models may have relationships with other models. For example, a post could belong to a user, or a post has many comments.

The following examples will demonstrate what these models may look like:

### User Model

::: code-group

```ts [Fields Method]
// User Model
import { Model } from 'pinia-plugin-orm'
export default class User extends Model {
  // entity is a required property for all models.
  static entity = 'users'
  // List of all fields (schema) of the post model. `this.string()` declares
  // a string field type with a default value as the first argument.
  // `this.uid()` declares a unique id if none provided.
  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      email: this.string('')
    }
  }

  // For typescript support of the field include also the next lines
  declare id: string
  declare name: string
  declare email: string
}
```

```ts [Decorator Method]
// User Model
import { Model } from 'pinia-plugin-orm'
import { Str, Uid } from 'pinia-plugin-orm/dist/decorators'
export default class User extends Model {
  // entity is a required property for all models.
  static entity = 'users'
  @Uid() declare id: string
  @Str('') declare name: string
  @Str('') declare email: string
}
```

:::

### Post Model

::: code-group

```ts [Fields Method]
// Post Model
import { Model } from 'pinia-plugin-orm'
import User from './User'
export default class Post extends Model {
  static entity = 'posts'
  // `this.belongsTo(...)` declares this post belongs to a user. The first
  // argument is the `User` model class. The second is the field name for
  // the foreign key `userId`.
  static fields() {
    return {
      id: this.uid(),
      userId: this.attr(null),
      title: this.string(''),
      body: this.string(''),
      published: this.boolean(false),
      author: this.belongsTo(User, 'userId')
    }
  }

  declare id: string
  declare userId: string | null
  declare title: string
  declare body: string
  declare published: boolean
  declare author: User | null
}
```

```ts [Decorator Method]
// Post Model
import { Model } from 'pinia-plugin-orm'
import { Attr, BelongsTo, Bool, Str, Uid } from 'pinia-plugin-orm/dist/decorators'
import User from './User'
export default class Post extends Model {
  static entity = 'posts'
  @Uid() declare id: string
  @Attr(null) declare userId: string | null
  @Str('') declare title: string
  @Str('') declare body: string
  @Bool(false) declare published: boolean
  @BelongsTo(() => User, 'userId') declare author: User | null
}
```

:::

All models are declared by extending the Pinia ORM base Model class.

These examples create a User model and a Post model. The Post model has a belongsTo relationship to User defined by the author key. It's now possible to create posts that are associated with users.

## Examples

<!--@include: ../../examples/README.md-->

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you will need to clone the [plugin repo](https://github.com/pinia-orm/pinia-plugin-orm) to your local machine and then build and link it yourself ([pnpm](https://pnpm.io) is required):

```bash
git clone https://github.com/pinia-orm/pinia-plugin-orm.git
cd pinia-plugin-orm
pnpm install
cd packages/core
pnpm run build
pnpm link --global # you can use your preferred package manager for this step
```

Then go to the project where you are using `pinia-plugin-orm` and run `pnpm link --global pinia-plugin-orm` (or the package manager that you used to link `pinia-plugin-orm` globally).
