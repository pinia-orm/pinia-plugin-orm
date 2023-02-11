# Why Plugin

::: tip NOTE
It assumes you have a basic understanding of Pinia. If you are not familiar with Pinia, please visit the [Pinia Documentation](https://pinia.vuejs.org) to learn more.
:::

## Why do we need a client-side ORM?

Many applications deal with data that is nested or relational in nature. For example, a blog editor could have many posts, each post may have many comments, and both posts and comments could be written by any number of users. Deeply nested data structures creates many challenges for JavaScript applications, especially when using a single tree state management system such as [Pinia](https://pinia.vuejs.org) or [Redux](https://redux.js.org) .

To handle such data nicely, one approach splits the nested data into separate modules and decouples them from each other. Simply put, it treats a portion of your store like a normalized database with a flattened data structure.

[This excellent article](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape/) describes the difficulty of nested data. It also explains how to design a normalized state, and Vuex ORM is heavily inspired by it.

Note that in this documentation, we borrow many examples and texts from the article. We would like to credit [Redux](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape) and the author of the section [Mark Erikson](https://twitter.com/acemarke) for the beautiful article.

## Issues with Nested Relational Data

Let's look at a typical example of fetching post data from a backend server. The response usually looks something like this:

```ts
[
  {
    id: 1,
    body: '.....',
    author: { id: 1, name: 'User 1' },
    comments: [
      {
        id: 1,
        comment: '.....',
        author: { id: 2, name: 'User 2' }
      },
      {
        id: 2,
        comment: '.....',
        author: { id: 2, name: 'User 2' }
      }
    ]
  },
  {
    id: 2,
    author: { id: 2, name: 'User 2' },
    body: '.....',
    comments: [
      {
        id: 3,
        comment: '.....',
        author: { id: 3, name: 'User 3' }
      },
      {
        id: 4,
        comment: '.....',
        author: { id: 1, name: 'User 1' }
      },
      {
        id: 5,
        comment: '.....',
        author: { id: 3, name: 'User 3' }
      }
    ]
  }
  // And so on...
]
```

Notice that the structure is a bit complex, and contains duplicate author data for *User 3*. If we save this data to the store as-is, we are presented with several concerns:

- Data is duplicated in several places, and it is harder to ensure an update reaches every location.
- Nested data means that the corresponding logic to process this data is more complex. Trying to handle deeply nested fields becomes very ugly, very fast.

To deal with these challenges, a recommended approach is to treat a portion of your store as if it were a database, and keep that data in a normalized form.

## How Pinia ORM Handles Data
