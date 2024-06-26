<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

interface fromRegisterData {
  id: number
  username: string
  password: string
  adminStatus: boolean
}

const listUser = ref<fromRegisterData[]>([])
const listUserLoaded = ref<boolean>(false)
const invalidPassword = ref<boolean>(true)
const invalidUsername = ref<boolean>(true)
const text = ref<string>('')

async function fetchData() {
  try {
    const { data } = await axios.get('http://localhost:3000/admins')
    listUser.value = data.map((item: any) => ({
      id: item.id,
      username: item.username,
      password: item.password,
      adminStatus: item.adminStatus
    }))
    listUserLoaded.value = true
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

onMounted(fetchData)

const formRegister = ref<fromRegisterData>({
  id: 0,
  username: '',
  password: '',
  adminStatus: false
})

function handleLogin() {
  // Reset validation flags and text
  invalidPassword.value = true
  invalidUsername.value = true
  text.value = ''

  // Check username
  if (formRegister.value.username === '') {
    invalidUsername.value = false
    text.value = 'Username cannot be empty'
    return // Stop further checks if username is empty
  }

  // Check password
  if (formRegister.value.password === '') {
    invalidPassword.value = false
    text.value = 'Password cannot be empty'
    return // Stop further checks if password is empty
  }

  // Check if username exists
  const user = listUser.value.find((u) => u.username === formRegister.value.username)
  if (!user) {
    invalidUsername.value = false
    text.value = 'Username not found'
    return // Stop further checks if username is invalid
  }

  // Check if password matches
  if (formRegister.value.password !== user.password) {
    invalidPassword.value = false
    text.value = 'Invalid password'
    return // Stop further checks if password is invalid
  }

  if (!user.adminStatus) {
    text.value = 'User is not an admin'
    if (user.adminStatus.valueOf() === false) {
      text.value = 'wait for admin approval'
      return
    }
  }

  // If all validations pass, proceed to login
  text.value = 'Login successful!'
  localStorage.setItem('token', formRegister.value.id.toString())
  router.push({ name: 'userHomePage' })

  // Here you can redirect to the dashboard or perform any other necessary actions
}
</script>

<template>
  <div class="mt-[4.795vh]">
    <div class="grid">
      <a-input
        size="large"
        v-model:value="formRegister.username"
        placeholder="Enter Username"
        class="h-[6.849vh] bg-[#EAF0F7] my-[0.913vh] rounded-2xl"
        :class="invalidUsername === false && 'border-red-400 border-2 border-solid'"
      />
      <a-input-password
        size="large"
        v-model:value="formRegister.password"
        placeholder="Enter Password"
        class="h-[6.849vh] !bg-[#EAF0F7] my-[0.913vh] rounded-2xl"
        :class="invalidPassword === false && 'border-red-400 border-2 border-solid'"
      />
      <button class="text-[#C7C7C7] font-bold text-[14px] justify-self-end my-4">
        recover password
      </button>
      <a-button type="primary" class="btnDefault w-full pt-2 h-[40px]" @click="handleLogin">
        Login
      </a-button>
      <p class="text-red-400 mt-2 font-semibold">
        {{ text }}
      </p>
    </div>
  </div>
</template>
