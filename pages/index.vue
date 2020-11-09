<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{message}}
      </h1>
      <button @click="writeToRealtimeDb">
        Write to DB
      </button>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message: "Loading..."
        }
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
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
    }
}
</script>

<style>
</style>
