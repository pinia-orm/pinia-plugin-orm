<script setup  lang="ts">
import { useRepo } from 'pinia-plugin-orm'
import User from './models/User'

const userRepo = useRepo(User)
const user = userRepo.save([
  {
    id: 1,
    email: 'test@test.de',
    name: 'test',
    todos: [
      {
        title: 'Hoho',
      },
      {
        title: 'Blub',
      },
    ],
  },
])

userRepo.with('todos').get()

onBeforeMount(() => {

})
</script>

<template>
  <div>Nuxt module playground!</div>
  <div>{{ user }}</div>
</template>
