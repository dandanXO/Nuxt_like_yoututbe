
export const state = () => ({
    playId:"",
    loading: false
})

export const getters = {
    play (state) {
        return state.playId
   },
}

export const actions = {
    play ({commit},payload) {
       commit('play',payload)
    }
}

export const mutations = {
    play (state,payload ) {
       // console.log(payload)
        state.playId = payload
    }
}
    


