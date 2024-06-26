<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
const x = ref<string[]>([])
axios.get('http://localhost:3000/users/1').then((response) => {
  x.value = (response.data.webproxies[1])
})

</script>
<template>
  <h1>{{ x }}</h1>
</template>
