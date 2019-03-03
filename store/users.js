import axios from 'axios'
import firebase from "firebase";
// firebse is already in plugin

export const state = () => ({

    userMessages: ''
})
export const getters = {
    getUserMessages(state) {
        return state.userMessages
    }
}
export const actions = {
    signup({ commit }, payload) {
        axios.post(process.env.API_URL + 'auth/signUp', {
            email: payload.email,
            password: payload.password,

        })
            .then((respo) => {
                commit('setUserMessages', respo)
            })
            .catch((err) => {

                commit('setUserMessages', respo)
            })
    },
    signIn({ commit }, payload) {
        axios.post(process.env.API_URL + 'auth/signin', {
            email: payload.email,
            password: payload.password,

        })
            .then((respo) => {
                commit('setUserMessages', respo)
            })
            .catch((err) => {
                console.log(err.message)
                commit('setUserMessages', respo)
            })
    },
    ThirdPartyLogin({ commit }, payload) {
        payload.user.getIdToken().then(token => {
            axios.post(process.env.API_URL + 'auth/otherSinginCheck', {
                token: token,
                topic:payload.topic
            })
                .then((respo) => {
                    commit('setUserMessages', respo)
                })
                .catch((err) => {
                    console.log(err)
                })
        });

    },
    logout({ commit }, payload) {
        axios.get(process.env.API_URL + 'auth/signout', {
        })
            .then((respo) => {
                commit('setUserMessages', respo)
                commit('list/setlists', [], { root: true })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}


export const mutations = {
    setUserMessages(state, payload) {
        // change state
        console.log()
        state.userMessages = payload.data
    },

}



