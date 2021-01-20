import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
Vue.use(Vuetify)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginState: false
  },
  mutations: {
    login (state) {
      state.loginState = true
    },
    logout (state) {
      state.loginState = false
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)) {
    if (!store.state.loginState) {
      axios.get('/api/isLogin').then(res => {
        if (res.data == true) {
          store.commit('login')
        } else {
          alert("Please login first")
          store.commit('logout')
          next('/login')
        }
      })
    }
    next()
  } else if (to.path === '/login' && store.state.loginState) {
    next('/admin')
  } else {
    next()
  }
})
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
