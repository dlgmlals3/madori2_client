import Vue from 'vue'
import Login from '@/components/Login'
import Main from '@/components/Main'
import RoomList from '@/components/RoomList'
import RoomDetail from '@/components/RoomDetail'
import RoomApply from '@/components/RoomApply'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/room',
      name: 'RoomList',
      component: RoomList
    },
    {
      path: '/room/:id',
      name: 'RoomDetail',
      component: RoomDetail,
      props: true
    },
    {
        path: '/apply/:id',
        name: 'RoomApply',
        component: RoomApply,
        props: true
    },
    {
      path: '*',
      component: {
        template: '<div>Not Found</div>'
      }
    }
  ]
})
