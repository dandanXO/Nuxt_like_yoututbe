import axios from 'axios'

export const state = () => ({
    password : '',
    email : '',
    userMessages:'userMessages'
})
export const getters = {
    getUserMessages (state) {
        return state.userMessages
   }
}
export const actions = {
    signup ({commit},payload){
        axios.post(process.env.API_URL+'auth/signUp',{
            email: payload.email,
            password: payload.password,
            
        })
        .then((respo) => {
            console.log(respo)
            commit('setUserMessages',respo)
        })
        .catch((err) => {
            console.log(err.message)
            commit('setUserMessages',respo)
        })
    }
}


export const mutations = {
    setUserMessages (state,payload ) {
        // change state
        state.userMessages = payload.data
    }
}
    


