import App from './App'
import api from '@/service/api'
import fd from '@/common/fd.js'
// #ifndef VUE3
import Vue from 'vue'
import store from './store'
Vue.prototype.api = api
Vue.prototype.$store = store
Vue.prototype.$fd=fd
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif