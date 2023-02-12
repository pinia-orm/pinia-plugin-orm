---
title: Single Table Inheritance | Model
outline: deep
---

# Single Table Inheritance

::: tip NOTE
Pinia ORM supports Single Table Inheritance (STI) or Sub-classing through ES6 extension (use of the `class ... extends ...` syntax). STI is a way to emulate object-oriented inheritance in a relational database. If you're coming from Ruby on Rails land, you may be familiar with it.

Basically, it will allow you to get different Model instance based on types of records in the same entity. For example, you might have `users` entity, and you could have a field called `type` and it could be `Person`, `Adult`, or `Child`. Now, when you fetch these records, sometime it's useful if we can get each type in its own Model instance. Here is where STI comes in to play nicely.
:::

## Inheritance Conventions

In order to define inheritance in Pinia ORM, you need to follow some conventions. On each sub-entity of your hierarchy, you'll need to:

1. Make sure the sub-entity class extends another Pinia ORM Model class.

2. Add a reference to the base entity name along with the static `entity` reference.

3. Call `super.fields()` in the `static fields` method to make sure to merge the sub-entity fields with the base one.

```ts
// Base entity.
class Person extends Model {
  static entity = 'person'
  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }
}

// Derived entity. You should extend the base entity.
class Adult extends Person {
  static entity = 'adult'
  // Call `super.fields()`` to merge fields.
  static fields () {
    return {
      ...super.fields(),
      job: this.attr('')
    }
  }
}
```

## Interacting with Data

Once you defined a sub-class, you can `insert` / `create` / `update` / `get` / `delete` entities using the Model static methods. For instance, to create or insert data:

```ts
useRepo(Adult).insert({
  data: { id: 1, name: 'Elone Hoo', job: 'Software Engineer' }
})
```

And to fetch data:

```ts
const adults = useRepo(Adult).all()
/*
[
  Adult { id: 1, name: 'Elone Hoo', job: 'Software Engineer' },
  Adult { id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
]
*/
```

You can also fetch mixed results using the base entity getter:

```ts
const people = useRepo(Person).all()
/*
[
  Person { id: 1, name: 'Elone Hoo' },
  Adult { id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
]
*/
```

However, using only these, you need to use the sub-entity methods (like Adult.insert in our example) if you want to insert sub-entity. If you want to deal with mixed data from the same hierarchy, you may use a "Discriminator Field" to dispatch entity using the base entity methods.

## Discriminator Field

When defining an inheritance model, one can use a discriminator field to dispatch entities based on this field value when inserting data using the base entity `insert` or `create` method.

By default, the entity field used as a discriminator field is the `type` field. A `static` types method also needs to be defined on the base entity. This method should return the mapping between discriminator field value and Model reference.

```ts
// Base entity.
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
// Derived entity.
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
```

::: tip NOTE
If you import Models from other files, you might get circular reference error. Please take a look at [this section](/model/single-table-inheritance.html#single-table-inheritance) for more detail and how to avoid it.
:::

Now, you can create mixed types of records at once.

```ts
// Creating mixed data.
useRepo(Person).insert({
  data: [
    { type:'PERSON', id: 1, name: 'Elone Hoo' },
    { type:'ADULT', id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
  ]
})
const people = useRepo(Person).all()
/*
[
  Person { id: 1, name: 'Elone Hoo' },
  Adult { id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
]
*/
```

### Discriminator Field Override

You may define a `static` typeKey on the base entity of your hierarchy if you want to change the default discriminator field name.

```ts
// Base entity.
class Person extends Model {
  static entity = 'person'
  static typeKey = 'person_type'
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
// Derived entity.
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
```

And now you may use a custom `type` field when inserting data.

```ts
useRepo(Person).insert({
  data: [
    { person_type: 'PERSON', id: 1, name: 'Elone Hoo' },
    { person_type: 'ADULT', id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
  ]
})
const people = useRepo(Person).all()
/*
[
  Person { id: 1, name: 'Elone Hoo' },
  Adult { id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
]
*/
```

### Exposing the Discriminator Field

Note that if the `static fields` method doesn't expose the discriminator field (default or custom one), it will not be exposed in the results when fetching data. If you want to be able to read the discriminator field, you'll need to add it to the `fields` method **on the base entity** :

```ts
// Base entity.
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
      name: this.attr(''),
      // Exposing the discriminator field.
      type: this.attr('PERSON')
    }
  }
}
// Derived entity.
class Adult extends Person {
  static entity = 'adult'
  static baseEntity = 'person'
  static fields () {
    return {
      ...super.fields(),
      job: this.attr(''),
      // necessary fallback if you use the childRepo directly without type
      type: this.attr('ADULT')
    }
  }
}
```

Then you can fetch the key with its results.

```ts
// Creating mixed data
useRepo(Person).insert({
  data: [
    { type:'PERSON', id: 1, name: 'Elone Hoo' },
    { type:'ADULT', id: 2, name: 'Elone Hoo', job: 'Software Engineer' }
  ]
})
const people = useRepo(Person).all()
/*
[
  Person { id: 1, name: 'Elone Hoo', type: 'PERSON' },
  Adult { id: 2, name: 'Elone Hoo', job: 'Software Engineer', type: 'ADULT' }
]
*/
```

## Relationship Handling

Inheritance handles relation as any field:

- If the relation is defined on the base entity, it will be inherited by all sub-entities.

- If the relation is defined on a derived entity, only instances of this entity will be able to have related data.

Querying related data using the with keyword (see [this page]()) will fill the blank only when needed, particularly if you call the base entity getter with relation names specific to a sub-class.

```ts
class Person extends Model {
  static entity = 'person'
  static fields () {
    return {
      id: this.attr(null),
      home_address_id: this.attr(null),
      name: this.attr(''),
      home_address: this.belongsTo(Address, 'home_address_id'),
    }
  }
}
class Adult extends Person {
  static entity = 'adult'
  static baseEntity = 'person'
  static fields() {
    return {
      ...super.fields(),
      work_address_id: this.attr(null),
      job: this.attr(''),
      work_address: this.belongsTo(Address, 'work_address_id'),
    }
  }
}
class Address extends Model {
  static entity = 'address'
  static fields () {
    id: this.attr(null),
    city: this.string()
  }
}
```

And let's see what would happen in this case.

```ts
useRepo(Address).insert({
  data: [
    { id: 1, city: 'TOKYO' },
    { id: 2, city: 'PARIS' },
    { id: 3, city: 'BERLIN' }
  ]
})
useRepo(Person).insert({
  data: { id: 1, home_address_id: 1, name: 'Elone Hoo' }
})
useRepo(Adult).insert({
  data: { id: 2, home_address_id: 2, work_address_id: 3, name: 'Elone Hoo', job: 'Software Engineer' }
})
const people = useRepo(Person).query().with(['home_address', 'work_address']).get()
/*
[
  Person {
    id: 1,
    home_address_id: 1,
    name: 'Elone Hoo',
    home_address: Address { id: 1, city: 'TOKYO' },
  },
  Adult {
    id: 2,
    home_address_id: 2,
    work_address_id: 3,
    name: 'Elone Hoo',
    job: 'Software Engineer',
    home_address: Address { id: 2, city: 'PARIS' },
    work_address: Address { id: 3, city: 'BERLIN' }
  }
]
*/
```

## Example with decorators

If you are using decorators you need to use `...super.schemas[super.entity]` instead of `...super.fields()`.


```ts
class Animal extends Model {
  static entity = 'animals'
  @Attr(null) declare id: number | null
  @Attr('animal') declare type: string
  static types() {
    return {
      animal: Animal,
      dog: Dog,
    }
  }
}

class Dog extends Animal {
  static entity = 'dogs'
  static baseEntity = 'animals'
  static fields() {
    return {
      ...super.schemas[super.entity],
    }
  }
  @Attr('dog') declare type
  @Attr('terrier') declare race: string
}
```
