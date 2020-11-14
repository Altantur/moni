<template>
  <div class="min-h-screen" />
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: 'authenticated',
    data () {
        return {
      }
    },
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
    },
    methods: {
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
#box-container {
  width: 70%;
}
.boxes {
  float: left;
}
</style>
