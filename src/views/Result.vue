<template>
  <v-container fluid>
    <v-row>
      <v-col md="3">
        <v-card width="100%" class="pa-2">
          <v-card-title>Search For Result</v-card-title>
          <v-card-text>
            <p>Age Group</p>
            <v-select
                :items="ages"
                lable="ageGroup"
                v-model="selected_ageGroup"
                outlined dense>
            </v-select>

            <p>Gender</p>
            <v-select
                :items="genders"
                lable="genderGroup"
                v-model="selected_genderGroup"
                outlined dense>
            </v-select>

            <p>Division</p>
            <v-select
                :items="divisions"
                item-text="name"
                item-value="value"
                lable="division"
                v-model="selected_division"
                outlined dense return-object>
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="search">
              <v-icon>mdi-magnify</v-icon>
              Search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      ages: [9, 11, 14, 19],
      genders: ['Male', 'Female', 'Mixed'],
      divisions: [{
        name: 'Division 1',
        value: 1
      },
      {
        name: 'Division 2',
        value: 2
      },
      {
        name: 'Division 3',
        value: 3
      },
      {
        name: 'Division 4',
        value: 4
      }],
      selected_ageGroup: null,
      selected_genderGroup: null,
      selected_division: null,
      teams: [],
      results: []
    }
  },
  mounted () {

  },
  methods: {
    search() {
      if (this.selected_genderGroup == null || this.selected_ageGroup == null || this.selected_division == null) {
        console.log("Please input correct value")
      }else {
        const age = this.selected_ageGroup
        const gender = this.selected_genderGroup
        const division = this.selected_division.value
        const url = "/api/result/age/" + age + "/gender/" + gender + "/division/" + division
        this.$axios.get(url).then(res => {
          this.results = res.data
          console.log(res.data)
        })
        this.listTeam(age, gender, division)
      }
    },
    listTeam(age, gender, division) {
      const url = "/api/team/age/" + age + "/gender/" + gender + "/division/" + division
      this.$axios.get(url).then(res => {
        this.teams = res.data
        console.log(res.data)
      })
    }
  }
}
</script>