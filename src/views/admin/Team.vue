<template>
  <v-container>
    <v-card outlined>
      <v-tabs>
        <v-tab>Create Team</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-text-field label="Name" v-model="new_name" hint="The name of the team"></v-text-field>
                <v-select
                    :items="schools"
                    label="School"
                    v-model="new_school"
                    item-text="alias"
                    item-value="id"
                    hint="The school the team belongs to">
                </v-select>
                <v-select
                    :items="divisions"
                    label="Division"
                    v-model="new_division"
                    hint="The division the team belongs to"
                ></v-select>
                <v-select
                    :items="sports"
                    label="Sport"
                    v-model="new_sport"
                    item-text="name"
                    item-value="id"
                    hint="The sport type of the team">
                </v-select>
                <v-select
                    :items="ageGroup"
                    label="Age Group"
                    v-model="new_age_group"
                    hint="The age group of the team">
                </v-select>
                <v-radio-group mandatory dense row class="mb-1" v-model="new_gender">
                  <v-radio label="Female" value="Female"></v-radio>
                  <v-radio label="Male" value="Male"></v-radio>
                  <v-radio label="Mixed" value="Mixed"></v-radio>
                </v-radio-group>
                <v-btn color="success" @click="createTeam">Upload</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete Team</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-row class="fill-height">
                <v-col cols="2">
                  <v-card>
                    <v-list dense flat nav shaped>
                      <v-list-item-group v-model="selected_school" mandatory>
                        <v-list-item v-for="school in schools" :key="school.id" :value="school.id">
                          <v-list-item-title>{{ school.alias }}</v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="8">
                  <v-card>
                    <v-card-text>
                      <v-form>
                        <v-select
                            :items="this.teams"
                            label="Team name"
                            outlined
                            v-model="selected_id"
                            item-value="id"
                            item-text="name"
                            v-on:change="getTeamById">
                        </v-select>
                        <div v-if="selected_team != null">
                          <p>Age group: {{ selected_team.ageGroup }}</p>
                          <p>Gender group: {{ selected_team.genderGroup }}</p>
                        </div>
                        <v-btn color="warning" @click="deleteTeam">Delete</v-btn>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <div class="text-center">
      <v-snackbar
          v-model="snackbar"
          :timeout="2000"
      >{{ snackbarMsg }}
        <template v-slot:action="{ attrs }">
          <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "adminTeam",
  data() {
    return {
      new_name: null,
      new_division: null,
      new_sport: null,
      new_age_group: null,
      new_school: null,
      new_gender: null,
      teams: [],
      schools: [],
      sports: [],
      ageGroup: [9, 11, 14, 19],
      divisions: [1, 2, 3, 4],
      selected_school: null,
      selected_id: null,
      selected_team: null,
      snackbar: false,
      snackbarMsg: null
    }
  },
  methods: {
    createTeam() {
      let formdata = new FormData()
      formdata.append("name", this.new_name)
      formdata.append("division", this.new_division)
      formdata.append("schoolId", this.new_school)
      formdata.append("sportId", this.new_sport)
      formdata.append("ageGroup", this.new_age_group)
      formdata.append("genderGroup", this.new_gender)
      this.$axios.post("/api/admin/team", formdata).then(() => {
        this.openSnackbar("Upload team successfully")
      })
    },
    deleteTeam() {
      if (confirm("Deleting team may cause unpredictable error in database, please make sure all other data related" +
          " to the selected team is deleted or disabled first before continuing this action")) {
        if (this.selected_team != null) {
          this.$axios.delete("/api/admin/team/" + this.selected_team.id).then(() => {
            this.openSnackbar("Delete team successfully.")
            this.getTeams()
          }).catch(() => {
            alert("Unknown error occurred.")
          })
        } else {
          alert("Delete team failed, please input correct values.")
        }
      }
    },
    getSchools() {
      this.$axios.get("/api/school").then(res => {
        this.schools = res.data
      })
    },
    getSports() {
      this.$axios.get("/api/sport").then(res => {
        this.sports = res.data
      })
    },
    getTeams() {
      this.$axios.get("/api/team/schoolId/" + this.selected_school).then(res => {
        this.teams = res.data
      })
      console.log(this.teams)
    },
    getTeamById() {
      this.$axios.get("/api/team/" + this.selected_id).then(res => {
        this.selected_team = res.data
      })
    },
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  mounted() {
    this.getSchools()
    this.getSports()
  },
  watch: {
    selected_school: function () {
      this.getTeams()
    }
  }
}
</script>

<style scoped>

</style>