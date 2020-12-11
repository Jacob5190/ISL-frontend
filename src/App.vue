<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ items[selected].title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar>
        <img :src='isl' alt='ISL'/>
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list rounded>
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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block to='/login'>Login</v-btn>
        </div>
      </template>
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
      drawer: false,
      selected: 0,
      items: [
        { icon: 'mdi-home', title:'Home', route:'/' },
        { icon: 'mdi-calendar', title:'Calendar', route:'/calendar' },
        { icon: 'mdi-file', title:'Document', route:'/document' },
        { icon: 'mdi-image', title:'Gallery', route:'/gallery' },
        { icon: 'mdi-school', title:'Member School', route:'/school' },
        { icon: 'mdi-email', title:'Contact', route:'/contact' }
      ],
      isl: require('./assets/ISL.png')
    }
  }
}
</script>
