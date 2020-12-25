<template>
  <v-container>
    <v-tabs>
      <v-tab>Upload Document</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-file-input
                  show-size
                  label="File Upload"
                  v-model="file"
              ></v-file-input>
              <v-btn color="success" @click="uploadFile">Upload</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Delete Document</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-select :items="documentId" label="ID" outlined v-model="selected_id" v-on:change="getDocumentById"></v-select>
              <div v-if="selected_document != null">
                <p> File name: {{ selected_document.originalFileName }} </p>
              </div>
              <v-btn color="warning" @click="deleteDocument">Delete</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "Document",
  data() {
    return {
      documents: [],
      file: null,
      selected_id: null,
      selected_document: null,
    }
  },
  methods: {
    getDocument() {
      this.$axios.get('/api/document').then(res => {
        this.documents = res.data
      })
    },
    uploadFile() {
      if (this.file) {
        let formdata = new FormData()
        formdata.append('file', this.file)
        this.$axios.post('/api/admin/document', formdata, {
          withCredentials: true
        }).then(() => {
          alert("Upload document successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Upload document failed, please select a valid file.")
      }
    },
    getDocumentById() {
      if (this.selected_id == null) {
        alert("Please select document id")
      } else {
        this.$axios.get('/api/document/' + this.selected_id).then(res => {
          this.selected_document = res.data
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      }
    },
    deleteDocument() {
      if (this.selected_id != null) {
        this.$axios.delete('/api/admin/document/' + this.selected_id).then(() => {
          alert("Delete document successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete document failed, please input correct values.")
      }
    }
  },
  mounted() {
    this.getDocument()
  },
  computed: {
    documentId: function () {
      let arr = []
      for (let i = 0; i < this.documents.length; i++) {
        arr.push({ 'text': this.documents[i].id.toString() })
      }
      return arr
    }
  }
}
</script>