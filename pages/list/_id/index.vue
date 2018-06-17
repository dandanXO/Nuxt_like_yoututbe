<template>
  <v-container align-content>

         <v-data-table
            :headers="headers"
            :items="songs"
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
    let {data} = await axios.get('http://dandan.tw:3000/api/list/getlistsongs',{
                headers: {
                },
                params: {
                    listname:context.params.id
                }
            })
    console.log({data}.data.songs)
    return {  songs: {data}.data.songs}
  },
  data () {
      return {
          headers:[
              {text:'title',value:'title'},
              {text:'id',value:'id'}
            ]
      }
  }
}
</script>
