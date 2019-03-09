
export const state = () => ({
    playId:"NliYy7iqh-U",
    autoplay: 0,
    videotitle: '',
    playlist:[],
    songsorder: 0,
    loading: false
})

export const getters = {
    playId (state) {
        return state.playId
   },
   getvideotitle(state) {
    return state.videotitle
   },
   autoplay (state){
    return state.autoplay
   },
   playlist (state){
    return {playlist:state.playlist,songsorder:state.songsorder,playlistName:state.listName}
   }
}
let listNameTemp 
export const actions = {
    play ({commit},payload) {
       commit('play',payload)
    },
    playlist ({commit},payload){
        if(payload.listName){
            listNameTemp   = payload.listName
            commit('playlist',payload)
           
        }else{
            payload.listName = listNameTemp
            commit('playlist',payload)
        }
    }
}

export const mutations = {
    play (state,payload ) {
        console.log(payload)
        state.playId = payload.video.id.videoId 
        state.videotitle = payload.video.snippet.title 
        state.autoplay = payload.autoplay
    },
    playlist(state,payload){
        //console.log('payload.songs[payload.songsorder].title')
        state.playlist = payload.songs
        state.playId = payload.songs[payload.songsorder].id
        state.videotitle = payload.songs[payload.songsorder].title
        state.songsorder = payload.songsorder
        state.autoplay = 1
        state.listName = payload.listName
    }
}
    


