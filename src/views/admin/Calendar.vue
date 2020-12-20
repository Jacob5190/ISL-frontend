<template>
  <v-container>
    <v-card class="ma-8">
      <v-form>
        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
          ></v-date-picker>
        </v-menu>
        <v-text-field lable="Regular" placeholder="Event" v-model="title"></v-text-field>
        <v-btn color="success" @click="update">Update</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      date: null,
      title: null
    }
  },
  methods: {
    update() {
      let formdata = new FormData()
      formdata.append("date", this.date)
      formdata.append("title", this.title)
      this.$axios.post("/api/admin/calendar-event", formdata, {
        withCredentials: true
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>