<script setup lang="ts">
import icArrowDown from '../assets/icons/icArrowDown.vue'
import icEdit from '../assets/icons/icEdit.vue'
import icTrash from '../assets/icons/icTrash.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'


// API club
interface Data {
  id: string
  path: string
  dir: string
  type: string
  proxy_pass: string
  attribute: string
  is_auth: boolean
}
const webProxy = ref<Data[]>([])
const webProxyLoaded = ref<boolean>(false)

async function fetchData() {
  try {
    const { data } = await axios.get('http://localhost:3000/webProxy')
    webProxy.value = data.map((item: any) => ({
      id: item.id,
      path: item.path,
      dir: item.dir,
      type: item.type,
      proxy_pass: item.proxy_pass,
      attribute: item.attribute,
      is_auth: item.is_auth
    }))
    webProxyLoaded.value = true
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}
onMounted(fetchData)

// delete webProxy club
const deleteWebProxy = async (id: string) => {
  try {
    console.log('Attempting to delete ID:', id)
    await axios.delete(`http://localhost:3000/webProxy/${id}`)
    fetchData() // Refresh data after deleting
  } catch (error) {
    console.error('Failed to delete data:', error)
  }
}

// popup club
const isModalVisible = ref(false)
const form = ref<Data>({
  id: '',
  path: '',
  dir: '',
  type: '',
  proxy_pass: '',
  attribute: '',
  is_auth: false
})

const showModal = () => {
  isEdit.value = false
  title.value = 'Add WebProxy'
  form.value = {
    id: (webProxy.value.length + 1).toString(),
    path: '',
    dir: '',
    type: '',
    proxy_pass: '',
    attribute: '',
    is_auth: false
  }
  isModalVisible.value = true
}

const isEdit = ref<boolean>(false)
const title = ref<string>('')
const editItem = (item: Data) => {
  item.id.toString()
  title.value = 'Edit WebProxy'
  isEdit.value = true
  form.value = { ...item }
  isModalVisible.value = true
}

const handleOk = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3000/webProxy/${form.value.id}`, form.value)
    } else {
      const { data } = await axios.post('http://localhost:3000/webProxy', form.value)
      webProxy.value.push(data)
    }
    await fetchData()
    isModalVisible.value = false
  } catch (error) {
    console.error('Failed to add/edit data:', error)
  }
}

const handleCancel = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div class="mx-4 flex">
    <div class="w-full h-full">
      <!-- navbar -->
      <div class="bg-[#F7F9FC] h-14 flex justify-between items-center">
        <div class="flex items-center">
          <img src="https://nti.co.id/web/image/website/1/logo/NTI?unique=180a144" class="w-10">
          <p class="mb-0 font-bold text-2xl">Web Proxy</p>

        </div>
        <a-dropdown placement="bottomRight" class="rounded-full">
          <a-button></a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">Logout</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">Setting</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <!-- navbar end -->
      <div class="h-16 w-full flex items-center justify-between rounded-t-xl">
        <div class="w-fit flex items-center">
          <p class="mb-0 font-medium text-xs mr-3">Show</p>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1"> 20 </a-menu-item>
                <a-menu-item key="2"> 30 </a-menu-item>
                <a-menu-item key="3"> 30 </a-menu-item>
              </a-menu>
            </template>
            <a-button
              class="flex items-center font-medium text-xs bg-[#E0E0E0] pl-[9px] pr-3 mr-3 rounded-[8px] border-none"
            >
              10
              <icArrowDown class="ml-1" />
            </a-button>
          </a-dropdown>
          <p class="mb-0 font-medium text-xs mr-3">entries</p>
          <a-input-search
            placeholder="search..."
            style="width: 200px"
            class="costum-input rounded-[8px] border-[#9E9E9E] border-[1px]"
          />
        </div>
        <button
          class="btnDefault text-xs py-2 px-3 gap-x-2"
          @click="showModal"
        >
          <p class="mb-0">+</p>
          <p class="mb-0 ">Add WebProxy</p>
        </button>
      </div>
      <table class="table-auto w-full">
        <thead class="w-full">
          <tr class="w-full font-bold text-sm">
            <td class="text-center">path</td>
            <td class="">dir</td>
            <td class="">type</td>
            <td class="">proxy_pass</td>
            <td class="">attribute</td>
            <td class="">is_auth</td>
            <td class="w-[100px]">
              <p class="mb-0 text-center">Action</p>
            </td>
          </tr>
        </thead>
        <tbody
          class="font-medium text-sm py-[23.5px] odd:bg-[#F7F6FE] even:bg-white"
          v-for="item in webProxy"
          :key="item.id"
        >
          <tr class="" v-if="webProxyLoaded">
            <td class="py-[23.5px] text-center">{{ item.path }}</td>
            <td class="py-[23.5px]">{{ item.dir }}</td>
            <td class="py-[23.5px]">{{ item.type }}</td>
            <td class="py-[23.5px]">{{ item.proxy_pass }}</td>
            <td class="py-[23.5px]">{{ item.attribute }}</td>
            <td class="py-[23.5px]">{{ item.is_auth }}</td>
            <td class="py-[23.5px] gap-4 flex items-center justify-center">
              <button @click="editItem(item)">
                <icEdit />
              </button>
              <button @click="deleteWebProxy(item.id.toString())">
                <icTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="h-16 w-full flex justify-center items-center gap-x-3 rounded-b-xl">
        <button class="mb-0">Previous</button>
        <button
          class="rounded w-[30px] h-[30px] bg-[#E0E0E0] hover:bg-[#624DE3] text-black hover:text-white font-medium text-xs"
        >
          1
        </button>
        <button
          class="rounded w-[30px] h-[30px] bg-[#E0E0E0] hover:bg-[#624DE3] text-black hover:text-white font-medium text-xs"
        >
          2
        </button>
        <button
          class="rounded w-[30px] h-[30px] bg-[#E0E0E0] hover:bg-[#624DE3] text-black hover:text-white font-medium text-xs"
        >
          3
        </button>
        <button class="mb-0">Next</button>
      </div>
    </div>
    <!-- Modal for Add/Edit -->
    <a-modal
      v-model:visible="isModalVisible"
      :title="title"
      @ok="handleOk"
      @cancel="handleCancel"
      class="top-4"
    >
      <a-form layout="vertical">
        <a-form-item label="Path">
          <a-input v-model:value="form.path" />
        </a-form-item>
        <a-form-item label="Dir">
          <a-input v-model:value="form.dir" />
        </a-form-item>
        <a-form-item label="Type">
          <a-input v-model:value="form.type" />
        </a-form-item>
        <a-form-item label="Proxy Pass">
          <a-input v-model:value="form.proxy_pass" />
        </a-form-item>
        <a-form-item label="Attribute">
          <a-input v-model:value="form.attribute" />
        </a-form-item>
        <a-form-item label="Is Auth">
          <a-switch v-model:checked="form.is_auth" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
