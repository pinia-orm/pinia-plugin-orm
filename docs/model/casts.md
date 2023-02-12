---
title: Casts | Model
outline: deep
---

# Casts

## Defining Casts

Attribute casting provides functionality similar to accessors and mutators without requiring you to define any additional methods on your model.

Supported casts are:

- `StringCast`
- `NumberCast`
- `BooleanCast`
- `ArrayCast`
- `DateCast`

### via casts method

```ts
import { StringCast } from 'pinia-plugin-orm/dist/casts'
class User extends Model {
  static entity = 'users'
  static fields () {
    return {
      id: this.attr(null),
      firstName: this.string(''),
      lastName: this.string('')
    }
  }

  static casts () {
      return {
          firstName: StringCast,
          lastName: StringCast,
      }
  }
}
const user = useRepo(User).save({
  firstName: 'Elone',
  lastName: 1234
})
console.log(user.lastName) // '1234'
```

### via decorator

```ts
import { ArrayCast } from 'pinia-plugin-orm/dist/casts'

class User extends Model {
  static entity = 'users'
  @Cast(() => ArrayCast)
  @Attr('{}') declare meta: Record<string, any>
}

// { name: 'Elone', age: 22, car: null }
console.log(new User({ meta: '{"name":"Elone", "age":22, "car":null}' }).meta)
```

If you like decorators you can also use the [`Cast` decorator]() to apply a cast to a value.

## Defining Custom Casts

Pina ORM gives you also the possibility to define your own cast and use them.

### via casts method

```ts
class CustomCast extends CastAttribute {
  get(value?: any): any {
    return typeof value === 'string' ? `string ${value}` : value
  }
  set(value?: any): any {
    return this.get(value)
  }
}
class User extends Model {
  static entity = 'users'
  @Attr('{}') declare name: string
  static casts() {
    return {
      name: CustomCast,
    }
  }
}
console.log(new User({ name: 'Elone' }).name) // 'string Elone'
```

### via decorator

```ts
class CustomCast extends CastAttribute {
  get(value?: any): any {
    return typeof value === 'string' ? `string ${value}` : value
  }
  set(value?: any): any {
    return this.get(value)
  }
}
class User extends Model {
  static entity = 'users'
  @Cast(() => CustomCast) @Attr('test') declare name: string
}
console.log(new User({ name: 'Elone' }).name) // 'string Elone'
```

### with parameters

Yon can also define casts where you pass custom parameters to change the behaviour

```ts
class CustomCast extends CastAttribute {
  static parameters = {
    type: 'string',
  }
  get(value?: any): any {
    const type = this.getParameters().type
    return typeof value === type ? `${type} ${value}` : value
  }
  set(value?: any): any {
    return this.get(value)
  }
}
class User extends Model {
  static entity = 'users'
  @Attr('{}') declare name: string
  static casts() {
    return {
      name: CustomCast.withParameters({ type: 'number' }),
    }
  }
}
console.log(new User({ name: 'Elone' }).name) // 'Elone'
console.log(new User({ name: 1 }).name) // 'number 1'
```

