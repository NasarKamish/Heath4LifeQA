import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    name : 'Survey',
    component: () => import('../layouts/Survey')
  },
  {
    path : '/panel',
    name : 'Panel',
    component: () => import('../pages/Panel')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard'),
    key: 'admin-dashboard'
  },
  {
    path: '/entries',
    name: 'Entries',
    component: () => import('../pages/Entries')
  },
  {
    path: "/forgot-pw",
    name: "Forgot",
    component: () => import('../pages/ForgotPassword')
  },
  {
    path: "/reset-pw/:id",
    name: "Reset",
    component: () => import('../pages/ResetPassword')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;