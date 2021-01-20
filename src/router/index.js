import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "page" */ '../views/Calendar.vue')
  },
  {
    path: '/document',
    name: 'Document',
    component: () => import(/* webpackChunkName: "page" */ '../views/Document.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import(/* webpackChunkName: "page" */ '../views/Gallery.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "page" */ '../views/Contact.vue')
  },
  {
    path: '/school',
    name: 'School',
    component: () => import(/* webpackChunkName: "page" */ '../views/School.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import(/* webpackChunkName: "page" */ '../views/Team.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import(/* webpackChunkName: "page" */ '../views/Result.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "page" */ '../views/login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "page" */ '../views/Admin.vue'),
    meta: {
      requireLogin: true
    },
    children: [
      {
        path: 'gallery',
        name: 'gallery-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/Gallery.vue')
      },
      {
        path: 'calendar',
        name: 'calendar-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/Calendar.vue')
      },
      {
        path: 'document',
        name: 'document-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/Document.vue')
      },
      {
        path: 'contact',
        name: 'contact-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/Contact.vue')
      },
      {
        path: 'result',
        name: 'result-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/Result.vue')
      },
      {
        path: 'school',
        name: 'school-admin',
        component: () => import(/* webpackChunkName: “page” */ '../views/admin/School.vue')
      },
      {
        path: 'team',
        name: 'team-admin',
        component: () => import(/* webpackChunkName: "page" */ '../views/admin/Team.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router
