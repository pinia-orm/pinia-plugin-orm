<div align="center">
  <img src="./public/logo.svg" wigth='150px' height='150px'>
</div>

<div align="center">
  <h1>pinia-plugin-orm</h1>
</div>

<p align="center">
  The Pinia plugin to enable Object-Relational Mapping access to the Pinia Store.
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/pinia-plugin-orm"><img src="https://img.shields.io/npm/v/pinia-plugin-orm?color=f2b452&label="></a>
<p>

<p align="center">
  <a href="https://discord.gg/Fry7332ar7"><b>Get involved!</b></a>
</p>

<p align="center">
 <a href="https://pinia-orm-org.vercel.app">Documentation</a> | <a href="https://pinia-orm-org.vercel.app/guide/">Getting Started</a> | <a href="https://pinia-orm-org.vercel.app/guide/#examples">Examples</a> | <a href="https://pinia-orm-org.vercel.app/guide/why.html">Why PiniaOrm?</a> | <a href="https://playground-pinia-orm-org.vercel.app">Playground</a>
</p>

<h4 align="center">

</h4>
<br>
<br>

## Features

- Everything written in typescript
- With the [nuxt](https://github.com/nuxt/nuxt) package there is nuxt support out of the box
- The methods naming of models & queries is oriented from [laravel](https://github.com/laravel/laravel).
- Add only the code you need. Pinia ORM splits in different bundles like "decorators", "helpers", "casts", ...

> This plugin requires pinia >= 2.0.29

```ts
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

## Credits

Thanks to:

- [@Kia King Ishii](https://github.com/kiaking)
- [@Cuebit](https://github.com/cuebit)
- [@Posva](https://github.com/posva)
- [The Vuex ORM team](https://github.com/vuex-orm)

## License

[MIT](./LICENSE) License © 2023-Present [Elone Hoo](https://github.com/elonehoo)
