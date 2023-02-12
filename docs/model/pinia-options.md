---
title: Pinia Options | Model
outline: deep
---

# Pinia Options

::: tip NOTE
Under the hood Pinia ORM uses the `defineStore` method to create the pinia store for each model. You still have of course the option to pass pinia options through a configuration in the model.
:::

## Extending the store options (e.g. for plugins)

Maybe you want to use some other pinia plugins like [Pinia Plugin Persistence](https://github.com/pinia-orm/pinia-plugin-persistence). And therefore you need to be able to pass options to your store definition.

```ts
import { Model } from 'pinia-plugin-orm'
import { Attr, Str } from 'pinia-plugin-orm/dist/decorators'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  @Attr(null) declare id: number | null
  @Str('') declare name: string

  static piniaOptions = {
    persist: true
  }
}
```

## Overwriting (e.g. actions)

Through this options you can also overwrite the default pinia actions and add even properties to the state.

```ts
import { DataStore, Model, useStoreActions, Elements } from 'pinia-plugin-orm'
import { Attr, Str } from 'pinia-plugin-orm/dist/decorators'
import Post from '@/models/Post'

class User extends Model {
  static entity = 'users'
  @Attr(null) declare id: number | null
  @Str('') declare name: string

  static piniaOptions = {
    actions: {
      ...useStoreActions(),
      save(this: DataStore, records: Elements) {
        console.log('I am saving data!')
        this.data = { ...this.data, ...records }
      },
    }
  }
}
```

## Getting the pinia store instance

You can also get pinia store instance by using `piniaStore`.

```ts
const userRepo = useRepo(User)

console.log(userRepo.piniaStore().state.value)
```

For more details look at [pinia core concepts](https://pinia.vuejs.org/core-concepts/).
