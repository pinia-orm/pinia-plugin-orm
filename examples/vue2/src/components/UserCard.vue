<script setup lang="ts">
import { useRepo } from 'pinia-plugin-orm'

const {user, todos} = defineProps<{
  user:any,
  todos:any
}>()

const emit = defineEmits(['removeTodo'])

const removeTodo = (id:any) => {
  emit('removeTodo', id)
}
</script>

<template>
  <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center pb-10">
        <img class="mb-3 w-24 h-24 rounded-full shadow-lg" :src="user.avatarImgUrl" :alt="user.name">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ user.firstName }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ user.lastName }}</span>
        <ul v-if="user.todos" class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600 flex items-center" v-for="todo in user.todos" :key="todo.id">
                <span class="flex-grow">{{ todo.title }}</span>
                <button @click="removeTodo(todo.id)" class="inline-block p-[8px] rounded bg-red-400">
                    <svg class="h-[12px] w-[12px]" viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="11"
                              x2="11" y2="1"
                              stroke="black"
                              stroke-width="2"/>
                        <line x1="1" y1="1"
                              x2="11" y2="11"
                              stroke="black"
                              stroke-width="2"/>
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</div>
</template>
