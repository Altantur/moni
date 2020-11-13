<template>
    <v-toolbar
      dark
      dense
      color="cyan"
    >
      <v-img
        class="mx-2"
        src="/logo.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>Monnis</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="mr-4" @click="logout">
        Гарах
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
      ...mapState({
        authUser: (state) => state.authUser,
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
