import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'
import { createORM } from 'pinia-plugin-orm'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'

Vue.use(PiniaVuePlugin)
const pinia = createPinia().use(createORM())

new Vue({
  pinia,
  render: h => h(App),
}).$mount('#app')
