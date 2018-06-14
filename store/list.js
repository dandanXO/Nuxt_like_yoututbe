import axios from 'axios'

export const state = () => ({
    lists:["li1","li2"]
})

export const getters = {
    getlists (state) {
        return state.lists
   }
}

export const actions = {
    setlists ({commit}) {
        axios.get('http://dandan.tw:3000/api/list/getlists')
            .then((respo) => {
                console.log(respo.data.lists)
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
    }
}
    


