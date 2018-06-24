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
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from 'axios'

export default{
    async asyncData (context) {
    let {data} = await axios.get(process.env.API_URL+'list/getlistsongs',{
                headers: {
                },
                params: {
                    listname:context.params.id
                }
            })
   // console.log({data}.data.songs[0].id)
    return {  songs: {data}.data.songs}
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
