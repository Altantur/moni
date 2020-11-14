import initialState from './state'

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser, claims }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email
    }
    state.claims = claims
  }
}
