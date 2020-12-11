<template>
  <v-container fluid>
    <v-row>
      <v-col md="4">
        <v-card class="float-left" width="100%">
        <v-navigation-drawer floating permanent width="100%">
          <v-list rounded nav>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <h3>{{ this.schoolAlias }} -- {{ this.sportName }}</h3>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="team in teams"
              :key="team.id"
              @click="showTeam(team.id)">
              <v-list-item-content>
                <v-list-item-title>
                  Division {{ team.division }} - {{ team.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-chip outlined v-if="team.ageGroup!=null" class="mx-1">
                  {{ team.ageGroup }}
                </v-chip>
                <v-chip outlined v-if="team.genderGroup!=null" class="mx-1">
                  {{ team.genderGroup }}
                </v-chip>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-btn fab color="secondary" small class="ma-3" to="/school">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="6">
        <v-card v-if="selected_team!=null">
          <v-card-title>{{ selected_team.name }}</v-card-title>
          <v-card-text>
            <p>Age group: {{ selected_team.ageGroup }}</p>
            <p>Gender: {{ selected_team.genderGroup }}</p>
          </v-card-text>
          <v-container liquid>
            <div
              class="ma-2 d-inline-flex justify-start flex-wrap"
            >
              <v-card
                v-for="coach in coaches"
                :key="coach.id"
                class="ma-1"
              >
              <v-card-title>
                <v-list-item>
                  <v-avatar 
                    size="70" 
                    color="indigo"
                    rounded
                    v-if="coach.image_src==null"
                  >
                    <v-icon dark>
                      mdi-account-circle
                    </v-icon>
                  </v-avatar>
                  <v-avatar
                    size="70"
                    rounded
                    v-else
                  >
                    <v-img :src="coach.image_src" contain>
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                  <v-list-item-content class="ml-4">
                    <v-list-item-title>
                      {{ coach.coach_obj.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ coach.coach_obj.position }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-title>
              </v-card>
            </div>
            <v-expansion-panels popout class="my-4">
              <v-expansion-panel
                v-for="(position,i) in team_positions"
                :key="i">
                <v-expansion-panel-header>
                  {{ position }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="mx-2 d-inline-flex justify-start flex-wrap">
                    <v-card 
                      v-for="member in membersInPosition(position)"
                      :key="member.member_obj.id" 
                      class="ma-1"
                    >
                      <v-card-title>
                        <v-avatar 
                          size="70" 
                          color="indigo"
                          rounded
                          v-if="member.image_src==null"
                        >
                          <v-icon dark>
                            mdi-account-circle
                          </v-icon>
                        </v-avatar>
                        <v-avatar
                          size="70"
                          rounded
                          v-else
                        >
                          <v-img :src="member.image_src" contain>
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-row>  
                            </template>
                          </v-img>
                        </v-avatar>
                        <h4 class="ml-3">{{ member.member_obj.name }}</h4>
                      </v-card-title>
                    </v-card>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Team',
  data () {
    return {
      teams: [],
      schoolAlias: null,
      sportName: null,
      schoolId: this.$route.query.schoolId,
      sportId: this.$route.query.sportId,
      selected_team: null,
      team_positions: [],
      coaches: [],
      members: [],
    }
  },
  mounted() {
    this.getTeamList()
    this.updateSchoolAndSport()
  },
  methods: {
    membersInPosition(position) {
      return this.members.filter(function (member) {
        return member.member_obj.position == position
      })
    },
    getTeamList() {
      let url = '/api/team/schoolId/' + this.schoolId + '/sportId/' + this.sportId
      this.$axios.get(url).then(res => {
        this.updateTeamList(res.data)
      })
    },
    updateTeamList(teams) {
      this.teams = teams
    },
    showTeam(teamId) {
      this.$axios.get("/api/team/" + teamId).then(res => {
        this.selected_team = res.data
      })
      this.$axios.get("/api/member/positions/teamId/" + teamId).then(res => {
        this.team_positions = res.data
      })
      this.$axios.get("/api/member/coach/teamId/" + teamId).then(res => {
        const coach = res.data.coaches
        let arr = []
        for (let i = 0; i < coach.length; i++) {
          if (coach[i].imageId !== null) {
            this.$axios.get("/api/image/" + coach[i].imageId).then(res => {
              let image_src = "/img/" + res.data.fileName
              arr.push({
                coach_obj: coach[i],
                image_src: image_src
              })
            })
          }else {
            arr.push({
              coach_obj: coach[i],
              image_src: null
            })
          }
        }
        this.coaches = arr
      })
      this.$axios.get("/api/member/teamId/" + teamId).then(res => {
        const member = res.data.members
        let arr = []
        for (let i = 0; i < member.length; i++) {
          if (member[i].imageId !== null) {
            this.$axios.get("/api/image/" + member[i].imageId).then(res => {
              let image_src = "/img/" + res.data.fileName
              arr.push({
                member_obj: member[i],
                image_src: image_src
              })
            })
          }else {
            arr.push({
              member_obj: member[i],
              image_src: null
            })
          }
        }
        this.members = arr
      })
    },
    updateSchoolAndSport() {
      this.$axios.get("/api/team/school/" + this.schoolId).then(res => {
        this.schoolAlias = res.data.alias
      })
      this.$axios.get("/api/team/sport/" + this.sportId).then(res => {
        this.sportName = res.data.name
      })
    }
  }
}
</script>
