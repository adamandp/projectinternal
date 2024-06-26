import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../page/homePage.vue'
import loginPage from '../page/loginPage.vue'
import userLoginPage from '@/page/userLoginPage.vue'
import userHomePage from '../page/userHomePage.vue'
import troubleShoot from '@/page/troubleShoot.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
    },
    {
      path: '/userLoginPage',
      name: 'userLoginPage',
      component: userLoginPage
    },
    {
      path: '/troubleShoot',
      name: 'troubleShoot',
      component: troubleShoot
    },
    {
      path: '/userHomePage',
      name: 'userHomePage',
      component: userHomePage
    }
  ]
})


export default router
