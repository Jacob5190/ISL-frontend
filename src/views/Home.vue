<template>
  <v-container>
    <v-card>
      <v-img :src='isl' contain class="mx-8"></v-img>
      <v-card-title class="mx-auto">associates with</v-card-title>
      <v-img :src='fss' contain></v-img>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: 'Home',
  data () {
    return {
      isl: require('../assets/ISL.png'),
      fss: require('../assets/FSS.jpg'),
      fit: 'contain',
      teams: ["Team 1", "Team 2", "Team 3", "Team 4"]
    }
  }
}
</script>
