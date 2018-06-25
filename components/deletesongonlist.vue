<template>
<div>
  <v-btn   color="red" @click.native.stop="deletesongonlist = true"  slot="activator">
      delete
  </v-btn>
  <v-dialog v-model="deletesongonlist"   max-width='208'>
    <v-layout row wrap>
      <v-card>
          <v-card-title class="headline">Delete Songs</v-card-title>
          <v-card-text> 
              Do you want delete songs ?
              {{$nuxt.$route.params}}
              {{songId}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="deletelistsong"  @click.native="deletesongonlist = false;$nuxt.$router.push({path: '/', replace: true})">yes</v-btn>
            <v-btn color="red darken-1" flat="flat" @click.native="deletesongonlist = false" >cancel</v-btn>
          </v-card-actions>
          <alert v-show="alertshow" :message="'test message'" :success="true"></alert>
      </v-card>
    </v-layout>
  </v-dialog>
</div>
</template>

<script>

//import
import alert from '~/components/alert.vue'

export default {
  components:{
    alert
  },
  props: ['songId']
  ,
  data () {
    return {
      deletesongonlist: false,
      title:'',
      id:'',
      listname:"",
      choselistname: "",
      alertshow: false
    }
  },
  methods:{
    deletelistsong(){
          this.$store.dispatch('list/deletesongonlist',{songId:this.songId,listname:$nuxt.$route.params.id})
    }
  }
  
}
</script>
