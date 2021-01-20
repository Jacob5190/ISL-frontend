<template>
  <v-container>
    <v-tabs>
      <v-tab>Upload Image</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-file-input
                  show-size
                  label="Image Upload"
                  v-model="file"
              ></v-file-input>
              <v-select
                  :items="sports"
                  v-model="selected_sport"
                  item-text="name"
                  item-value="id"
                  label="ID" outlined
              ></v-select>
              <v-btn color="success" @click="uploadImage">Upload</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Delete Gallery</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-select
                  :items="images"
                  v-model="selected_image"
                  item-text="id"
                  return-object
                  label="Sport Type" outlined
              ></v-select>
              <div v-if="selected_image != null" class="d-flex">
                <v-card tile outlined>
                  <v-img :src=imagePath contain height="200px" width="250px"></v-img>
                </v-card>
              </div>
              <v-btn color="warning" @click="deleteImage" class="mt-4">Delete</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
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
      selected_image: null
    }
  },
  methods: {
    getSport() {
      this.$axios.get('/api/sport').then(res => {
        this.sports = res.data
      })
    },
    getImage() {
      this.$axios.get('/api/image').then(res => {
        this.images = res.data
      })
    },
    uploadImage() {
      if (this.file) {
        let formdata = new FormData()
        formdata.append('file', this.file)
        formdata.append('sportId', this.selected_sport)
        this.$axios.post('/api/admin/gallery', formdata).then(() => {
          console.log("Upload successfully")

        })
      }else {
        console.log("Empty selection")
      }
    },
    deleteImage() {
      if (this.selected_image != null) {
        this.$axios.delete('/api/admin/image/' + this.selected_image.id).then(() => {
          alert("Delete image successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete image failed, please input correct values.")
      }
    }
  },
  mounted() {
    this.getImage()
    this.getSport()
  },
  computed: {
    imagePath: function () {
      console.log(this.selected_image)
      return "/imgs/" + this.selected_image.fileName
    }
  }
}
</script>