import Vue from 'vue'
import Router from 'vue-router'
import playerVideo from '@/components/playerVideo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'playerVideo',
      component: playerVideo
    }
  ]
})
