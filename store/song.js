import axios from 'axios'
export const state = () => ({
    songData:{}
})
export const getters = {
    getSongData(state){
        return state.songData
    }
}

export const actions = {
  setFevoriteSong({ commit, rootState  },payload){
    
    axios.post(process.env.API_URL+'song/setFavorite',{
        listName:payload.listName,
        id:payload.id,
        uid:payload.uid
    }).then((respo) => {
        commit('setFevoriteSong',respo)
    })
    .catch((err) => {
        console.log(err)
    })
  
      
  },
  removeFevoriteSong({ commit, state },payload){
    axios.post(process.env.API_URL+'song/removeFavorite',{
        listName:payload.listName,
        id:payload.id,
        uid:payload.uid
    }).then((respo) => {
        commit('setFevoriteSong',respo)
    })
    .catch((err) => {
        console.log(err)
    })
  }
    
}

export const mutations = {
    setFevoriteSong(state, payload) {
        state.songData = payload
    },
}