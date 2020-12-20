<template>
    <v-app>
      <v-app-bar app>
        <v-toolbar-title>{{ items[selected].title }}</v-toolbar-title>
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
          <v-btn fab small icon v-on="openIssue">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn fab small icon to="/admin">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-app-bar>
      <v-navigation-drawer
        app
        permanent
        expand-on-hover
      >
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for='item in items'
              :key='item.title'
              link
              :to='item.route'
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-main>
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      fab: false,
      selected: 0,
      items: [
        { icon: 'mdi-home', title:'Home', route:'/' },
        { icon: 'mdi-calendar', title:'Calendar', route:'/calendar' },
        { icon: 'mdi-file', title:'Document', route:'/document' },
        { icon: 'mdi-image', title:'Gallery', route:'/gallery' },
        { icon: 'mdi-school', title:'Member School', route:'/school' },
        { icon: 'mdi-trophy', title:'Game Result', route:'/result' },
        { icon: 'mdi-email', title:'Contact', route:'/contact' }
      ],
      isl: require('./assets/ISL.png')
    }
  },
  methods: {
    openIssue() {
      window.location.href = "https://github.com/Jacob5190/International-Sports-League-Website/issues"
    }
  }
}
</script>
