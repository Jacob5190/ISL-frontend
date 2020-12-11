<template>
  <v-container>
    <v-row justify='center'>
      <v-col cols='6'>
        <v-card outlined>
          <v-img :src='isl' contain class="mx-8"></v-img>
          <v-card-title>associates with</v-card-title>
          <v-img :src='fss' contain></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify='center'>
      <v-col cols='6'>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-simple-table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(team, i) in teams" :key="i" class="text-center">
              {{ team }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team_row, i) in teams" :key="i">
            <th>
              {{ team_row }}
            </th>
            <td v-for="(team_col, i) in teams" :key="i" class="text-center">
              <div v-if="team_row != team_col">
                {{ team_row }} \ {{ team_col }}
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-container>
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
