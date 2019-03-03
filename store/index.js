import axios from 'axios'
import firebase from "firebase";
export const state = () => ({

    user: null
})
export const getters = {
    getUserData(state) {
        return state.user
    }
}
// check if login and autologin
export const actions = {
    async    nuxtServerInit({ commit, state }, { req, res }) {
        if(req.session.auth){
            const user = req.session.auth.user
            commit('users/setUserMessages', {data:{message:'successful signin!',signinStatus: true,user:user}})
        }else{
            await axios.post(process.env.API_URL + 'auth/signin', {
                email: '',
                password: '',
    
            })
                .then((respo) => {
                    commit('users/setUserMessages', respo)
                })
                .catch((err) => {
                    console.log(err.message)
                    commit('users/setUserMessages', respo)
                })
    
        }
        
    }

}

export const mutations = {
    SET_USER(state, payload) {
        // change state
        state.user = payload
    }
}