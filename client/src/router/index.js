import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

// Explore
import Account from '@/views/Explore/Account'

// Landing
import MainPage from '@/views/Landing/MainPage'

const routes = [
  {
    path: '/',
    name: 'landing',
    children: [
      {
        path: '',
        name: 'index',
        component: MainPage
      },
    ],
    beforeEnter: (to, from, next) =>  {
      if (Cookies.get('token')) {
        window.location.href = '/explore'
      } else {
        next();
      }
    }
  },
  {
    path: '/explore',
    name: 'explore',
    children: [
      {
        path: '',
        name: 'Home',
        component: Account
      },
    ],
    beforeEnter: (to, from, next) =>  {
      if (!Cookies.get('token')) {
        window.location.href = '/'
      } else {
        next();
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
