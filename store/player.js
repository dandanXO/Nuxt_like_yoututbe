
export const state = () => ({
    playId:"NliYy7iqh-U",
    autoplay: 0,
    videotitle: '',
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
   }
}

export const actions = {
    play ({commit},payload) {
       commit('play',payload)
    }
}

export const mutations = {
    play (state,payload ) {
        //console.log(payload)
        state.playId = payload.video.id.videoId
        state.videotitle = payload.video.snippet.title
        state.autoplay = payload.autoplay
    }
}
    


