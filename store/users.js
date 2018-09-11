import axios from 'axios'

export const state = () => ({
    
    userMessages:''
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
            
            commit('setUserMessages',respo)
        })
        .catch((err) => {
            
            commit('setUserMessages',respo)
        })
    },
    signIn ({commit},payload){
        axios.post(process.env.API_URL+'auth/signin',{
            email: payload.email,
            password: payload.password,
            
        })
        .then((respo) => {
           // console.log(respo)
           // commit('index/SET_USER',respo.data.user)
            commit('setUserMessages',respo)
        })
        .catch((err) => {
            console.log(err.message)
            commit('setUserMessages',respo)
        })
    },
    onLogout ({commit},payload){
        axios.get(process.env.API_URL+'auth/signout',{
        })
        .then((respo) => {
            commit('index/SET_USER',respo.user)
        })
        .catch((err) => {
            console.log(err.message)
            
        })
    }
}


export const mutations = {
    setUserMessages (state,payload ) {
        // change state
        state.userMessages = payload.data
    }
}
    


