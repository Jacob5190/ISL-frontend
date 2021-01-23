<template>
  <v-container>
    <v-card outlined>
      <v-tabs>
        <v-tab>Upload Result</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-btn color="success">Upload</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete Result</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-btn color="warning">Delete</v-btn>
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
  name: "adminResult",
  methods: {
    update() {},
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  data() {
    return {
      snackbarMsg: null,
      snackbar: false
    }
  },
}
</script>

<style scoped>

</style>