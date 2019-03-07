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
            <v-list-tile :key="song.id" avatar ripple @click="toggle(index)">
              <player :video="undefined" :videoLisSong="song"></player>
              <v-list-tile-content>
                <v-list-tile-title>{{ song.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ song.id }}</v-list-tile-sub-title>
                 
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ song.title }}</v-list-tile-action-text>
                <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1"></v-icon>
                <v-icon v-else color="yellow darken-2">star</v-icon>
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
      selected: [2]
    };
  },
  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);
      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        this.selected.push(index);
      }
    }
  }
};
</script>