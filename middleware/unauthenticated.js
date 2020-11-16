import { mapState, mapGetters } from 'vuex'
export default function ({ app, redirect }) {
  if (app.$fire.auth) {
      if (app.store.getters.isLoggedIn)
          redirect('/dashboard');
  }
}
