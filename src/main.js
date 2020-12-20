import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
Vue.use(Vuetify)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) {
    console.log(to)
    axios.get("/api/isLogin").then(res => {
      console.log(res.data)
      if (res.data == true) {
        next()
      } else {
        alert("Please login first")
        next('/login')
      }
    }).catch(() => {
      alert("Error!")
      next('/login')
    })
  } else {
    next()
  }
})
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
