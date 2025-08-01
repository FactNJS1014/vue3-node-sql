<template>
  <div class="p-8">
    <!-- <h1 class="text-2xl font-bold text-blue-600 mb-4">User List</h1> -->


    <div class="grid grid-cols-4 gap-4">
      <div v-for="(usersInSection, sec) in map_sec" :key="sec" class="mb-6">
        <div class="card w-96 bg-base-100 card-xs shadow-sm">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">             
              <h2 class="text-lg font-semibold text-center">{{ sec }}</h2>
              <button class="btn btn-info">ดูข้อมูล</button>
            </div>



            <div class="text-center mb-4">

              <span class="text-[16px] text-gray-500 mr-6">Total Users: {{ usersInSection.length }}</span>
              <span class="text-[16px] text-gray-500 mr-6">Not Check: {{usersInSection.filter(user => user.DAYS >
                7).length }}</span>
              <span class="text-[16px] text-gray-500">Checked: {{usersInSection.filter(user => user.DAYS <= 7).length
                }}</span>


            </div>            
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const map_sec = ref({})

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/data')
  users.value = await res.json()

  const grouped = users.value.reduce((acc, user) => {
    if (!acc[user.SECTCD]) {
      acc[user.SECTCD] = []
    }
    acc[user.SECTCD].push(user)


    return acc
  }, {})

  map_sec.value = grouped


})
</script>
