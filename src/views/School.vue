<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer absolute permanent bottom>
          <v-list shaped nav>
            <v-list-group
              v-for="school in schools"
              :key="school.id"
              @click="showSchool(school.id)"
              prepend-icon="mdi-school"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ school.name }}</v-list-item-title>
              </template>
              <v-list-item link @click="handleRoute(school.id, 1)">
                <v-list-item-icon><v-icon>mdi-basketball</v-icon></v-list-item-icon>
                <v-list-item-title>Basketball</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="handleRoute(school.id, 2)">
                <v-list-item-icon><v-icon>mdi-soccer</v-icon></v-list-item-icon>
                <v-list-item-title>Football</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="handleRoute(school.id, 3)">
                <v-list-item-icon><v-icon>mdi-volleyball</v-icon></v-list-item-icon>
                <v-list-item-title>Volleyball</v-list-item-title>
              </v-list-item>
              <v-list-group sub-group no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Invitations</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  link
                  v-for="sport in invitations"
                  :key="sport.id"
                  @click="handleRoute(school.id, sport.id)"
                >
                <v-list-item-title v-text="sport.name"></v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="5">
        <v-card v-if="schoolName!=null" max-width="550px">
          <v-card-title>
            <span>{{ schoolName }}</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="openLink(schoolLink)" v-show="schoolLink!=null">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-card-title>
          <div class="pa-4">
          <v-img
            v-show="schoolImgPath != null"
            :src="schoolImgPath"
            contain
            class="ma-4"
          ></v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'School',
  data () {
    return {
      schools: [],
      invitations: [],
      schoolName: null,
      schoolLink: null,
      schoolImgPath: null
    }
  },
  mounted() {
    this.getSchoolList()
    this.getInvitationSportList()
  },
  methods: {
    handleRoute(schoolId, sportId) {
      this.$router.push({
          path: '/team',
          query: {
            schoolId: schoolId,
            sportId: sportId
          }
      })
    },
    getSchoolList() {
      this.$axios.get('/api/school').then(res => {
        const value = res.data
        let schools = []
        for (let i = 0; i < value.length; i++) {
          schools.push({
            id: value[i].id,
            name: value[i].alias
          })
        }
        this.updateSchoolList(schools)
      })
    },
    showSchool(schoolId) {
      this.$axios.get('/api/school/' + schoolId).then(res => {
        let schoolObj = res.data.schoolObj
        let imgObj = res.data.imgObj
        this.schoolName = (schoolObj.name!="") ? schoolObj.name : null
        this.schoolLink = (schoolObj.schoolLink!="") ? schoolObj.schoolLink : null
        this.schoolImgPath = (imgObj.fileName!="") ? "/imgs/" + imgObj.fileName : null

      })
    },
    getInvitationSportList() {
      this.$axios.get('/api/sport').then(res => {
        const value = res.data
        let invitation = []
        for (let i = 0; i < value.length; i++) {
          invitation.push({
            id: value[i].id,
            name: value[i].name
          })
        }
        this.updateInvitationSportList(invitation)
      })
    },
    updateSchoolList(schools) {
      this.schools = schools
    },
    updateInvitationSportList(sports) {
      this.invitations = sports
    },
    openLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>
