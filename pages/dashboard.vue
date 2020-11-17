<template>
  <div class="min-h-screen">
    <v-toolbar
      color="primary"
      dark
      class="d-flex flex-column justify-space-between"
    >
      <v-toolbar-title>Засварууд</v-toolbar-title>
      <v-spacer />
      <div>
        <v-list-item
          append
        >
          <v-btn 
            @click="create"
          >
            <v-icon>
              mdi-plus
            </v-icon>
            Захиалга нэмэх
          </v-btn>
        </v-list-item>
      </div>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-home-outline
        </v-icon>
        <v-badge
          color="green"
          content="6"
          class="mr-4"
        >
          Яг одоо
        </v-badge>
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-phone-in-talk
        </v-icon>
        <v-badge
          color="green"
          content="16"
          class="mr-4"
        >
          Хийгдэх
        </v-badge>
      </v-tab>

      <v-tab-item class="flex flex-wrap pb-20">
        <Item 
          v-for="index in 8" 
          :key="index" 
          class="m-4"
          :repair="repair"
        />
      </v-tab-item>
      <v-tab-item>
        <TimeLine />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    layout: 'dashboard',
    middleware: 'authenticated',
    data: () => ({
      repair: {
        staffName: "Б.Ганцбаатар",
        veNumber: "2348-УНБ", 
        value: 50, // Percent
        text: "39мин", // Time left
        comment: "Дугуй сольж байна.", // Time left
      },
      users: [],
      loading: false,
    }),
    computed: {
      ...mapState ({
        authUser: (state) => state.authUser,
      }),
      ...mapGetters ({
        isLoggedIn: 'isLoggedIn',
      }),
    },
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
    },
    created () {
      this.initialize()
    },
    methods: {
      ...mapActions ([
        'setUsers'
      ]),
      initialize () {
        this.loading = true
        const ref = this.$fire.database.ref('users')
        ref.on('value', (data) => {
          if (data.val())
          this.users = Object.values(data.val())
          this.loading = false
          this.setUsers (this.users)
        });
      },
      create () {
        alert()
      },
      async writeToRealtimeDb() {
          const messageRef = this.$fire.database.ref('message')
          try {
              await messageRef.set({
                message: this.message,
              })
          } catch (e) {
              console.log(e)
              return
          }   
          alert('Success.')
      },
    },
}
</script>

<style>
</style>
