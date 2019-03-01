<template>
  <v-container align-content>
        <v-btn  color="green" @click.stop="playlist">play list</v-btn>
        <v-data-table
            :headers="headers"
            :items="songs"
            :disable-initial-sort="disableinitialsort"
            class="elevation-1"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="mdi-menu-down"
        >
            <template slot="items" slot-scope="props">
            <td  class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.id }}</td>
            <deletesongonlist :songId="props.item.id"></deletesongonlist>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from 'axios'
import deletesongonlist from '~/components/deletesongonlist.vue'

export default{
    components:{
        deletesongonlist
    },
    async asyncData (context) {
        if(context.store.getters['users/getUserMessages'].signinStatus){
            //console.log(context.store.state.users.userMessages.user.uid)
            let {data} = await axios.get(process.env.API_URL+'list/getlistsongs',{
                headers: {
                },
                params: {
                    listname:context.params.id,
                    uid: context.store.state.users.userMessages.user.uid
                }
            })
             console.log({data}.data)
  
            return {  songs: {data}.data.songs}
        }
   // console.log({data}.data)
  
  },
  data () {
      return {
          disableinitialsort:true,
          headers:[
              {text:'title',value:'title',sortable: false,},
              {text:'id',value:'id'}
            ]
      }
  },
  methods: {
      playlist () {
        this.$store.dispatch('player/playlist',{songs:this.songs,songsorder:0})
      }
  }
}
</script>
