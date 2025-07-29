<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-blue-600 mb-4">User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id" class="mb-2">
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/data')
  users.value = await res.json()
})
</script>

