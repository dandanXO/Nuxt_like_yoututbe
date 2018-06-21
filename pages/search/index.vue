<template>
  <v-container align-content>
        <v-layout row wrap>
            <v-flex xs12 >
                <v-card-text id="display-4font">
                    <p class="text-xs-center display-3">Search what you want</p>
                </v-card-text>
            </v-flex>
               <v-flex xs12 >
             <v-toolbar>
                <v-text-field hide-details single-line v-model="searchWords"></v-text-field>
                <v-btn icon @click="search()">
                    <v-icon>search</v-icon>
                </v-btn>
                </v-toolbar>
                <div>
                    <p  class="text-xs-center display-1">Your Searching for {{searchWords}}</p>
                </div>
        </v-flex>
        </v-layout>
        <v-layout  row wrap>
            <v-flex sm6
            v-for="item in dataOfSearch.items"
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
                <player  :video="item"></player>
                </v-card-actions>
            </v-card>
            </v-flex>
            <v-btn v-if="dataOfSearch.prevPageToken" @click="prePage()" color="info">prev page </v-btn>
                <v-spacer  v-if="dataOfSearch.prevPageToken"></v-spacer>
            <v-btn class="text-xs-right" left v-if="dataOfSearch.nextPageToken" @click="nextPage()" color="info">next page </v-btn>
         
            
        </v-layout>
    </v-container>
</template>

<script>

//import
import axios from 'axios'


import addtolist from '~/components/addtolist.vue'
import player from '~/components/player.vue'
export default {
    components: {
            addtolist,
            player
        },
    async asyncData(context) {
       return  {}    },
    computed: {
        number () {
        return this.$store.state.counter
      },
    },
    methods:{
        search(){
            const searchWords = this.searchWords
            axios.get('http://dandan.tw:3000/api/search',{
                headers: {
                },
                params: {
                    q: searchWords
                }
            })
            .then((respo) => {
                this.dataOfSearch =respo.data[1]
                if(respo.data[1].nextPageToken){
                    this.nextPageToken=respo.data[1].nextPageToken
                }
                console.log(this.dataOfSearch)
            })
            .catch(e =>{
                console.log(e)
            })
        },
        nextPage(){
            const nextPageToken = this.nextPageToken
            axios.get('http://dandan.tw:3000/api/search/nextpage',{
                headers: {
                },
                params: {
                    q: this.searchWords ,
                    nextPageToken: nextPageToken
                }
            })
            .then((respo) => {
                this.dataOfSearch =respo.data[1]
                if(respo.data[1].nextPageToken){
                    this.nextPageToken=respo.data[1].nextPageToken
                }
                if(respo.data[1].prevPageToken){
                    this.prevPageToken=respo.data[1].prevPageToken
                }
                console.log(this.dataOfSearch)
            })
            .catch(e =>{
                console.log(e)
            })
        },
        prePage(){
            const prevPageToken = this.prevPageToken
            axios.get('http://dandan.tw:3000/api/search/nextpage',{
                headers: {
                },
                params: {
                    q: this.searchWords ,
                    nextPageToken: prevPageToken
                }
            })
            .then((respo) => {
                this.dataOfSearch =respo.data[1]
                if(respo.data[1].nextPageToken){
                    this.nextPageToken=respo.data[1].nextPageToken
                }
                console.log(this.dataOfSearch)
            })
            .catch(e =>{
                console.log(e)
            })
        }
    },
    data() {
       return{
           searchWords: "",
           dataOfSearch:"",
           nextPageToken: "",
           prevPageToken:""
       }
    }
};
</script>
