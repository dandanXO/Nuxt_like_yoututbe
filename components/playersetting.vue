<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn slot="activator" color="purple" dark>Setting</v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>playing list</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card>
        <v-list two-line>
          <template v-for="(song, index) in this.playlist">
            <v-list-tile :key="song.id" avatar ripple>
              <player :video="undefined" :videoLisSong="song"></player>
              <v-list-tile-content>
                <v-list-tile-title>{{ song.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ song.id }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action  @click="toggle(index,song.id)">
                <v-list-tile-action-text>{{ song.title }}</v-list-tile-action-text>
                <v-icon v-if="song.fevorite||selected.indexOf(index) < 0" color="grey lighten-1">
                  favorite_border
                </v-icon>
                <v-icon v-else color="pink lighten-2">
                 favorite
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < playlist.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>      
    </v-card>
  </v-dialog>
</template>


<script>
import player from '~/components/player.vue'
export default {
  components:{
    player
  },
  props: ["playlist"],
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      selected: [2],
    };
  },
  computed:{
    fevorite(){
        return  this.$store.getters['users/getUserMessages'].signinStatus
    }
  },
  methods: {
    toggle(index,id) {
      const i = this.selected.indexOf(index);
      if (i > -1) {
        //not like
        this.selected.splice(i, 1);
        this.$store.dispatch("song/removeFevoriteSong", {
        listName:this.$store.getters['player/playlist'].playlistName,
        id: id,
        uid: this.$store.getters['users/getUserMessages'].user.uid
        })
       
      } else {
        //like
        this.selected.push(index);
        this.$store.dispatch("song/setFevoriteSong", {
        listName:this.$store.getters['player/playlist'].playlistName,
        id: id,
        uid: this.$store.getters['users/getUserMessages'].user.uid
        })
      }
    }
  }
};
</script>