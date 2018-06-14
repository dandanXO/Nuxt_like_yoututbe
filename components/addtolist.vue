<template>
<div>
  <v-btn  flat color="orange" @click.native.stop="addtolist = true"  slot="activator">
      add to list
  </v-btn>
  <v-dialog v-model="addtolist"   max-width="500px">
   
        <v-card>
        <v-card-title class="headline">{{video.snippet.title}}</v-card-title>
        <v-card-text>{{video.snippet.description}}</v-card-text>
        <p>ID: {{video.id.videoId}}</p> 
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="addtolist = false">add</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="addtolist = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: ['video'],
  data () {
    return {
      addtolist: false,
      editableDate: null
    }
  }
}
</script>
