<template>
  <div>
    <v-btn flat color="orange" @click="setandplay()" slot="activator">play</v-btn>
  </div>
</template>

<script>
//import

export default {
  components: {},
  props: ["video", "videoLisSong"],
  data() {
    return {
      autoplay: 1
    };
  },
  computed: {
    loading() {
      return this.$store.getters["list/getloading"];
    }
  },
  methods: {
    setandplay() {
      console.log("test");
      if (this.video) {
        console.log("video");
        this.$store.dispatch("player/play", {
          video: this.video,
          autoplay: this.autoplay
        });
        return;
      }
      if (this.videoLisSong) {
        console.log(this.videoLisSong);
        this.$store.dispatch("player/play", {
          video: {
            id: {
              videoId: this.videoLisSong.id
            },
            snippet:{
              title:this.videoLisSong.title
            }
          },
          autoplay: this.autoplay
        });
      }
    }
  }
};
</script>
