<template>
<v-container fluid>
  <v-row>
    <v-col
      v-for="img in imgs"
      :key="img.src"
      class="d-flex child-flex"
      cols="3"
      >
      <v-card tile class="d-flex pa-2">
        <v-img :src='img.src' contain>
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
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data: () => ({
    imgs: []
  }),
  mounted () {
    this.$axios.get('/api/image').then(res => {
      const value = res.data
      let paths = []
      for (let i = 0; i < value.length; i++) {
        paths.push({
          src: "/img/" + value[i].fileName
        })
      }
      this.updateImage(paths)
    })
  },
  methods: {
    updateImage (images) {
      this.imgs = images
    }
  }
}
</script>