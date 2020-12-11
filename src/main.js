import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Vuetify)
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
