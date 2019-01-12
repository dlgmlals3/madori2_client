// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.prototype.$serverIp = 'http://218.38.52.30:3000'
Vue.prototype.$accountName = 'madori'

new Vue({
  components: { App },
  template: '<App/>',
  store,
  render: h => h(App),
  router
}).$mount('#app')
