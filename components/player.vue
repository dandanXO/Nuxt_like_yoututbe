<template>
<div>
  <v-btn  flat color="orange"  @click="setandplay()"    slot="activator">
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
      autoplay: 1
    }
  },
  computed: {
    loading () {
      return  this.$store.getters['list/getloading'] 
    }
  },
  methods:{
    setandplay (){
        this.$store.dispatch('player/play',{video:this.video,autoplay:this.autoplay})
    }
  }
  
}
</script>
