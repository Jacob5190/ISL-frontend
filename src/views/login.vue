<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="6">
        <v-card outlined class="pa-10">
          <h2 class="text-center mb-6">ISL Administrator Login</h2>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
                v-model="username"
                outlined
                dense
            ></v-text-field>
            <v-text-field
                v-model="password"
                outlined
                dense
                :type="showpw ? 'text' : 'password'"
                :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpw = !showpw"
            ></v-text-field>
            <v-btn color="success" @click="login" class="mr-4">Login</v-btn>
            <v-btn @click="reset">Clear</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      showpw: false
    }
  },
  methods: {
    login() {
      let formdata = new FormData()
      formdata.append('username', this.username)
      formdata.append('password', this.password)
      this.$axios.post("/api/login", formdata).then(res => {
        alert(res.data.msg)
        this.$store.commit('login')
        this.$router.push("/admin")
      }).catch(error => {
        alert(error.response.data.msg)
      })
    },
    reset() {
      this.username=""
      this.password=""
    }
  }
}
</script>