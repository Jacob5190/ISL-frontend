<template>
  <v-container>
    <v-card outlined>
      <v-tabs>
        <v-tab>Create Contact</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-text-field label="Title" v-model="new_title"></v-text-field>
                <v-text-field label="Name" v-model="new_name"></v-text-field>
                <v-text-field label="School" v-model="new_school"></v-text-field>
                <v-text-field label="Email" hint="Leave empty if not available" v-model="new_email"></v-text-field>
                <v-btn color="success" @click="uploadContact">Create</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Update Contact</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select :items="contactId" label="ID" outlined v-model="selected_id" @change="getContactById"></v-select>
                <div v-if="selected_contact != null">
                  <p> Title: {{ selected_contact.title }} </p>
                  <p> Name: {{ selected_contact.name }} </p>
                  <p> School: {{ selected_contact.school }} </p>
                  <p> Email: {{ selected_contact.extra }} </p>
                </div>
                <v-text-field label="Title" v-model="title"></v-text-field>
                <v-text-field label="Name" v-model="name"></v-text-field>
                <v-text-field label="School" v-model="school"></v-text-field>
                <v-text-field label="Email" hint="Leave empty if not available" v-model="email"></v-text-field>
                <v-btn color="success" @click="update">Update</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab>Delete Contact</v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form>
                <v-select :items="contactId" label="ID" outlined v-model="selected_id" v-on:change="getContactById"></v-select>
                <div v-if="selected_contact != null">
                  <p> Title: {{ selected_contact.title }} </p>
                  <p> Name: {{ selected_contact.name }} </p>
                  <p> School: {{ selected_contact.school }} </p>
                  <p> Email: {{ selected_contact.extra }} </p>
                </div>
                <v-btn color="warning" @click="deleteContact">delete</v-btn>
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
  name: "adminContact",
  data() {
    return {
      contacts: [],
      selected_id: null,
      selected_contact: null,
      title: null,
      name: null,
      school: null,
      email: null,
      new_title: null,
      new_name: null,
      new_school: null,
      new_email: null,
      snackbar: false,
      snackbarMsg: null
    }
  },
  mounted() {
    this.getContact()
  },
  methods: {
    getContact() {
      this.$axios.get('/api/contact').then(res => {
        this.contacts = res.data
      })
    },
    update() {
      if (this.selected_id != null && this.title != null && this.name != null && this.school != null) {
        this.$axios.put('/api/admin/contact', {
          'id': this.selected_id,
          'title': this.title,
          'name': this.name,
          'school': this.school,
          'extra': this.email
        }).then(() => {
          this.openSnackbar("Update contact info successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Update contact info failed, please input correct values.")
      }
    },
    getContactById() {
      if (this.selected_id == null) {
        alert("Please select contact id")
      } else {
        this.$axios.get('/api/contact/' + this.selected_id).then(res => {
          this.selected_contact = res.data
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      }
    },
    deleteContact() {
      if (this.selected_id != null) {
        this.$axios.delete('/api/admin/contact/' + this.selected_id).then(() => {
          this.openSnackbar("Delete contact info successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete contact info failed, please input correct values.")
      }
    },
    uploadContact() {
      if (this.new_title != null && this.new_name != null && this.new_school != null) {
        this.$axios.post('/api/admin/contact', {
          'title': this.new_title,
          'name': this.new_name,
          'school': this.new_school,
          'extra': this.new_email
        }).then(() => {
          this.openSnackbar("Upload new contact info successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Upload contact info failed, please input correct values.")
      }
    },
    openSnackbar(message) {
      this.snackbarMsg = message
      this.snackbar = true
    }
  },
  computed: {
    contactId: function () {
      let arr = []
      for (let i = 0; i < this.contacts.length; i++) {
        arr.push({ 'text': this.contacts[i].id.toString() })
      }
      return arr
    }
  }
}
</script>