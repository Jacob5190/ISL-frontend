<template>
  <v-container>
    <v-card outlined>
      <v-tabs>
        <v-tab>Upload Document</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-file-input
                    show-size
                    label="Document File"
                    v-model="file"
                ></v-file-input>
                <v-btn color="success" @click="uploadFile">Upload</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete Document</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select
                    :items="this.documents"
                    label="Document Name"
                    outlined
                    v-model="selected_id"
                    v-on:change="getDocumentById"
                    item-value="id"
                    item-text="originalFileName">
                </v-select>
                <v-btn color="warning" @click="deleteDocument">Delete</v-btn>
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
  name: "Document",
  data() {
    return {
      documents: [],
      file: null,
      selected_id: null,
      selected_document: null,
      snackbar: false,
      snackbarMsg: null
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
          this.openSnackbar("Upload document successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Upload document failed, please select a valid file.")
      }
    },
    getDocumentById() {
      if (this.selected_id == null) {
        alert("Please select a valid document id")
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
          this.openSnackbar("Delete document successfully.")
          this.getDocument()
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete document failed, please input correct values.")
      }
    },
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  mounted() {
    this.getDocument()
  }
}
</script>