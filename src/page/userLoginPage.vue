<script setup lang="ts">
import userLoginView from '@/components/fragments/userLoginView.vue'
import userRegisView from '@/components/fragments/userRegisView.vue'
import { ref } from 'vue'

const btnClicked = ref(true)
</script>

<template>
  <div class="bg-[#F6F6F6]">
    <div class="mx-[6.933vw] pt-[18px] h-screen">
      <div class="w-full">
        <div class="flex items-center">
          <img
            src="https://nti.co.id/web/image/website/1/logo/NTI?unique=180a144"
            alt=""
            class="h-[38px] ml-0 pl-0"
          />
          <p class="mb-0 font-bold text-[18px]">Neural Technologies Indonesia</p>
        </div>
        <div class="w-full h-full mt-[17.429vh] flex justify-between">
          <div class="w-full h-full hidden md:w-1/2 md:block">
            <img src="../assets/image/animation.png" alt="" class="" />
          </div>
          <div class="grid w-full h-full md:w-1/2">
            <div class="gap-x-[25px] flex items-center">
              <button
                class="btnLogin"
                @click="btnClicked = true"
                :class="btnClicked === true ? 'btnUnderline' : 'btnUnclick'"
              >
                Sign in
              </button>
              <button
                class="btnLogin"
                @click="btnClicked = false"
                :class="btnClicked === false ? 'btnUnderline' : 'btnUnclick'"
              >
                Register
              </button>
            </div>
            <component :is="btnClicked ? userLoginView : userRegisView"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
