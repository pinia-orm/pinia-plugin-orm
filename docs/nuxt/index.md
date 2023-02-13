---
title: Nuxt | Repository
outline: deep
---

# Nuxt Setup

## Installation

:::warning
Please install [@pinia/nuxt](https://www.npmjs.com/package/@pinia/nuxt) correctly. See [installation guidelines](https://pinia.vuejs.org/ssr/nuxt.html#installation).
:::

::: code-group

```bash [npm]
npm i -D pinia-plugin-orm @pinia-plugin-orm/nuxt
```

```bash [yarn]
yarn add -D pinia-plugin-orm @pinia-plugin-orm/nuxt
```

```bash [pnpm]
pnpm add -D pinia-plugin-orm @pinia-plugin-orm/nuxt
```

:::

:::warning
For [Nuxt 2](https://nuxtjs.org/) users `pinia-plugin-orm` like `pinia` requires either to have nuxt [composition api](https://github.com/nuxt-community/composition-api) installed or [nuxt bridge](https://github.com/nuxt/bridge)
:::

## Configuration

::: code-group

```ts [Nuxt 3]
import { defineNuxtConfig } from 'nuxt3'
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-orm/nuxt'
  ]
})
```

```ts [Nuxt 2]
export default {
  buildModules: [
  '@nuxtjs/composition-api/module',
  '@pinia/nuxt'
  ],
  modules: ['@pinia-plugin-orm/nuxt'],
  // Related to https://github.com/nuxt/nuxt.js/issues/7822
  build: {
    transpile: [
      'pinia-plugin-orm'
    ]
  },
}
```

:::

## Usage on Nuxt 2

On Nuxt 2 with [nuxt composition api](https://composition-api.nuxtjs.org/) there is a drawback with the usage. You always gonna need to pass the pinia instance to `useRepo` because otherwise on client side you will get an error because the store is [called outside the store](https://pinia.vuejs.org/core-concepts/outside-component-usage.html).

In Nuxt 3 this problem somehow doesn't occur.

```ts
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useRepo } from 'pinia-plugin-orm'
import User from '~/models/User'
export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { $pinia } = useContext()
    const userRepo = useRepo(User, $pinia)

    ...
  },
})
```
