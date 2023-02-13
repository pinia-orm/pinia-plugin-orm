---
title: Inserting Data | Repository
outline: deep
---

# Inserting Data

::: tip NOTE
You may insert new data or update existing data through various repository methods. All data created through Pinia ORM gets persisted in Pinia Store.

This section assumes you're familiar with the usage of repository. If not, please read through [Repository Reference](./index) first.
:::

## Inserting Data

You may use the `save` method on a repository to insert data. The save method accepts an object of field and value pairs.

```ts
useRepo(User).save({ id: 1, name: 'Elone Hoo' })
```

You may also pass an array of objects to update multiple records at once.

```ts
useRepo(User).save([
  { id: 1, name: 'elonehoo' },
  { id: 2, name: 'Elone Hoo' }
])
```

The `save` method will "normalize" the given data. That means if you pass an object that contains any nested relationships, those relationships are also inserted. Please see [Repository Reference](./index) for more details about data normalization.

The `save` method returns new model instances.

```ts
const user = useRepo(User).save({ id: 1, name: 'Elone Hoo' })
/*
  User { id: 1, name: 'Elone Hoo' }
*/
```

When passing in an array of data, it returns an array of new model instances.

```ts
const users = useRepo(User).save([
  { id: 1, name: 'Elone Hoo' },
  { id: 2, name: 'elonehoo' }
])
/*
  [
    User { id: 1, name: 'Elone Hoo' },
    User { id: 2, name: 'elonehoo' }
  ]
*/
```

If you insert data containing relationships, all of them would be instantiated as a new model instances and returned. Here is an example where a user "has many" posts.

```ts
const user = useRepo(User).save({
  id: 1,
  name: 'Elone Hoo',
  posts: [
    { id: 1, userId: 1, title: 'Title A' },
    { id: 2, userId: 2, title: 'Title B' }
  ]
})
/*
  User {
    id: 1,
    name: 'Elone Hoo',
    posts: [
      Post { id: 1, userId: 1, title: 'Title A' },
      Post { id: 2, userId: 2, title: 'Title B' }
    ]
  }
*/
```

## Inserting Data Without Normalization

If you don't need the data to be normalized, you may use insert method to insert data. The `insert` method will ignore any relationships, and returns a new model instance.

```ts
const user = useRepo(User).insert({ id: 1, name: 'Elone Hoo' })
// User { id: 1, name: 'Elone Hoo' }
```

You may also pass an array of records to the `insert` method. In that case, the returned value will be an array of model instances.

```ts
const users = useRepo(User).insert([
  { id: 1, name: 'Elone Hoo' },
  { id: 2, name: 'elonehoo' }
])
/*
  [
    User { id: 1, name: 'Elone Hoo' },
    User { id: 2, name: 'elonehoo' }
  ]
*/
```

## Inserting Data With Default Values

When you pass an empty object or array to the `save` or `insert` method, it will do nothing. If you want to insert fresh data with all fields being default values, you may use `new` method. The `new` method will create a record with all fields filled with default values defined in the model.

```ts
const user = useRepo(User).new()
// User { id: '$uid1', name: '' }
```

To use the `new` method, you must ensure you have defined the model's primary key field as [uid](/model/#uid-type) type attribute, or else it will throw an error.

## Replacing Whole Data

When inserting data, you may use `fresh` method to replace whole existing records with the newly passed in data. It's pretty much equivalent to first delete all records, then inserting new data. The `fresh` method will ignore any relationships.

```ts
// Existing data.
{
  1: { id: 1, name: 'Elone Hoo' },
  2: { id: 2, name: 'elonehoo' }
}
// Replace whole data with the new data.
useRepo(User).fresh({ id: 3, name: 'Elone Hoo' })
// The result.
{
  3: { id: 3, name: 'Elone Hoo' }
}
```

And of course, you may pass an array of records as well.

```ts
useRepo(User).fresh([
  { id: 3, name: 'Elone Hoo' },
  { id: 4, name: 'elonehoo' }
])
```

## Creating a model instance

Sometimes, you may want to create a new model instance without actually persisting the model data to the store. You may use the `make` method to create a fresh model instance in such a case.

```ts
const user = useRepo(User).make()
```

You may also pass default values as an object.

```ts
const user = useRepo(User).make({
  name: 'Elone Hoo',
  age: 30
})
```

You can even create multiple at one.

```ts
const users = useRepo(User).make([
  {
    id: 1,
    name: 'elonehoo',
  },
  {
    id: 2,
    name: 'Elone Hoo',
  },
])
```
