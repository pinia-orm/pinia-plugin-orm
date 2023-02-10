<script setup lang="ts">
import { toggleDark } from '../composables/dark'
</script>

<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <button icon-btn @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </button>
  </nav>
</template>
