import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import RoomList from '@/components/RoomList'
import RoomDetail from '@/components/RoomDetail'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: HelloWorld
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
      path: '*',
      component: {
        template: '<div>Not Found</div>'
      }
    }
  ]
})
