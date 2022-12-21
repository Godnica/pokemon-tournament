import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.nextTick(() => {
  document.title = "Pokemon Tournament";
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$external_api = axios.create({
  baseURL : 'https://pokeapi.co/api/v2/'
})

Vue.prototype.$internal_api = axios.create({
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  baseURL : "http://localhost:8081/"
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
