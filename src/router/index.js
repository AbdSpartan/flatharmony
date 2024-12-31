import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import DashBoard from '@/views/DashBoard.vue'
import InBox from '@/views/InBox.vue'
import AnonymousMessaging from '@/views/AnonymousMessaging.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { 
    path: '/dashboard', 
    name: 'DashBoard', 
    component: DashBoard,
    children: [
      { path: 'inbox', name: 'InBox', component: InBox },
      { path: 'anonymous-messaging', name: 'AnonymousMessaging', component: AnonymousMessaging }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


