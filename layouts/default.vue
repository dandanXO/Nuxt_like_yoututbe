<template>
  <v-app primary>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Your Lists (click me Switch)</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile
          router
          :to="'/user/signin'"
        >
          <v-list-tile-action>
            <v-icon v-html="'arrow_right_alt'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/user/signup'"
        >
          <v-list-tile-action>
            <v-icon v-html="'perm_contact_calendar'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon v-html="'perm_contact_calendar'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          router
          :to="'/list/'+list"
          :key="i"
          v-for="(list, i) in getlist"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="'apps'"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="list"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <no-ssr  placeholder="Loading...">
        <youtube  @ready="ready" @ended="ended"  @playing="playing" @paused="paused" :player-vars="{ autoplay: autoplay }" :player-width="1" :player-height="1" :video-id="playId" />
      </no-ssr>
      <player_setting :playlist="playlist"></player_setting>
      
      <v-btn @click="previousSong" color="blue" dark>
        previous
        <v-icon dark right>skip_previous</v-icon>
      </v-btn>
      <v-btn @click="play"  dark>
        play
        <v-icon>play_arrow</v-icon>
      </v-btn>
      <v-btn @click="pause" dark>
        pause
        <v-icon>pause</v-icon>  
      </v-btn>
      <v-btn @click="nextSong"  color="blue" dark>
        next
        <v-icon>skip_next</v-icon>
      </v-btn>
      <span class="display-2">Now {{status}} </span> 
      {{ getvideotitle}}
    </v-footer>
  </v-app>
</template>

<script>
  import player_setting from '~/components/playersetting.vue'

  export default {
    components:{
      player_setting
    },
    data() {
      return {
        clipped: true,
        drawer: true,
        fixed: true,
        items: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'search', title: 'search', to: '/search' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Like Youtubes',
        status: 'playing',
        songsorder: this.$store.getters['player/playlist'].songsorder
      }
    },
    computed:{
      getlist () { 
        return  this.$store.getters['list/getlists'] 
        } ,
      playId(){ 
        return  this.$store.getters['player/playId'] 
      },
      autoplay() {
        return this.$store.getters['player/autoplay'] 
      },
      getvideotitle(){
        return this.$store.getters['player/getvideotitle'] 
      },
      playlistsongsorder() {
        return this.$store.getters['player/playlist'].songsorder
      },
      playlist() {
        return this.$store.getters['player/playlist'].playlist
      }
      
    },
    created: function() {
      this.$store.dispatch('list/setlists') 
    },
    mounted: function(player){
      this.player = player
    },
    methods:{
      onLogout () {
        this.$store.dispatch('users/logout') 
      },
      ready (player) {
        this.player = player
      },
      playing(palyer){
        this.status='playing'
        console.log('playing')
      },
      ended(player){
       
        this.songsorder = this.songsorder +1
        if(this.playlist.length ==  this.songsorder){
            console.log('end of list')
            this.songsorder = 0
        }
        
        if(this.playlist != ''){
          this.$store.dispatch('player/playlist',{songs:this.playlist,songsorder:this.songsorder})
        }else{
           console.log('song is end ')
        }
      },
      paused(player){
        this.status='pause'
      },
      play () {
        this.player.playVideo()
      },
      pause () {
        this.player.pauseVideo()
      },
      nextSong(){
        this.songsorder = this.songsorder +1
        if(this.playlist.length ==  this.songsorder){
            //console.log('end of list')
            this.songsorder = 0
        }
        
        if(this.playlist != ''){
          this.$store.dispatch('player/playlist',{songs:this.playlist,songsorder:this.songsorder})
        }else{
          //console.log('song is end ')
        }
      },
      previousSong(){
        this.songsorder = this.songsorder - 1
        console.log(this.songsorder)
        if(-1 ==  this.songsorder){
            //console.log('start of list')
            this.songsorder = this.playlist.length-1
        }
        
        if(this.playlist != ''){
          this.$store.dispatch('player/playlist',{songs:this.playlist,songsorder:this.songsorder})
        }else{
           console.log('song is end ')
        }
      }
    }
  }
</script>
