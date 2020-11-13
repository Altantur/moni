<template>
    <div>
    Hello
    </div>
</template>

<script>
export default {
    data () {
        return {
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
    },
    middleware: 'authenticated',
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
