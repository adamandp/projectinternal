<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router';



interface fromRegisterData {
  id: number
  username: string
  password: string
  webProxy: string[]
}

const listUser = ref<fromRegisterData[]>([])
const listUserLoaded = ref<boolean>(false)
const confirmPassword = ref<string>('')
const invalidUsername = ref<boolean>(true)
const invalidPassword = ref<boolean>(true)
const invalidConfirmPassword = ref<boolean>(true)
const text = ref<string>('')

async function fetchData() {
  try {
    const { data } = await axios.get('http://localhost:3000/listUser')
    listUser.value = data.map((item: any) => ({
      id: item.id,
      username: item.username
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
  webProxy: []
})

const sendData = async () => {
  try {
    formRegister.value.id = listUser.value.length + 1
    const { data } = await axios.post('http://localhost:3000/listUser', formRegister.value)
    listUser.value.push(data)
    text.value = 'Your account is ready to use, go to login menu'
  } catch (error) {
    console.log('Failed to register', error)
  }
}

function handleRegister() {
  // Reset errors and text value
  invalidPassword.value = true // Assuming this should start as true
  text.value = ''

  // Check username
  if (formRegister.value.username === '') {
    invalidUsername.value = false
    text.value = 'Username cannot be empty'
    return // Stop further checks if username is empty
  }

  const user = listUser.value.find((u) => u.username === formRegister.value.username)
  if (user) {
    invalidUsername.value = false
    text.value = 'Username already exists'
    return // Stop further checks if username is invalid
  }

  // Check password
  if (formRegister.value.password === '') {
    invalidPassword.value = false
    text.value = 'Password cannot be empty'
    return // Stop further checks if password is empty
  }

  // Check confirm password
  if (confirmPassword.value === '') {
    invalidConfirmPassword.value = false
    text.value = 'Confirm password cannot be empty'
    return // Stop further checks if confirm password is empty
  }

  // Check if passwords match
  if (formRegister.value.password !== confirmPassword.value) {
    invalidPassword.value = false
    invalidConfirmPassword.value = false
    text.value = 'Password does not match'
    return // Stop further checks if passwords do not match
  }

  // If all validations pass, send data
  invalidUsername.value = true
  invalidPassword.value = true
  invalidConfirmPassword.value = true
  invalidPassword.value = true
  sendData()
  router.push({ path: '/' });
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
      <a-input-password
        size="large"
        v-model:value="confirmPassword"
        placeholder="Confirm Password"
        class="h-[6.849vh] !bg-[#EAF0F7] my-[0.913vh] rounded-2xl"
        :class="invalidConfirmPassword === false && 'border-red-400 border-2 border-solid'"
      />
      <button class="text-[#C7C7C7] font-bold text-[14px] justify-self-end my-4">
        recover password
      </button>
      <a-button type="primary" class="btnDefault w-full pt-2 h-[40px]" @click="handleRegister">
        Register
      </a-button>
      {{ text }}
    </div>
  </div>
</template>
