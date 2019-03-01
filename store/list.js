import axios from 'axios'

export const state = () => ({
    lists:[],
    loading: false
})

export const getters = {
    getlists (state) {
        return state.lists
   },
   getloading (state) {
    return state.loading
  }
}

export const actions = {
    addsongtolist({commit,dispatch,rootState},payload){
        commit('setloading',true)
        axios.post(process.env.API_URL+'list/addsongtolist',{
            uid: rootState.users.userMessages.user.uid,
            title: payload.title,
            choselistname: payload.choselistname,
            id: payload.id
        })
        .then((respo) => {
            console.log(respo.data.message)
            commit('setloading',false)
        })
        .catch(e =>{
            console.log(e)
            commit('setloading',false)
        })
    },
    deletesongonlist({commit,dispatch,rootState},payload){
        commit('setloading',true)
        axios.delete(process.env.API_URL+'list/deletesongonlist',{
            data:{
                uid: rootState.users.userMessages.user.uid,
                id: payload.songId,
                listname: payload.listname,
            }
            
        })
        .then((respo) => {
            //console.log(payload.songId + payload.listname)
             
            commit('setloading',false)
        })
        .catch(e =>{
            console.log(e)
            commit('setloading',false)
        })
    },
    setlists ({commit,rootState }) {
       // console.log(rootState.users.uid)
        axios.get(process.env.API_URL+'list/getlists',{
            params: {
                uid: rootState.users.userMessages.user.uid
            }
        })
        .then((respo) => {
            //console.log(respo.data)
            commit('setlists',respo.data.lists)
        })
        .catch(e =>{
            console.log(e)
        })
},
    createlist({commit,dispatch},payload){
        //console.log(payload)
        axios.post(process.env.API_URL+'list/addlist',{
                listname: payload.listName,
                uid:payload.Uid
            })
            .then(res =>{
                dispatch('setlists')
            })
        
    }
}

export const mutations = {
    setlists (state,payload ) {
        // change state
        state.lists = payload
    },
    setloading (state, payload) {
        state.loading = payload
    }
}
    


