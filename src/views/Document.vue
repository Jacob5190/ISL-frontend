<template>
  <v-card>
    <v-container fluid>
      <v-list shaped>
        <v-subheader>DOCUMENTS</v-subheader>
        <v-list-item-group v-model="selected" color="primary">
          <v-list-item v-for="(doc, i) in docs" :key="i" @click="downloadDocs(doc)">
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ doc.fileName }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    selected: null,
    docs: []
  }),
  mounted: function() {
    const url = "/api/document"
    this.$axios.get(url).then(res => {
      const value = res.data
      console.log(value)
      let result = []
      for (let i = 0; i < value.length; i++) {
        result.push({
          fileName: value[i].originalFileName,
          src: "/doc/" + value[i].fileName
        })
      }
      this.updateDocs(result)
    })
  },
  methods: {
    updateDocs(docs) {
      this.docs = docs
    },
    downloadDocs(doc) {
      console.log(doc.src)
      let a = document.createElement('a')
      a.href = doc.src
      a.download = doc.fileName
      a.click();
    },

  }
}
</script>
