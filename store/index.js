import axios from 'axios'
export const state = () => ({
    
    user:null
})
export const getters = {
    getUserData (state) {
        return state.user
   }
}
// check if login and autologin
export const actions = {
    async    nuxtServerInit ({ commit }, { req }) {
     await  axios.post(process.env.API_URL+'auth/signin',{
            email: 'payload.email',
            password: 'payload.password',
            
        })
        .then((respo) => {
           //console.log(respo.data.user)
            commit('users/setUserMessages',respo)
           // commit('users/setUserMessages',respo)
        })
        .catch((err) => {
            console.log(err.message)
            commit('setUserMessages',respo)
        })
    }
}

export const mutations = {
    SET_USER (state,payload ) {
        // change state
        state.user = payload
        //console.log(state.user)
    }
}