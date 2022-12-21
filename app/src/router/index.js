import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamList from '../views/TeamList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/team/create',
    name: 'create',
    component: HomeView,
  },
  {
    path: '/team/list',
    name: 'list',
    component: TeamList,
  },
  {
    path: '/team/update/:id',
    name: 'list',
    component: HomeView
  },
  {
    path: '**',
    name: 'list',
    component: HomeView
  }
]
const router = new VueRouter({
  routes
})

export default router
