<template>
  <v-layout   row wrap>
    <v-flex xs12 >
      <div class="text-xs-center">
        <logo/>
        <vuetify-logo/>
      </div>
      <v-card >
        <v-card-title class="headline">Welcome to the Vuetify + Nuxt.js like-youtube</v-card-title>
        <v-card-text>
          <p>This a example to underesting how nuxt work so I make this.</p>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/search">find some more</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-flex>
    <v-flex sm6
      v-for="item in reults.items"
      :key="item.id.videoId">
        <v-card >
            <v-card-media src="" height="400px">
            <iframe width=100% height=100% :src="'https://www.youtube.com/embed/'+item.id.videoId" allowfullscreen></iframe>
            </v-card-media>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{item.snippet.title}}</h3>
                <p>{{item.snippet.description}}</p>
            </div>
            </v-card-title>
            <v-card-actions>
            <addtolist :video="item"></addtolist>
            <v-btn flat color="orange" :href="'https://www.youtube.com/embed/'+item.id.videoId">Full</v-btn>
            <player :video="item"></player>
            </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

import axios from 'axios'
import addtolist from '~/components/addtolist.vue'
import player from '~/components/player.vue'
export default {
  components: {
    Logo,
    VuetifyLogo,
    addtolist,
    player
  },
  async asyncData ({store}) {
    let {data} = await axios.get('http://dandan.tw:3000/api/dashboard')
    //console.log({data})
    store.dispatch('list/setlists')
    return {  reults: {data}.data[1] }
  }
  
}
</script>
