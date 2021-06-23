import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prescription from '../views/Prescription.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: { name: 'Prescription' },
      children: [
        {
          path: 'rx-prescription',
          name: 'Prescription',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Prescription
        },
        {
          path: 'create-appointment',
          name: 'Create Appointment',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/CreateAppointment.vue')
        },
        {
          path: 'appointment-list',
          name: 'Appointment List',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/AppointmentList.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})

export default router
