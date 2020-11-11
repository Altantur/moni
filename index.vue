<template>
  <div class="container">
    <ul id="box-container">
      <li class="boxes" v-for="item in arr" :key="item">
        <div><List :data="item"/></div>
      </li>
    </ul>
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
            message: "Loading...",
            arr: {
              data1: {
                staff: "Bat",
                car: "lx570",
                id: "УБА0250",
                time: 180,
                comment: "qwer"
                },
              data2: {
                staff: "Ochir",
                car: "land200",
                id: "УНА0250",
                time: 120,
                comment: "1"
              },
              data3: {
                staff: "Ts",
                car: "lx470",
                id: "УБА0150",
                time: 60,
                comment: "2"
              }
            }
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
#box-container {
  width: 70%;
}
.boxes {
  float: left;
}
</style>
