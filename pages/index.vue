<template>
  <div class="container">
    <div id="box-container">
      <div class="boxes" v-for="item in arr" :key="item">
        <div><List /></div>
      </div>
    </div>
    <div id="right-sidebar">Here some commercial things like weather,time and adverstisements
    </div>
    <div id="test-button">
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
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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

body, html {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: lightgrey;
}
#right-sidebar {
  width: 20%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: calc(70% - 20px);
}
#box-container {
  width: calc(72% + 5px);
  height: 100vh;
  background: lightgray;
  padding-right: 5px;
  border-right: 1px solid black;
}
.boxes {
  float: left;
  background: white;
  border-radius: 6px;
  width: calc(33.3% - 5px);
  height: calc(33.3% - 10px);
  margin-left: 5px;
  margin-top: 7px;
}
#test-button {
  width: 50px;
  left: calc(100% - 100px);
  position: absolute;
  top: 0;
  float: left;
}
.container {
  overflow: hidden;
  height: 100%;
}
@media only screen and (max-width: 400px) {
  body {
    overflow-y: auto;
  }
  #right-sidebar {
    visibility: hidden;
  }
  #test-button {
    visibility: hidden;
  }
  #box-container {
    width: 100%;
    border: none;
  }
  .boxes {
    width: calc(100% - 5px);
    height: fit-content;
    margin-bottom: 2px;
  }
}
</style>
