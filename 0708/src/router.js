import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainRouter from './views/MainRouter.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainRouter,
      children:[
        {
          path: '',
          redirect:'home'// 假如访问根路径跳转HOME
        },
        {
          path: 'home',
          component:Home
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
