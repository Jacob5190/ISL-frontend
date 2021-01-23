<template>
  <v-container fluid>
    <v-navigation-drawer absolute permanent>
      <v-list nav>
        <v-list-item class="px-2">
          <v-list-item-title class="text-center"><h3>ISL Management</h3></v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
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
    <v-row>
      <v-col cols="8" offset-sm="4" offset="3" offset-xl="2">
        <keep-alive>
          <router-view :key="key"></router-view>
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Admin",
  data () {
    return {
      selected: 0,
      items: [
        { icon: 'mdi-calendar', title:'Calendar', route:'/admin/calendar' },
        { icon: 'mdi-file', title:'Document', route:'/admin/document' },
        { icon: 'mdi-image', title:'Gallery', route:'/admin/gallery' },
        { icon: 'mdi-school', title:'Member School', route:'/admin/school' },
        { icon: 'mdi-account-group', title: 'Teams', route: '/admin/team' },
        { icon: 'mdi-trophy', title:'Game Result', route:'/admin/result' },
        { icon: 'mdi-email', title:'Contact', route:'/admin/contact' }
      ]
    }
  },
  mounted() {
    this.selected = 0
    this.items = [
      { icon: 'mdi-calendar', title:'Calendar', route:'/admin/calendar' },
      { icon: 'mdi-file', title:'Document', route:'/admin/document' },
      { icon: 'mdi-image', title:'Gallery', route:'/admin/gallery' },
      { icon: 'mdi-school', title:'Member School', route:'/admin/school' },
      { icon: 'mdi-account-group', title: 'Teams', route: '/admin/team' },
      { icon: 'mdi-trophy', title:'Game Result', route:'/admin/result' },
      { icon: 'mdi-email', title:'Contact', route:'/admin/contact' }
    ]
  }
}
</script>

<style scoped>

</style>