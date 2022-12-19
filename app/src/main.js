import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store/store'



Vue.prototype.$external_api = axios.create({
  baseURL : 'https://pokeapi.co/api/v2/'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
