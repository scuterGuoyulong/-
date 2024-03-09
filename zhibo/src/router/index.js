import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Index from '../views/index'
import Person from '../views/person'
import Liveroom from '../views/liveroom'
import Videoroom from '../views/videoroom'
import MyLiveRoom from '../views/myLiveRoom'
import studyRoom from '../views/studyRoom'
import queryStudyRoom from '../views/queryStudyRoom'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/index',
      name:'index',
      component: Index,
      
    }
    ,
    {
        path:'/myliveroom',
        component:MyLiveRoom
    },
    {
        path:'/person',
        component:Person
    },
    {
        path:'/liveroom',
        component:Liveroom
    },
    {
        path:'/videoroom',
        component:Videoroom
    },
    {
        path:'/studyRoom',
        component:studyRoom
    },
    {
      path:'/queryStudyRoom',
      component:queryStudyRoom
    }
  ]
})
