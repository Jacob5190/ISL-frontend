<template>
  <v-container>
    <v-card>
      <v-tabs>
        <v-tab>Create School</v-tab>
        <v-tab-item>
          <v-card>
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
                <v-btn color="success" @click="uploadSchool">Create</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete School</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select
                    :items="this.schools"
                    label="School"
                    outlined
                    v-model="selected_id"
                    v-on:change="getSchoolById"
                    item-value="id"
                    item-text="alias">
                </v-select>
                <div v-if="selected_school != null">
                  <p> School name: {{ selected_school.schoolObj.name }} </p>
                </div>
                <v-btn color="warning" @click="deleteSchool">Delete</v-btn>
              </v-form>
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
  name: "adminSchool",
  data() {
    return {
      schools: [],
      new_alias: null,
      new_name: null,
      new_link: null,
      new_school_img: null,
      selected_id: null,
      selected_school: null,
      snackbar: false,
      snackbarMsg: null
    }
  },
  methods: {
    uploadSchool() {
      let formdata = new FormData()
      formdata.append("name", this.new_name)
      formdata.append("alias", this.new_alias)
      formdata.append("link", this.new_link)
      formdata.append("image", this.new_school_img)
      this.$axios.post("/api/admin/school", formdata).then(() => {
        this.openSnackbar("Upload school successfully.")
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
      if (confirm("Deleting school may cause unpredictable error in database, please make sure all other data related" +
          " to the selected school is deleted or disabled first before continuing this action.")) {
        if (this.selected_school != null) {
          this.$axios.delete('/api/admin/school/' + this.selected_school.id).then(() => {
            this.openSnackbar("Delete school successfully.")
          }).catch(() => {
            alert("Unknown error occurred.")
          })
        } else {
          alert("Delete school failed, please input correct values.")
        }
      }
    },
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  mounted() {
    this.getSchool()
  }
}
</script>

<style scoped>

</style>