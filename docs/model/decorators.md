---
title: Decorators | Model
outline: deep
---

# Decorators

::: tip NOTE
Pinia ORM provides property decorators to Typescript users for better type support when defining the schema for an entity. Simply put, decorators replace the need to define the `fields` method.
:::

The following example defines a User model using decorators on properties that form the schema for the users entity:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Str, HasMany } from 'pinia-plugin-orm/dist/decorators'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  @Attr(null) declare id: number | null
  @Str('') declare name: string
  @HasMany(() => Post, 'userId') declare posts: Post[]
}
```

Of course, you can choose not to use decorators and continue to define the entity schema using the `fields` method. In such a case, you must explicitly define model class properties that correspond to the field definitions to get correct typings:

```ts
import { Model } from 'pinia-plugin-orm'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(),
      name: this.string(''),
      posts: this.hasMany(Post, 'userId')
    }
  }
  declare id: number | null
  declare name: string
  declare posts: Post[]
}
```

## Available Decorators

### @Attr

Marks a property on the model as a [generic attribute](/model/#generic-type) type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr } from 'pinia-plugin-orm/dist/decorators'

export class User extends Model {
  static entity = 'users'
  @Attr(null) declare id: number | null
  @Attr('John Doe') declare name: string
  @Attr(false) declare active: boolean
}
```

### @Str

Marks a property on the model as a [string attribute](/model/#string-type) type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Str } from 'pinia-plugin-orm/dist/decorators'

export class User extends Model {
  static entity = 'users'
  @Str('') declare name: string
  @Str('', { notNullable: true }) declare address: string | null
}
```

### @Num

Marks a property on the model as a [number attribute](/model/#number-type) type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Num } from 'pinia-plugin-orm/dist/decorators'

export class User extends Model {
  static entity = 'users'
  @Num(0) declare count: number
  @Num(0, { notNullable: true }) declare roleId: number | null
}
```

### @Bool

Marks a property on the model as a [boolean attribute](/model/#boolean-type) type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Bool } from 'pinia-plugin-orm/dist/decorators'

export class User extends Model {
  static entity = 'users'
  @Bool(false) declare active: boolean
  @Bool(false, { notNullable: true }) declare visible: boolean | null
}
```

### @Uid

Marks a property on the model as a [Uid attribute](/model/#uid-type) type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Uid } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'
  @Uid() declare id: string
}
```

## Mutator

Adds a [mutator](/model/accessors-mutators.html#defining-mutators) to a property on the model. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Mutate } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'
  @Mutate((value: any) => value.toUpperCase()) @Attr('') declare name: string
}

console.log(new User({ name: 'elone hoo' }).name) // 'ELONE HOO'
```

## Cast

Adds a cast to a property on the model. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Cast } from 'pinia-plugin-orm/dist/decorators'
import { StringCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'
  @Cast(() => StringCast) @Attr('') declare name: string
}

console.log(new User({ name: 1 }).name) // '1'
```

## Relationships

::: tip NOTE
Decorators on relation properties accept the same argument signature as their corresponding field attribute type with the exception that model references should be defined as a closure that return the model constructor (to avoid circular dependencies).
:::

### @HasOne

Marks a property on the model as a [hasOne attribute]() type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, HasOne } from 'pinia-plugin-orm/dist/decorators'
import Phone from '@/models/Phone'

class User extends Model {
  static entity = 'users'
  @HasOne(() => Phone, 'userId') declare phone: Phone | null
}
```

### @BelongsTo

Marks a property on the model as a belongsTo attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, BelongsTo } from 'pinia-plugin-orm/dist/decorators'
import User from '@/models/User'

class Post extends Model {
  static entity = 'posts'
  @Attr(null) declare userId: number | null
  @BelongsTo(() => User, 'userId') declare user: User | null
}
```

### @HasMany

Marks a property on the model as a hasMany attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, HasMany } from 'pinia-plugin-orm/dist/decorators'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  @HasMany(() => Post, 'userId') declare posts: Post[]
}
```

### @HasManyBy

Marks a property on the model as a hasManyBy attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, HasManyBy } from 'pinia-plugin-orm/dist/decorators'
import Node from '@/models/Node'

class Cluster extends Model {
  static entity = 'clusters'
  @Attr(null) declare nodeIds: number[]
  @HasManyBy(() => Node, 'nodesId') declare nodes: Node[]
}
```

### @BelongsToMany

Marks a property on the model as a belongsToMany attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { BelongsToMany } from 'pinia-plugin-orm/dist/decorators'
import Role from '@/models/Role'

class User extends Model {
  static entity = 'users'
  @BelongsToMany(() => Role, () => RoleUser, 'user_id', 'role_id') declare roles: Role[]
}
```

### @MorphOne

Marks a property on the model as a morphOne attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { MorphOne } from 'pinia-plugin-orm/dist/decorators'
import Image from '@/models/Image'

class User extends Model {
  static entity = 'users'
  @MorphOne(() => Image, 'imageableId', 'imageableType') declare image: Image | null
}
```

### @MorphTo

Marks a property on the model as a morphTo attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, MorphTo } from 'pinia-plugin-orm/dist/decorators'
import User from '@/models/User'
import Post from '@/models/Post'
class Image extends Model {
  static entity = 'images'
  @Attr(null) declare imageableId: number | null
  @Attr(null) declare imageableType: string | null
  @MorphTo(() => [User, Post], 'imageableId', 'imageableType') declare imageable: User | Post | null
}
```

### @MorphMany

Marks a property on the model as a morphMany attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { MorphMany } from 'pinia-plugin-orm/dist/decorators'
import Comment from '@/models/Comment'

class Video extends Model {
  static entity = 'videos'
  @MorphMany(() => Comment, 'commentableId', 'commentableType') declare comments: Comment[]
}
```

## Relationship Options

### @OnDelete

Marks a property on the model as a hasMany attribute type. For example:

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, HasMany, OnDelete } from 'pinia-plugin-orm/dist/decorators'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  @HasMany(() => Post, 'userId') @OnDelete('cascade') declare posts: Post[]
}
```
