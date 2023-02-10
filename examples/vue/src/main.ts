import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-plugin-orm'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const pinia = createPinia().use(createORM())

const app = createApp(App)

app.use(pinia)

app.mount('#app')
