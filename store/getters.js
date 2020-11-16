export default {
    isLoggedIn: (state) => {
        try {
            return state.authUser.id !== null
          } catch {
            return false
        }
    },
    isAdmin: (state) => {
        try {
            return state.claims.admin
          } catch {
            return false
        }
    }
}
