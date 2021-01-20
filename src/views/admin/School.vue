<template>
  <v-container>
      <!-- TODO: Finish school admin page
            change alert to snackbar -->
    <v-tabs>
      <v-tab>Upload School</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" v-model="new_name" hint="The full name of the school"></v-text-field>
              <v-text-field label="Alias" v-model="new_alias" hint="The shortened name of the school"></v-text-field>
              <v-text-field label="Link" v-model="new_link" hint="The link to the official website of the school"></v-text-field>
              <v-file-input
                  show-size
                  label="Image Upload"
                  v-model="new_school_img"
              ></v-file-input>
              <v-btn color="success" @click="upload">Upload</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Delete School</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <!--TODO: Change from showing id to showing school alias-->
              <v-select :items="schoolId" label="ID" outlined v-model="selected_id" v-on:change="getSchoolById"></v-select>
              <div v-if="selected_school != null">
                <p> School name: {{ selected_school.schoolObj.name }} </p>
                <p> School alias: {{ selected_school.schoolObj.alias }} </p>
              </div>
              <v-btn color="warning" @click="deleteSchool">Delete</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "adminSchool",
  data() {
    return {
      schools: [],
      new_alias: null,
      new_name: null,
      new_link: null,
      new_school_img: null,
      selected_id: null,
      selected_school: null
    }
  },
  methods: {
    upload() {
      let formdata = new FormData()
      formdata.append("name", this.new_name)
      formdata.append("alias", this.new_alias)
      formdata.append("link", this.new_link)
      formdata.append("image", this.new_school_img)
      this.$axios.post("/api/admin/school", formdata).then(() => {
        alert("Upload school successfully.")
      })
    },
    getSchool() {
      this.$axios.get('/api/school').then(res => {
        this.schools = res.data
      })
    },
    getSchoolById() {
      if (this.selected_id == null) {
        alert("Please selected a valid school id")
      } else {
        this.$axios.get('/api/school/' + this.selected_id).then(res => {
          this.selected_school = res.data
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      }
    },
    deleteSchool() {
      if (this.selected_id != null) {
        this.$axios.delete('/api/admin/school/' + this.selected_id).then(() => {
          alert("Delete school successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete school failed, please input correct values.")
      }
    }
  },
  mounted() {
    this.getSchool()
  },
  computed: {
    schoolId: function () {
      let arr = []
      for (let i = 0; i < this.schools.length; i++) {
        arr.push({ 'text': this.schools[i].id.toString() })
      }
      return arr
    }
  }
}
</script>

<style scoped>

</style>