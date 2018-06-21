<template>
<div>
  <v-btn  flat color="orange"  @click="setandplay()"  slot="activator">
      play
  </v-btn>
</div>
</template>

<script>

//import


export default {
  components:{
  },
  props: ['video'],
  data () {
    return {
      id:this.video.id.videoId,
    }
  },
  computed: {
    loading () {
      return  this.$store.getters['list/getloading'] 
    }
  },
  methods:{
    setandplay (){
        console.log(this.id)
         this.$store.dispatch('player/play',this.id)
    }
  }
  
}
</script>
