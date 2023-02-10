<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRepo } from 'pinia-plugin-orm'
import User from './store/User'
import Todo from './store/Todo'
import data from './data'
import userCard from './components/UserCard.vue'
import Footer from './components/Footer.vue'

const userRepo = useRepo(User)
const todoRepo = useRepo(Todo)

const userSelect = ref(null)

userRepo.save(data.users)

const users = computed(() => userRepo.with('todos').get())

const selectedData = computed(() => users.value.find(user => user.id === userSelect.value))

const removeTodo = (id: string) => {
  todoRepo.destroy(id)
}
</script>

<template>
  <div
    grid="~ flow-col gap-4"
    place="content-center items-center"
    h="screen"
    font="mono"
  >
    <Footer />
    <div class="min-w-[300px]">
      <select v-model="userSelect" class="mb-8 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
        <option :value="null" selected>
          None
        </option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <userCard v-if="selectedData" :user="selectedData" :todos="selectedData.todos" @remove-todo="removeTodo" />
      <div v-else class="min-h-[350px]" />
    </div>
  </div>
</template>
