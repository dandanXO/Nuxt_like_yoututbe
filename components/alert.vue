<template>
  <div>
    <v-alert v-model="alert" type="success" dismissible>
     {{message}}
    </v-alert>
  </div>
</template>

<script>
  export default {
    props: ['message','success'],
    data () {
      return {
        alert: true
      }
    }
  }
</script>