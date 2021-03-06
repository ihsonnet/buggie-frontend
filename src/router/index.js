import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Prescription from '../views/Dashboard.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: { name: 'Dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Prescription
        },
        {
          path: 'bug-list',
          name: 'BugController',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Project/BugController.vue')
        },
        {
          path: 'projects',
          name: 'ProjectController',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/ProjectController.vue')
        },
        // {
        //   path: 'project/:projectId/bugs',
        //   name: 'ProjectBugs',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ '../views/Project/ProjectBug.vue'),
        //   // redirect: { name: 'MemberController' },
        // },
        // {
        //   path: 'project/:projectId/members',
        //   name: 'ProjectMembers',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ '../views/Project/ProjectMembers.vue'),
        //   // redirect: { name: 'MemberController' },
        // },
        {
          path: 'project/:projectId/',
          name: 'ProjectInfo',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/Project/ProjectInfo.vue'),
          redirect: { name: 'MemberController' },
          children: [
            {
              path: 'bugs',
              name: 'BugController',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../views/Project/BugController.vue'),
            },
            {
              path: 'members',
              name: 'MemberController',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "about" */ '../views/Project/MemberController.vue'),
            }
          ]
        },
        {
          path: 'team-members',
          name: 'TeamController',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/TeamController.vue')
        },
        {
          path: 'about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
      ]
    },
    
    {
      path: '/auth/signin',
      name: 'SignIn',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Auth/SignIn.vue')
    },
    {
      path: '/auth/signup',
      name: 'SignUp',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Auth/SignUp.vue')
    },
  ]
})

export default router
