import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    searchmovi:{}
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store