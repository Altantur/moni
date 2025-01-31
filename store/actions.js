export default {
  onAuthStateChanged({ commit }, { authUser, claims }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', { authUser, claims })
  },
  setUsers ({commit}, users) {
    commit('SET_USERS', users)
  },
}
