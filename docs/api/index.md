---
title: API Reference | API
outline: deep
---

# API Reference

## Composables

### useRepo()

<br/>

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'
import PostRepository from './repositories/Post'

const userRepo = useRepo(User) // Repository<User>
const postRepo = useRepo(PostRepo) // PostRepository
```

**Type Declaration**

```ts
export function useRepo<M extends Model>(
  model: Constructor<M>,
  pinia?: Pinia,
): Repository<M>

export function useRepo<R extends Repository>(
  repository: Constructor<R>,
  pinia?: Pinia,
): R
```

## Helpers

### useCollect()

> For Details what each function can do, look at the separate composable for it e.g. `min` -> `useMin`

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useCollect } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'

const users = useRepo(User).all()
// order a collection by 'name' attributes
useCollect(users).orderBy('name')
// get the min of the 'age' attribute
useCollect(users).min('age')
// get the max of the 'age' attribute
useCollect(users).max('age')
// get the sum of the 'age' attribute
useCollect(users).sum('age')
// sort by 'age' attribute
useCollect(users).sortBy('age')
// get all values in 'age' attribute
useCollect(users).pluck('age')
// get all primary keys
useCollect(users).keys()
```

**Type Declaration**

```ts
export interface UseCollect<M extends Model = Model> {
  sum: (field: string) => number
  min: (field: string) => number
  max: (field: string) => number
  pluck: (field: string) => any[]
  groupBy: (fields: string[] | string) => Record<string, Collection<M>>
  sortBy: (sort: sorting<M>, flags?: SortFlags) => M[]
  keys: () => string[]
}

export function useCollect<M extends Model = Model>(models: Collection<M>): UseCollect<M>
```

### useGroupBy()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useGroupBy } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'

const users = useRepo(User).all()
// group by the 'name' attribute
useGroupBy(users, 'name')
// group by the 'name' and 'age' attribute
useGroupBy(users, ['name', 'age'])
```

**Type Declaration**

```ts
export function useGroupBy<T>(models: T[], fields: string[] | string): Record<string, T[]>
```

### useKeys()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useKeys } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'

const users = useRepo(User).all()
// retrieve all primary keys
useKeys(users)
```

**Type Declaration**

```ts
export function useKeys(models: Collection): string[]
```

### useMax()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useMax } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'

const users = useRepo(User).all()
// get the max of the 'age' attribute
useMax(users, 'age')
// get the max of the 'role.title' attribute. The dot notation works only for 1n1 Relations
useMax(users, 'role.title')
```

**Type Declaration**

```ts
export function useMax(models: Collection, field: string): number
```

### useMin()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useMin } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'
const users = useRepo(User).all()
// get the min of the 'age' attribute
useMin(users, 'age')
// get the min of the 'role.title' attribute. The dot notation works only for 1n1 Relations
useMin(users, 'role.title')
```

**Type Declaration**

```ts
export function useMin(models: Collection, field: string): number
```

### usePluck()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { usePluck } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'
const users = useRepo(User).all()
// retrieve all values of the 'age' attribute
usePluck(users, 'age')
// retrieve all values of the 'role.title' attribute. The dot notation works only for 1n1 Relations
usePluck(users, 'role.title')
```

**Type Declaration**

```ts
export function usePluck(models: Collection, field: string): any[]
```

### useSortBy()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useSortBy } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'

const users = useRepo(User).all()
// sort by the 'name' attribute
useSortBy(users, 'name')
// sort by the `name` attribute case insensitive
useSortBy(users, 'name', 'SORT_FLAG_CASE')
// sorts the collection by 'name' descending and then by 'lastname' ascending
useSortBy(users, [
    ['name', 'desc'],
    ['lastname', 'asc'],
])
// sort by the 'age' attribute
useSortBy(users, (model) => model.age)
```

**Type Declaration**

```ts
export type sorting<T> = ((record: T) => any) | string | [string, 'asc' | 'desc'][]
export type SortFlags = 'SORT_REGULAR' | 'SORT_FLAG_CASE'

export function useSortBy<T>(collection: T[], sort: sorting<T>, flags?: SortFlags): T[]
```

### useSum()

<br />

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import { useSum } from 'pinia-plugin-orm/dist/helpers'
import User from './models/User'
const users = useRepo(User).all()
// get the sum of the 'age' attribute
useSum(users, 'age')
// get the sum of the 'role.title' attribute. The dot notation works only for 1n1 Relations
useSum(users, 'role.title')
```

**Type Declaration**

```ts
export function useSum(models: Collection, field: string): number
```

## Model - fields(Attr)

### attr

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'

class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('Elone Hoo'),
      address: this.attr(() => 'Address'),
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @Attr('') declare name: string
  @Attr(() => 'street') declare address: string
}
```

:::

**Typescript Declarations**

```ts
function attr(value: any | (() => any)): Attr
```

### boolean

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.number(0),
      published: this.boolean(false),
      released: this.boolean(() => false),
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Bool, Num } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'

  @Num(0) declare id: number
  @Bool(false) declare published: boolean
  @Bool(() => false) declare released: boolean
}
```

:::

**Typescript Declarations**

```ts
function boolean(value: boolean | null | (() => boolean | null)): Bool
```

### number

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.number(0)
      extraId: this.number(() => 0)
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Num } from 'pinia-plugin-orm/dist/decorators'
class User extends Model {
  static entity = 'users'

  @Num(0) declare id: number
  @Num(() => 0) declare extraId: number
}
```

:::

**Typescript Declarations**

```ts
function number(value: number | null | (() => number | null)): Number
```

### number

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.number(0),
      name: this.string('')
      address: this.string(() => 'street')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Num, Str } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'

  @Num(0) declare id: number
  @Str('') declare name: string
  @Str(() => 'street') declare address: string
}

```

:::

**Typescript Declarations**

```ts
function string(value: string | null | (() => string | null)): String
```

### uid

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'

class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.uid()
    }
  }
}

```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Uid } from 'pinia-plugin-orm/dist/decorators'

class User extends Model {
  static entity = 'users'

  @Uid() declare id: string
}

```

:::

**Typescript Declarations**

```ts
function uid(): Uid
```

## Model - fields(Rel)

### belongsToMany

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Role from './Role'
import RoleUser from './RoleUser'

class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, BelongsToMany, Str } from 'pinia-plugin-orm/dist/decorators'
import Role from './Role'
import RoleUser from './RoleUser'

class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @BelongsToMany(() => Role, () => RoleUser, 'user_id', 'role_id') declare roles: Role[]
}
```

:::

**Typescript Declarations**

```ts
function belongsToMany(
  related: typeof Model,
  pivot: typeof Model,
  foreignPivotKey: string,
  relatedPivotKey: string,
  parentKey?: string,
  relatedKey?: string,
): BelongsToMany
```

### belongsTo

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import User from './User'

class Phone extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      userId: this.attr(null),
      number: this.string(''),
      user: this.belongsTo(User, 'userId')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, BelongsTo, Str } from 'pinia-plugin-orm/dist/decorators'
import User from './User'
class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @Attr(null) declare userId: number | null
  @Str('') declare number: string
  @BelongsTo(() => User, 'userId') declare user: User
}
```

:::

**Typescript Declarations**

```ts
function belongsTo(
  related: typeof Model,
  foreignKey: string | string[],
  ownerKey?: string | string[],
): BelongsTo
```

### hasManyBy

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Comment from './Comment'

class Post extends Model {
  static entity = 'posts'
  static fields () {
    return {
      id: this.attr(null),
      postIds: this.attr([]),
      title: this.string(''),
      comments: this.hasManyBy(Comment, 'postId')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, HasManyBy, Str } from 'pinia-plugin-orm/dist/decorators'
import Comment from './Comment'

class Post extends Model {
  static entity = 'posts'

  @Attr(null) declare id: number | null
  @Attr([]) declare postIds: number[]
  @Str('') declare title: string
  @HasManyBy(() => Comment, 'postIds') declare comments: Comment[]
}
```

:::

**Typescript Declarations**

```ts
function hasManyBy(
  related: typeof Model,
  foreignKey: string,
  ownerKey?: string,
): HasManyBy
```

### hasManyThrough

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Comment from './Comment'

class Country extends Model {
  static entity = 'countries'
  static fields () {
    return {
      id: this.attr(null),
      posts: this.hasManyThrough(Post, User, 'country_id', 'user_id')
    }
  }
}
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      country_id: this.attr(null)
    }
  }
}
class Post extends Model {
  static entity = 'posts'
  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null)
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, HasManyThrough, Str } from 'pinia-plugin-orm/dist/decorators'

class Country extends Model {
  static entity = 'countries'
  @Attr() declare id: number
  @HasManyThrough(() => Post, () => User, 'countryId', 'userId')
  declare posts: Post[]
}
class Post extends Model {
  static entity = 'posts'
  @Attr() declare id: number
  @Attr() declare userId: number
  @Str('') declare title: string
}
class User extends Model {
  static entity = 'users'
  @Attr() declare id: number
  @Attr() declare countryId: number
  @Str('') declare name: string
}
```

:::

**Typescript Declarations**

```ts
function hasManyThrough(
  related: typeof Model,
  through: typeof Model,
  firstKey: string,
  secondKey: string,
  localKey?: string,
  secondLocalKey?: string,
): HasManyThrough
```

### hasMany

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Comment from './Comment'
class Post extends Model {
  static entity = 'posts'
  static fields () {
    return {
      id: this.attr(null),
      title: this.string(''),
      comments: this.hasMany(Comment, 'postId')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, HasMany, Str } from 'pinia-plugin-orm/dist/decorators'
import Comment from './Comment'
class Post extends Model {
  static entity = 'posts'

  @Attr(null) declare id: number | null
  @Str('') declare title: string
  @HasMany(() => Comment, 'postId') declare comments: Comment[]
}
```

:::

**Typescript Declarations**

```ts
function hasMany(
  related: typeof Model,
  foreignKey: string | string[],
  localKey?: string | string[],
): HasMany
```

### hasOne

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Phone from './Phone'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      name: this.string(''),
      phone: this.hasOne(Phone, 'userId')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, HasOne, Str } from 'pinia-plugin-orm/dist/decorators'
import Phone from './Phone'
class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @Str('') declare name: string
  @HasOne(() => Phone, 'userId') declare phone: Phone
}
```

:::

**Typescript Declarations**

```ts
function hasOne(
  related: typeof Model,
  foreignKey: string | string[],
  localKey?: string | string[],
): HasOne
```

### morphMany

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Image from './Image'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.number(0),
      name: this.string(''),
      images: this.morphMany(Image, 'imageableId', 'imageableType')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, MorphMany, Str } from 'pinia-plugin-orm/dist/decorators'
import Image from './Image'
class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @Str('') declare name: string
  @MorphMany(() => Image, 'imageableId', 'imageableType') declare images: Image[]
}
```

:::

**Typescript Declarations**

```ts
function morphMany(
  related: typeof Model,
  id: string,
  type: string,
  localKey?: string,
): MorphMany
```

### morphOne

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import Image from './Image'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.number(0),
      name: this.string(''),
      image: this.morphOne(Image, 'imageableId', 'imageableType')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, MorphOne, Str } from 'pinia-plugin-orm/dist/decorators'
import Image from './Image'
class User extends Model {
  static entity = 'users'

  @Attr(null) declare id: number | null
  @Str('') declare name: string
  @MorphOne(() => Image, 'imageableId', 'imageableType') declare image: Image
}
```

:::

**Typescript Declarations**

```ts
function morphOne(
  related: typeof Model,
  id: string,
  type: string,
  localKey?: string,
): MorphOne
```

### morphTo

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
import User from './Image'
import Post from './Post'
class Image extends Model {
  static entity = 'images'
  static fields () {
    return {
      id: this.number(0),
      url: this.string(''),
      imageableId: this.number(0),
      imageableType: this.string(''),
      imageable: this.morphTo(
        [User, Post],
        'imageableId',
        'imageableType'
      )
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, MorphTo, Str } from 'pinia-plugin-orm/dist/decorators'
import User from './Image'
import Post from './Post'
class User extends Model {
  static entity = 'users'

  @Num(0) declare id: number
  @Str('') declare url: string
  @Num(0) declare imageableId: number
  @Str('') declare imageableType: string
  @MorphTo(() => [User, Post], 'imageableId', 'imageableType') declare imageable: Post[] | User[]
}
```

:::

**Typescript Declarations**

```ts
function morphTo(
  related: typeof Model[],
  id: string,
  type: string,
  ownerKey = '',
): MorphTo
```

## Model - Options

### baseEntity

::: warning
This field is required for a class which is inheriting one of the classes defined

Look at [Single Table Inheritance](/model/single-table-inheritance.html) for more detail
:::

**Usage**

```ts
class Adult extends Person {
  static entity = 'adult'

  static baseEntity = 'person'
  static fields () {
    return {
      ...super.fields(),
      job: this.attr('')
    }
  }
}
Copy to clipboard

```

:::

**Typescript Declarations**

```ts
const baseEntity: string = undefined
```

### casts

**Usage**

::: code-group

```ts [String]
import { Model } from 'pinia-plugin-orm'
import { StringCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'
  static fields() {
    return {
      id: this.attr(null),
      firstName: this.string('')
    }
  }

  static casts() {
    return {
      firstName: StringCast
    }

}
```

```ts [Number]
import { Model } from 'pinia-plugin-orm'
import { NumberCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'
  static fields() {
    return {
      id: this.attr(null),
      age: this.number(0)
    }
  }

  static casts() {
    return {
      age: NumberCast
    }
  }
}
```

```ts [Boolean]
import { Model } from 'pinia-plugin-orm'
import { BooleanCast } from 'pinia-plugin-orm/dist/casts'
class User extends Model {
  static entity = 'users'
  static fields() {
    return {
      id: this.attr(null),
      registered: this.boolean(false)
    }
  }

  static casts() {
    return {
      registered: BooleanCast
    }
  }
}
```

```ts [Array]
import { Model } from 'pinia-plugin-orm'
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'
class User extends Model {
  static entity = 'users'
  static fields() {
    return {
      id: this.attr(null),
      meta: this.attr({})
    }
  }

  static casts() {
    return {
      meta: ArrayCast
    }
  }
}
```

```ts [Date]
import { Model } from 'pinia-plugin-orm'
import { StringCast } from 'pinia-plugin-orm/dist/casts'
class User extends Model {
  static entity = 'users'
  static fields() {
    return {
      updated: this.attr(''),
    }
  }
  static casts() {
    return {
      updated: DateCast,
    }
  }
}
```

```ts [With Decorator]
import { Model } from 'pinia-plugin-orm'
import { Attr, Cast } from 'pinia-plugin-orm/dist/decorators'
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'
class User extends Model {
  static entity = 'users'
  @Cast(() => ArrayCast) @Attr('{}') declare meta: Record<string, any>
}
```

:::

**Typescript Definition**

```ts
export interface Casts {
  [name: string]: typeof CastAttribute
}
function casts(): Casts
```

### config

**Usage**

```ts
class User extends Model {
  static entity = 'users'

  // activate meta data to be saved with this model
  static config = {
      withMeta: true
  }
  static fields () {
    return {
      id: this.uid()
    }
  }
}
```

**Typescript Definition**

```ts
export interface ModelConfigOptions {
  withMeta?: boolean
  hidden?: string[]
  visible?: string[]
}
const config: ModelConfigOptions = undefined
```

### entity

:::warning
This field is required and must be set in every model
:::

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null)
    }
  }
}
```

**Typescript Declarations**

```ts
const entity: string = undefined
```

### hidden

::: warning
Don't hide the id or you won't find any record ;-)
:::

**Usage**

::: code-group

```ts [Standard methods]
class User extends Model {
  static entity = 'users'

  // only return fields "name" and "phone" for this model by default
  static hidden = ['secret']
  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      phone: this.number(0),
      secret: this.string('')
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, Hidden, Uid } from 'pinia-plugin-orm/dist/decorators'
class User extends Model {
  static entity = 'users'
  @Uid() declare id: string
  @Attr('{}') declare name: string
  @Hidden() @Attr('{}') declare secret: string
}
```

:::

**Typescript Declarations**

```ts
const visible: hidden[] = []
```

### mutators

**Usage**

::: code-group

```ts [Standard methods]
import { Model } from 'pinia-plugin-orm'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      firstName: this.attr(''),
      lastName: this.attr('')
    }
  }
  static mutators() {
    return {
      firstName: {
        get: (value: any) => value.toLowerCase(),
        set: (value: any) => value.toUpperCase(),
      },
      lastName(value: any) => value.toLowerCase()
    }
  }
}
```

```ts [Decorator Method]
import { Model } from 'pinia-plugin-orm'
import { Attr, Mutate } from 'pinia-plugin-orm/dist/decorators'
class User extends Model {
  static entity = 'users'
  @Mutate((value: any) => value.toUpperCase()) @Str('') declare name: string
}
```

:::

**Typescript Declarations**

```ts
export type Mutator<T> = (value: T) => T
export interface MutatorFunctions<T> {
  get?: Mutator<T>
  set?: Mutator<T>
}
export interface Mutators {
  [name: string]: MutatorFunctions<any> | Mutator<any>
}
function mutators(): Mutators
```

### piniaOptions

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null)
    }
  }
  static piniaOptions = {
    persist: true
  }
}
```

**Typescript Declarations**

```ts
const piniaOptions: DefineStoreOptionsBase<DataStoreState, DataStore>  = {}
```

### primaryKey

::: tip NOTE
By default, the field id is used as primary key.
:::

**Usage**

::: code-group

```ts [simple]
class User extends Model {
  static entity = 'users'
  static primaryKey = 'userId'
  static fields () {
    return {
      userId: this.attr(null)
    }
  }
}
```

```ts [combined]
class RoleUser extends Model {
  static entity = 'roleUser'
  static primaryKey = ['role_id', 'user_id']
  static fields () {
    return {
      role_id: this.attr(null),
      user_id: this.attr(null)
    }
  }
}
```

:::

**Typescript Declarations**

```ts
const primaryKey: string | string[] = 'id'
```

### typeKey

Look at [Single Table Inheritance](/model/single-table-inheritance.html) for more detail

**Usage**

```ts
import Person from './models/Person'
import Adult from './models/Adult'
import { Model } from 'pinia-plugin-orm'
class User extends Model {
  static entity = 'users'

  static typeKey = 'person_type'
  static types () {
    return {
      PERSON: Person,
      ADULT: Adult
    }
  }
  static fields () {
    return {
      id: this.uid(),
      name: this.string()
    }
  }
}
```

**Typescript Declarations**

```ts
const typeKey: string = 'type'
```

### types

:::tip NOTE
Look at [Single Table Inheritance](/model/single-table-inheritance.html) for more detail
:::

**Usage**

```ts
class Person extends Model {
  static entity = 'person'
  static types () {
    return {
      PERSON: Person,
      ADULT: Adult
    }
  }
  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}
```
**Typescript Declarations**

```ts
export interface InheritanceTypes {
  [key: string]: typeof Model
}
function $types(): InheritanceTypes
```

### visible

::: tip NOTE
The primary key of the model will always be added to the visible list so the record can still be find.
:::

**Usage**

```ts
class User extends Model {
  static entity = 'users'

  // only return fields "name" and "phone" for this model by default
  static visible = ['name', 'phone']
  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      phone: this.number(0),
      secret: this.string('')
    }
  }
}
```

**Typescript Declarations**

```ts
const visible: string[] = []
```

## Model - Hooks

### created

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static created (model, record) {
      // check value saved
    console.log(model.published)
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface AfterHook<M extends Model = Model> {
  (model: M, record?: Element): void
}
const created: AfterHook = () => {}
```

### creating

**Usage**

```ts
class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }

  static creating (model, record) {
      // change values before saving
    model.published = true
    if (model.userId === 2) {
        // prevent model with userId 2 being saved in the store
        return false
    }
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface BeforeHook<M extends Model = Model> {
  (model: M, record?: Element): void | boolean
}

const creating: BeforeHook = () => {}
```

### deleted

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static deleted (model) {
      // check value saved
    console.log(model.published)
  }
}
```

**Typescript Declarations**

```ts
export interface AfterHook<M extends Model = Model> {
  (model: M): void
}
const deleted: AfterHook = () => {}
```

### deleting

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static deleting (model) {
      // change values before saving
    model.published = true
    if (model.userId === 2) {
        // prevent model with userId 2 being saved in the store
        return false
    }
  }
}
```

**Typescript Declarations**

```ts
export interface BeforeHook<M extends Model = Model> {
  (model: M): void | boolean
}
const deleting: BeforeHook = () => {}
```

### retrieved

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static retrieved (model) {
      // check value saved
    console.log(model.published)
  }
}
```

**Typescript Declarations**

```ts
export interface AfterHook<M extends Model = Model> {
  (model: M): void
}
const retrieved: AfterHook = () => {}
```

### saved

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static saved (model, record) {
      // check value saved
    console.log(model.published)
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface AfterHook<M extends Model = Model> {
  (model: M, record?: Element): void
}
const saved: AfterHook = () => {}
```

### saveing

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static saving (model, record) {
      // change values before saving
    model.published = true
    if (model.userId === 2) {
        // prevent model with userId 2 being saved in the store
        return false
    }
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface BeforeHook<M extends Model = Model> {
  (model: M, record?: Element): void | boolean
}
const saving: BeforeHook = () => {}
```

### updated

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static updated (model, record) {
    // check value saved
    console.log(model.published)
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface AfterHook<M extends Model = Model> {
  (model: M, record?: Element): void
}
const updated: AfterHook = () => {}
```

### updating

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      userId: this.attr(null),
      published: this.attr(false)
    }
  }
  static updating (model, record) {
      // change values before saving
    model.published = true
    if (model.userId === 2) {
        // prevent model with userId 2 being saved in the store
        return false
    }
    // check original data
    console.log(record)
  }
}
```

**Typescript Declarations**

```ts
export interface BeforeHook<M extends Model = Model> {
  (model: M, record?: Element): void | boolean
}
const updating: BeforeHook = () => {}
```

## Model - Function

### $getAttributes()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
  @HasMany(() => Post, 'userId') declare posts: Post[]
}
const user = new User({ id: 1, name: 'Elone Hoo', posts: [{ id: 1, title: 'Merry Christmas' }] })
user.$getAttributes()
// {
//    id: 1,
//    name: 'Elone Hoo',
// }
```

**Typescript Declarations**

```ts
function $getAttributes(): Element
```

### $getIndexId()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.$getIndexId()
// -> '1'
```

**Typescript Declarations**

```ts
function $getIndexId(record?: Element): string
```

### $getKeyName()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.$getKeyName()
// -> 'id'
```

**Typescript Declarations**

```ts
function $getKeyName(): string | string[]
```

### $getKey()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.$getKey()
// -> 1
```

**Typescript Declarations**

```ts
function $getKey(record?: Element): string | number | (string | number)[] | null
```

### $getLocalKey()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.$getLocalKey()
// -> 'id'
```

**Typescript Declarations**

```ts
function $getLocalKey(): string
```

### $getOriginal()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.name = 'Vue JS Amsterdam'
user.$getOriginal()
// {
//    id: 1,
//    name: 'Elone Hoo',
// }
console.log(user.name)
// 'Vue JS Amsterdam'
```

**Typescript Declarations**

```ts
function $getOriginal(): Element
```

### $hasCompositeKey()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
user.$hasCompositeKey()
// -> false
```

**Typescript Declarations**

```ts
function $hasCompositeKey(): boolean
```

### $isDirty()

**Usage**

```ts
class User extends Model {
  static entity = 'users'
  @Attr('') declare id: number
  @Str('') declare name: string
}
const user = new User({ id: 1, name: 'Elone Hoo' })
// Returns false
user.$isDirty()
user.name = 'HuChengYe'
// Returns true
user.$isDirty()
// Returns true
user.$isDirty('name')
// Returns false
user.$isDirty('id')
// Throws an error because you are checking a not existing attribute of `User`
user.$isDirty('lastName')
```

**Typescript Declarations**

```ts
function $isDirty($attribute?: keyof ModelFields): Boolean
```

### $refresh()

**Usage**

```ts
class User extends Model {
  static entity = 'users'

  @Attr('') declare id: number
  @Str('') declare name: string
}

const user = new User({ id: 1, name: 'Elone Hoo' })

user.name = 'Vue JS Amsterdam'

console.log(user.name)
// 'Vue JS Amsterdam'

user.$refresh()

console.log(user.name)
// 'Elone Hoo'
```

**Typescript Declarations**

```ts
function $refresh(): Model
```

### $toJson()

**Usage**

```ts
class User extends Model {
  static entity = 'users'

  @Attr('') declare id: number
  @Str('') declare name: string
  @HasMany(() => Post, 'userId') declare posts: Post[]
}

const user = new User({ id: 1, name: 'Elone Hoo', posts: [{ id: 1, title: 'Merry Christmas' }] })

user.$toJson()
// {
//    id: 1,
//    name: 'Elone Hoo',
//    posts: [{ id: 1, title: 'Merry Christmas' }],
// }
```

**Typescript Declarations**

```ts
function $toJson(model?: Model, options: ModelOptions = {}): Element
```

## Query

### all()

:::warning
The difference with the `get` is that this method will not process any query chain. It'll always retrieve all models.
:::

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)
const users = userRepo.query().all() // User[] - all
const usersPreName = userRepo.where('prename', 'John').all() // User[] - still all User !
Copy to clipboard
```

**Typescript Declarations**

```ts
function all(): Collection<M>
```

### delete()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.where('name', 'Elone').delete()) // User
```

**Typescript Declarations**

```ts
function delete(): Model[]
```

### destroy()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.destroy(1)) // User
console.log(userRepo.destroy([1,2,5])) // User[]
```

::: tip
If you want also relations to be deleted with the deleted record look at [Deleting Relationships](/repository/deleting-data.html)
:::

**Typescript Declarations**

```ts
function destroy(id: string | number): Item<M>
function destroy(ids: (string | number)[]): Collection<M>
```

### doesntHave()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Retrieve all posts that have no comments
useRepo(User).doesntHave('comments').get()
```

**Typescript Declarations**

```ts
function doesntHave(relation: string): Query
```

### find()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.find(1)) // User
console.log(userRepo.find([1,2,5])) // User[]
```

**Typescript Declarations**

```ts
function find(id: string | number): Item<M>
function find(ids: (string | number)[]): Collection<M>
```

### first()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.where('prename', 'Elone').first()) // User - with prename 'Elone'
```

**Typescript Declarations**

```ts
function first(): Item<M>
```

### get()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

const users = userRepo.query().get() // User[] - all
const usersPreName = userRepo.where('prename', 'Elone').get() // User[] - with prename 'Elone'
```

**Typescript Declarations**

```ts
function get(): Collection<M>
```

### groupBy()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Group users by name.
useRepo(User).groupBy('name').get()

// You may also pass multiple columns
useRepo(User).groupBy('name', 'age').get()
```

**Typescript Declarations**

```ts
function groupBy(...fields: GroupByFields): Query
```

### has()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Retrieve all posts that have at least one comment.
useRepo(User).has('comments').get()
// Retrieve all posts that have at least 2 comments.
useRepo(User).has('comments', 2).get()
// Retrieve all posts that have more than 2 comments.
useRepo(User).has('comments', '>', 2).get()
```

**Typescript Declarations**

```ts
function has(relation: string, operator?: string | number, count?: number): Query
```

### limit()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Return only 30 users
useRepo(User).limit(30).get()
```

**Typescript Declarations**

```ts
function limit(value: number): Query
```

### load()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

const users = userRepo.all()

// eager load "coomments" relation  for all users
userRepo.with('comments').load(users)
// eager load "coomments" relation with closure  for all users
userRepo.with('comments', (query) => {
    query.where('active', true)
}).load(users)
```

**Typescript Declarations**

```ts
function load(models: Collection<M>): void
```

### makeHidden()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Returns User without the field 'phone'
userRepo.makeHidden(['phone']).first()
```

**Typescript Declarations**

```ts
function makeHidden(fields: string[]): Query
```

### makeVisible()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Returns User with hidden field 'secret'
userRepo.makeVisible(['secret']).first()
```

**Typescript Declarations**

```ts
function makeVisible(fields: string[]): Query
```

### offset()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Remove the last 30 users
useRepo(User).offset(30).get()
```

**Typescript Declarations**

```ts
function offset(value: number): Query
```

### orDoesntHave()

**Usage**

Same as [doesntHave usage](/api/#doesnthave) just with "or" condition

**Typescript Declarations**

```ts
function orDoesntHave(relation: string): Query
```

### orHas()

**Usage**

Same as [has usage](/api/#has) just with "or" condition

**Typescript Declarations**

```ts
function orHas(relation: string, operator?: string | number, count?: number): Query
```

### orWhereDoesntHave()

**Usage**

Same as [whereDoesntHave usage](/api/#whereDoesntHave) just with "or" condition

**Typescript Declarations**

```ts
function orWhereDoesntHave(
    relation: string,
    callback: EagerLoadConstraint = () => {}
): Query
```

### orWhereHas()

**Usage**

Same as [whereHas usage](/api/#whereHas) just with "or" condition

**Typescript Declarations**

```ts
function orWhereHas(
    relation: string,
    callback: EagerLoadConstraint = () => {},
    operator?: string | number,
    count?: number
): Query
```

### orWhere()

**Usage**

Same as [where usage](/api/#where) just with "or" condition

**Typescript Declarations**

```ts
function orWhere(
  field: WherePrimaryClosure | string,
  value?: WhereSecondaryClosure | any,
): Query
```

### orderBy()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Order users by name.
useRepo(User).orderBy('name').get()

// You may also chain orderBy.
useRepo(User)
  .orderBy('name')
  .orderBy('age', 'desc')
  .get()

// Sort user name by its third character.
useRepo(User).orderBy(user => user.name[2]).get()
```

**Typescript Declarations**

```ts
function orderBy(field: OrderBy, direction: OrderDirection = 'asc'): Query
```

### useCache()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

// Generate a cache with a auto generated key.
useRepo(User).useCache().get()

// Generate a cache with a manual key (recommanded).
useRepo(User).useCache('key').get()

// Generate a cache with a manual key and dynamic params (recommanded).
useRepo(User).useCache('key', { id: idProperty }).get()
```

**Typescript Declarations**

```ts
function useCache(key?: string, params?: Record<string, any>): Query
```

### whereDoesntHave()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'
const userRepo = useRepo(User)
// Retrieve all posts that doesnt have comment from userId 1.
useRepo(Post).whereDoesntHave('comments', (query) => {
  query.where('userId', 1)
}).get()
```

**Typescript Declarations**

```ts
function whereDoesntHave(
    relation: string,
    callback: EagerLoadConstraint = () => {}
): Query
```

### whereHas()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'
const userRepo = useRepo(User)
// Retrieve all posts that have comment from userId 1.
useRepo(Post).whereHas('comments', (query) => {
  query.where('userId', 1)
}).get()
```

**Typescript Declarations**

```ts
function whereHas(
    relation: string,
    callback: EagerLoadConstraint = () => {},
    operator?: string | number,
    count?: number
): Query
```

### whereId()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.whereId(1).get()) // User[]
console.log(userRepo.whereId([1,2,5]).get()) // User[]
```

**Typescript Declarations**

```ts
function whereId(ids: string | number | (string | number)[]): Query
```

### whereIn()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Filter by array
console.log(userRepo.query().whereIn('commentIds', [1,2,5]).get())
// Filter by Set
console.log(userRepo.query().whereIn('commentIds', new Set([1,2,5])).get())
```

**Typescript Declarations**

```ts
function whereIn(field: string, values: any[]|Set): Query
```

### where()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

console.log(userRepo.where('prename', 'Elone').get()) // User[] - with prename 'Elone'
// with value closure
console.log(useRepo(User).where('votes', (value) => {
  return value >= 100
}).get())
// with where closure
console.log(userRepo.where((user: User) => {
  return user.votes >= 100 && user.active
}).get()) // User[]
```

### withAllRecursive()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

const users = userRepo.withAllRecursive().get() // User[] with all its nested relations 3 levels deep
const usersWithRelations = userRepo.withAllRecursive(2).get() // User[] with all its nested relations 2 levels deep
```

**Typescript Declarations**

```ts
function withAllRecursive(depth = 3): Query
```

### withAll()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

const usersWithComments = userRepo.withAll().get() // User[] with all its relations loaded
// with closure
const usersWithCommentsOnlyActive = userRepo.withAll((query) => {
    query.where('active', true)
}).get() // User[] with comments which are active. Don't forget that you still get all Users just with less relations
```

**Typescript Declarations**

```ts
function withAll(callback: EagerLoadConstraint = () => {}): Query
```

### withMeta()

`_meta` is only filled if you have defined in your model `static config = { model: { withMeta = true } }` or globally set by configuration

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// gives you access to the default hidden prop '_meta'
userRepo.withMeta().first()
```

**Typescript Declarations**

```ts
function withMeta(): Query
```

### with()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

const usersWithComments = userRepo.with('comments').get() // User[] with comments relations
// with closure
const usersWithCommentsOnlyActive = userRepo.with('comments', (query) => {
    query.where('active', true)
}).get() // User[] with comments which are active. Don't forget that you still get all Users just with less comments
```

**Typescript Declarations**

```ts
function with(name: string, callback: EagerLoadConstraint = () => {}): Query
```

## Repository

### cache()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

// Returns the cache instance
useRepo(User).cache()
```

**Typescript Declarations**

```ts
function cache(): WeakCache
```

### make()

:::tip
This method will not save the model to the store. It's pretty much the alternative to `new Model()`, but it injects the store instance to support model instance methods in SSR environment.
:::

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Make a model with default values
userRepo.make()

// Make a model with values
userRepo.make({
  id: 1,
  name: 'Elone Hoo',
})

// Make many models with values
userRepo.make([
  {
    id: 1,
    name: 'Elone Hoo',
  },
  {
    id: 2,
    name: 'elonehoo',
  },
])
```

**Typescript Declarations**

```ts
function make(records?: Element | Element[]): M | M[]
```

### new()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)

// Make a model with default values
userRepo.new()
```

**Typescript Declarations**

```ts
function new(): Model | null
```

### piniaStore()

**Usage**

```ts
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

// Return the complete pinia Store instance
useRepo(User).piniaStore()
```

**Typescript Declarations**

```ts
export interface DataStoreState {
  data: Record<string, any>
  [s: string]: any
}

function piniaStore<S extends DataStoreState = DataStoreState>(): Store
```

## Configuration

**model**

| Option | Default | Description |
| :----- | :------ | :---------- |
| withMeta | false | Activates the _meta field to be saved for every model |
| visible | [*] | Sets default visible fields for every model |
| hidden | [ ] | Sets default hidden fields for every model |

**cache**

| Option | Default | Description |
| :----- | :------ | :---------- |
| provider | Weakcache | Defines which cache provider should be used |
| shared | true | Activates the cache to be shared between all repositories |

**Typescript Declarations**

```ts
export interface ModelConfigOptions {
  withMeta?: boolean
  hidden?: string[]
  visible?: string[]
}
export interface CacheConfigOptions {
  shared?: boolean
  provider?: typeof WeakCache<string, Model[]>
}
export interface InstallOptions {
  model?: ModelConfigOptions
  cache?: CacheConfigOptions | boolean
}
const options: InstallOptions
```
