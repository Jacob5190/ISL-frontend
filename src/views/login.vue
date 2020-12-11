<template>
    <v-container fluid>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <v-text-field
                v-model="username"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :type="showpw ? 'text' : 'password'"
                :append-icon="showpw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpw = !showpw"
            ></v-text-field>
            <v-btn color="success" @click="login">Login</v-btn>
            <v-btn @click="reset">Clear</v-btn>
        </v-form>
    </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      username: null,
      password: null,
      showpw: false
    }
  },
  methods: {
    login() {
      this.$axios("/admin/login")
      console.log("username: " + this.username)
      console.log("password: " + this.password)
    },
    reset() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>