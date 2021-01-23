<template>
  <v-container>
    <v-card outlined>
      <v-tabs>
        <v-tab>Upload Image</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select
                    :items="sports"
                    v-model="selected_sport"
                    item-text="name"
                    item-value="id"
                    label="Sport Type" outlined
                ></v-select>
                <v-file-input
                    show-size
                    label="Image File"
                    v-model="file"
                    accept="image/*"
                ></v-file-input>
                <v-btn color="success" @click="uploadImage">Upload</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete Gallery</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select
                    :items="sports"
                    v-model="selected_sport"
                    item-text="name"
                    item-value="id"
                    label="Sport Type" outlined
                    v-on:change="this.getImageBySportId"
                ></v-select>
                <v-select
                    v-if="selected_sport != null"
                    :items="images"
                    v-model="selected_image"
                    item-text="id"
                    return-object
                    label="Image Id" outlined
                ></v-select>
                <div v-if="selected_image != null" class="d-flex">
                  <v-card tile flat>
                    <v-img :src=imagePath contain height="200px" width="250px"></v-img>
                  </v-card>
                </div>
                <v-btn color="warning" @click="deleteImage" class="mt-4">Delete</v-btn>
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
  name: "adminGallery",
  data() {
    return {
      file: null,
      sports: [],
      images: [],
      selected_sport: null,
      selected_image: null,
      snackbar: false,
      snackbarMsg: null
    }
  },
  methods: {
    getSport() {
      this.$axios.get('/api/sport').then(res => {
        this.sports = res.data
      })
    },
    getImageBySportId() {
      this.$axios.get('/api/image/sportId/' + this.selected_sport).then(res => {
        this.images = res.data
      })
    },
    uploadImage() {
      if (this.file) {
        let formdata = new FormData()
        formdata.append('file', this.file)
        formdata.append('sportId', this.selected_sport)
        this.$axios.post('/api/admin/gallery', formdata).then(() => {
          this.openSnackbar("Upload Image successfully")
        })
      }else {
        alert("Empty selection")
      }
    },
    deleteImage() {
      if (this.selected_image != null) {
        this.$axios.delete('/api/admin/image/' + this.selected_image.id).then(() => {
          this.openSnackbar("Delete image successfully.")
          this.getImageBySportId()
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete image failed, please input correct values.")
      }
    },
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  mounted() {
    this.getSport()
  },
  computed: {
    imagePath: function () {
      return "/imgs/" + this.selected_image.fileName
    }
  }
}
</script>