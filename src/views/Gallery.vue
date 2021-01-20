<!--TODO: Rebuild Gallery page with separate categories-->
<template>
  <v-card>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols='6'>
          <imageview></imageview>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
        formdata.append('sportId')
        this.$axios.post('/api/admin/image', formdata).then(() => {
          console.log("Upload successfully")

        })
      }else {
        console.log("Empty selection")
      }
    }
  }
}
</script>
