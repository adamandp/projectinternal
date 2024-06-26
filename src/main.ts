
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import './index.css'
import 'ant-design-vue/dist/reset.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(VueAxios, axios)
app.mount('#app')

