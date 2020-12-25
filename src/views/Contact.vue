<template>
<v-container>
  <v-row v-for="obj in info" :key='obj.name' justify="center">
    <v-col cols="8">
      <v-card class="pa-4" outlined>
        <p class="display-1 text--primary">{{ obj.title }}</p>
        <div class="text--primary">
          <v-icon></v-icon>
          <p>{{ obj.name }} - {{ obj.school }}</p>
          <a v-if='obj.extra !== ""'>{{ obj.extra }}</a>
        </div>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  data () {
    return {
      info: [
        {
          title: 'ISL Chair',
          name: 'Luke Walker',
          school: 'SCIE',
          extra: 'luke.walker@scie.com.cn'
        },
        {
          title: 'Co-Chair',
          name: 'Robert Nowak',
          school: 'MIS',
          extra: 'Robert.nowak@merchiston.cn'
        },
        {
          title: 'Co-Chair',
          name: 'Leon Tkachyk',
          school: 'VMA',
          extra: 'leontkachyk@vma.edu.cn'
        },
        {
          title: 'Treasurer',
          name: 'Ed Dawes',
          school: 'SCIE',
          extra: ''
        },
        {
          title: 'Under 11 Coordinator',
          name: 'Andy Pounds',
          school: 'MIS',
          extra: ''
        }
      ]
    }
  },
  mounted() {
    this.$axios.get("/api/contact").then(res => {
      console.log(res.data)
      this.info = res.data
    })
  }
}
</script>

<style scoped>
strong, p {
  font-size: 1.2em
}
</style>
