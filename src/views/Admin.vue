<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        <v-card class="float-left">
          <v-card-title><v-icon class="mr-2">mdi-cog-outline</v-icon>ISL Management</v-card-title>
          <v-navigation-drawer floating permanent>
            <v-list shaped nav>
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
        </v-card>
      </v-col>
      <v-col cols="8">
        <router-view></router-view>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      selected: 0,
      items: [
        { icon: 'mdi-calendar', title:'Calendar', route:'/admin/calendar' },
        { icon: 'mdi-file', title:'Document', route:'/admin/document' },
        { icon: 'mdi-image', title:'Gallery', route:'/admin/gallery' },
        { icon: 'mdi-school', title:'Member School', route:'/admin/school' },
        { icon: 'mdi-trophy', title:'Game Result', route:'/admin/result' },
        { icon: 'mdi-email', title:'Contact', route:'/admin/contact' }
      ]
    }
  }
}
</script>

<style scoped>

</style>