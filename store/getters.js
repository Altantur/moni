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
    },
    operators: (state) => {
        try {
            return state.users.filter( user => user.role == "Үйлчилгээний зөвлөх")
          } catch {
            return []
        }
    },
    repairmen: (state) => {
        try {
            return state.users.filter( user => user.role == "Засварчин")
          } catch {
            return []
        }
    }
}
