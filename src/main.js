import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/plugins/firebase";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueContentPlaceholders)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
