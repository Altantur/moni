<template>
  <v-toolbar
    dark
    class="d-flex flex-column justify-space-between"
  >
    <v-img
      class="mx-2"
      src="/logo.png"
      max-height="40"
      max-width="40"
      contain
    />
    <v-spacer />
    <div>
      <v-list-item
        to="/dashboard"
        append
      >
        <v-list-item-icon>
          <v-icon>
            mdi-clock
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Засварууд
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-spacer />
    <div v-show="claims.admin">
      <v-list-item
        to="/users"
        append
      >
        <v-list-item-icon>
          <v-icon>
            mdi-account
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Хэрэглэгчид
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-spacer />
    <div v-show="claims.admin">
      <v-list-item
        to="/report"
        append
      >
        <v-list-item-icon>
          <v-icon>
            mdi-cloud
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Тайлан
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-spacer />
    <div>
      <v-list-item
        append
        @click="logout"
      >
        <v-list-item-icon>
          <v-icon>
            mdi-logout
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Гарах 
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data: () => ({
    }),

    computed: {
      ...mapState({
        authUser: (state) => state.authUser,
        claims: (state) => state.claims,
      }),
      ...mapGetters({
        isLoggedIn: 'isLoggedIn',
      }),
    },

    methods: {
        async logout () {
            try {
                await this.$fire.auth.signOut().then (() => {
                    this.$router.push({
                      name: 'login',
                    })
                })
            } catch (e) {
                alert(e)
            }
        },
    },
}
</script>

<style>
</style>
