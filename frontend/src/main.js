import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import localStore from './localStore'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

const selectedStore = process.env.VUE_APP_BROWSER_VERSION ? localStore : store

new Vue({
  router,
  store: selectedStore,
  render: h => h(App)
}).$mount('#app')
