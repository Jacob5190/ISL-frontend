<template>
  <v-container>
    <v-tabs>
      <v-tab>Upload Calendar Event</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
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
              <v-btn color="success" @click="uploadEvent">Upload</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>Delete Calendar Event</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-select :items="eventId" label="ID" outlined v-model="selected_id" v-on:change="getCalendarEventById"></v-select>
              <div v-if="selected_event != null">
                <p> Event: {{ selected_event.title }} </p>
                <p> Date: {{ selected_event.date }} </p>
              </div>
              <v-btn color="warning" @click="deleteCalendarEvent">Delete</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "adminCalendar",
  data() {
    return {
      calendarEvents: [],
      date: null,
      title: null,
      selected_id: null,
      selected_event: null
    }
  },
  methods: {
    getCalendarEvent() {
      this.$axios.get('/api/calendar-event').then(res => {
        this.calendarEvents = res.data
      })
    },
    uploadEvent() {
      let formdata = new FormData()
      formdata.append("date", this.date)
      formdata.append("title", this.title)
      this.$axios.post("/api/admin/calendar-event", formdata).then(res => {
        console.log(res.data)
      })
    },
    getCalendarEventById() {
      if (this.selected_id == null) {
        alert("Please select event id")
      } else {
        this.$axios.get('/api/calendar-event/' + this.selected_id).then(res => {
          this.selected_event = res.data
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      }
    },
    deleteCalendarEvent() {
      if (this.selected_id != null) {
        this.$axios.delete('/api/admin/calendar-event/' + this.selected_id).then(() => {
          alert("Delete calendar event successfully.")
        }).catch(() => {
          alert("Unknown error occurred.")
        })
      } else {
        alert("Delete calendar event failed, please input correct values.")
      }
    }
  },
  mounted() {
    this.getCalendarEvent()
  },
  computed: {
    eventId: function () {
      let arr = []
      for (let i = 0; i < this.calendarEvents.length; i++) {
        arr.push({ 'text': this.calendarEvents[i].id.toString() })
      }
      return arr
    }
  }
}
</script>