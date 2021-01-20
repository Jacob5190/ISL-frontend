<template>
  <v-card>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-img :src='isl' contain max-height="300px" max-width="400px" class="mx-auto"></v-img>
        </v-col>
      </v-row>
      <v-row justify="center" class="pt-2">
        <v-col cols="8" class="text-center">
          <h2>associates with</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-img :src='fss' contain max-height="300px" max-width="400px" class="mx-auto"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
