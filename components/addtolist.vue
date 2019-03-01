<template>
<div>
  <v-btn  flat color="orange" @click.native.stop="addtolist = true" @click="setlists()"  slot="activator">
      add to list
  </v-btn>
  <v-dialog v-model="addtolist"   max-width="500px">
    <v-layout row wrap>
      <v-card>
          <v-card-title class="headline">{{video.snippet.title}}</v-card-title>
          <v-card-text> description: {{video.snippet.description}}
            <v-layout row wrap>
              <v-flex  xs8  justify-space-between>
                <v-text-field label="list name" required v-model="listname"></v-text-field>
                List Name : {{listname}}
              </v-flex>
              <v-flex  xs4  justify-space-between>
                <v-btn color="blue"   @click="createlist()"  :disabled="!listnameIsValid||!getUserMessage">create</v-btn>
              </v-flex>
              <v-flex xs12>
                <v-select 
                  :items="getlist"
                  v-model="choselistname"
                  label="list"
                  required>
                </v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat"  @click="addSongTolist" @click.native="alertshow=true"  :loading="loading" :disabled="!getUserMessage||loading||!choselistnameIsValid"  >add</v-btn>
            <v-btn color="red darken-1" flat="flat" @click.native="addtolist = false" >cancel</v-btn>
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
  props: ['video'],
  data () {
    return {
      addtolist: false,
      title:this.video.snippet.title,
      id:this.video.id.videoId,
      listname:"",
      choselistname: "",
      alertshow: false
    }
  },
  computed: {
    getlist () { 
      return  this.$store.getters['list/getlists'] 
    },
    listnameIsValid () {
      return this.listname !==''
    },
    choselistnameIsValid () {
       return this.choselistname !==''
    },
    loading () {
      return  this.$store.getters['list/getloading'] 
    },
    getUserMessage(){
       return  this.$store.getters['users/getUserMessages'].signinStatus
    }
    
  },
  methods:{
    addSongTolist(){
      console.log(this.title+this.id)
      this.$store.dispatch('list/addsongtolist',{choselistname:this.choselistname,title:this.title,id:this.id})
    },
    setlists(){
      this.$store.dispatch('list/setlists')
    },
    createlist(){
      this.$store.dispatch('list/createlist',this.listname)
    }
  }
  
}
</script>
