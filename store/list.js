import axios from 'axios'

export const state = () => ({
    lists:["li1","li2"],
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
    addsongtolist({commit,dispatch},payload){
        commit('setloading',true)
        axios.post('http://dandan.tw:3000/api/list/addsongtolist',{
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
    setlists ({commit}) {
        axios.get('http://dandan.tw:3000/api/list/getlists')
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
        axios.post('http://dandan.tw:3000/api/list/addlist',{
                listname: payload
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
    


