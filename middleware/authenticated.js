import { mapState, mapGetters } from 'vuex'
export default function ({ app, redirect }) {
    console.log("Auth called.");
  if (app.$fire.auth) {
      if (!app.store.getters.isLoggedIn)
          redirect('/login');
  }
}
