<template>
  <v-container align-content-center>
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
                <v-btn >{{ number }}</v-btn>
                </v-toolbar>
                <div>{{searchWords}}</div>
                <div>{{dataOfSearch}}</div>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

//import
import axios from 'axios'

export default {
    components: {},
    async asyncData(context) {
       return  {}    },
    computed: {
        number () {
        return this.$store.state.counter
      },
    },
    methods:{
        countplz(){
             this.$store.commit('increment')
        },
        search(q){
            const searchWords = this.searchWords
            axios.get('http://dandan.tw:3000/api/search',{
                headers: {
                },
                params: {
                    q: searchWords
                }
            })
            .then((respo) => {
                this.dataOfSearch =respo
                console.log(this.dataOfSearch)
            })
        }
    },
    data() {
       return{
           searchWords: '',
           dataOfSearch:""
       }
    }
};
</script>
