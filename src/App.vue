<template>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = true" title="Menu"></v-app-bar-nav-icon>
        <v-toolbar-title v-if="items[selected] != null">{{ items[selected].title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-speed-dial v-model="fab" open-on-hover direction="bottom" transition="slide-y-transition">
          <template v-slot:activator>
            <v-btn fab small icon>
              <v-icon v-if="fab">
                mdi-close
              </v-icon>
              <v-icon v-else>
                mdi-dots-vertical-circle-outline
              </v-icon>
            </v-btn>
          </template>
          <v-btn
              fab small
              href="https://github.com/Jacob5190/International-Sports-League-Website/issues"
              title="Bug Report"
              color="white"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn v-if="loginState" fab small @click="logout" title="Logout" color="red">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-btn v-else fab small to="/login" title="Login" color="green">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-app-bar>
      <v-navigation-drawer
        v-if="this.items!=null"
        v-model="drawer"
        absolute
        temporary
        bottom
      >
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for='item in this.items'
              :key='item.title'
              link
              :to='item.route'
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="loginState" to="/admin" link>
              <v-list-item-icon>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Administrator</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      fab: false,
      isRouterAlive: true,
      selected: 0,
      items: [],
      isl: require('./assets/ISL.png'),
      drawer: false
    }
  },
  computed: {
    loginState() {
      return this.$store.state.loginState
    }
  },
  methods: {
    logout() {
      this.$axios.get('/api/logout').then(res => {
        alert(res.data.msg)
        this.$store.commit('logout')
        this.$router.push('/')
      })
    }
  },
  mounted() {
    this.$axios.get('/api/isLogin').then(res => {
      if (res.data == true) {
        this.$store.commit('login')
      } else {
        this.$store.commit('logout')
      }
    })
    this.fab = false
    this.selected = 0
    this.items = [
      { icon: 'mdi-home', title:'Home', route:'/' },
      { icon: 'mdi-calendar', title:'Calendar', route:'/calendar' },
      { icon: 'mdi-file', title:'Document', route:'/document' },
      { icon: 'mdi-image', title:'Gallery', route:'/gallery' },
      { icon: 'mdi-school', title:'Member School', route:'/school' },
      { icon: 'mdi-trophy', title:'Game Result', route:'/result' },
      { icon: 'mdi-email', title:'Contact', route:'/contact' }
    ]
    this.isl = require('./assets/ISL.png')
    this.drawer = false
  }
}
</script>
