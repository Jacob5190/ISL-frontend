<template>
<container fluid>
  <v-row>
    <v-col cols='6' offset='3'>
      <imageview></imageview>
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <container fluid>
    <v-file-input
      show-size
      label="Image Upload"
      v-model="file"
    ></v-file-input>
    <v-btn color="success" @click="uploadFile">Upload</v-btn>
  </container>
</container>
</template>

<script>
import imageview from '../components/imgViewer'
export default {
  components: {
    imageview
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    uploadFile() {
      if (this.file) {
        let formdata = new FormData()
        formdata.append('file', this.file)
        this.$axios.post('/api/image', formdata).then(() => {
          console.log("Upload successfully")
        })
      }else {
        console.log("Empty selection")
      }
    }
  }
}
</script>
