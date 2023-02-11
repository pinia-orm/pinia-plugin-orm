---
title: Usage | Guide
outline: deep
---

# Usage

## Standard

There is only one little difference between vuex-orm-next and pinia-plugin-orm usage. You need to use `useRepo`

```ts
import User from './models/User'
import { useRepo } from 'pinia-plugin-orm'

const userRepo = useRepo(User)
// Getting all users with their todos as relation
const users = userRepo.with('todos').get()
```

## Outside of setup()

You can also use pinia-orm out of the store. Like in pinia you need then to pass the pinia instance to useRepo See [using pinia outside of setup](https://pinia.vuejs.org/ssr/#using-the-store-outside-of-setup)

```ts
import User from '@/models/User'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  fails because it's called before the pinia is created
const userRepo = useRepo(User)

// ✅ works because the pinia instance is passed to defineStore
const userRepo = useRepo(User, this.$pinia)
```

## Helpers

Look into the [API Reference](/api) for usages of useCollect and more

The nice thing of these composables is that they work also with existing `vuex-orm` and `vuex-orm-next`. So if you like them you can just import these helpers e.g. by `import { useCollect } from 'pinia-plugin-orm/dist/helpers'`
