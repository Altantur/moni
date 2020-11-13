<template>
  <div class="container">
    <div id="box-container">
      <div class="boxes" v-for="item in arr" :key="item">
        <div><List /></div>
      </div>
    </div>
    <div id="right-sidebar">
      <div id="weather-container">
        <div id="months"></div>
        <div id="current-time">Time</div>
        <div id="sub-containerWT">
          <div id="city-name"></div>
          <div id="temp"></div>
          <div id="states-of-day"></div>
        </div>
      </div>
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
  modules: ['@nuxtjs/axios'],
    data () {
        return {
            message: "Loading...",
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    methods: {
      numberConverter(nums) {
        if(nums < 10) {
          nums = "0" + nums;
          return nums;
        }
        else {
          return nums;
        }
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
      async fetchWeather() {
        const elems = await this.$axios.$get('http://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&APPID=454e0e864b03e71b886b41d8103e6faf');
        var time = new Date();
        switch (time.getDay()) {
          case 1:
            document.getElementById("months").innerHTML = "MON " + (time.getMonth() + 1) + "/" + time.getDate();   
            break;
          case 2:
            document.getElementById("months").innerHTML = "TUE " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
          case 3:
            document.getElementById("months").innerHTML = "WED " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
          case 4:
            document.getElementById("months").innerHTML = "THU " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
          case 5:
            document.getElementById("months").innerHTML = "FRI " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
          case 6:
            document.getElementById("months").innerHTML = "SAT " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
          case 7:
            document.getElementById("months").innerHTML = "SUN " + (time.getMonth() + 1) + "/" + time.getDate();
            break;
        }
          document.getElementById("current-time").innerHTML = this.numberConverter(time.getHours()) + ":" + this.numberConverter(time.getMinutes());
          document.getElementById("city-name").innerHTML = elems.name;
          document.getElementById("temp").innerHTML = Math.round(elems.main.temp - 273) + "°";
          document.getElementById("states-of-day").innerHTML = elems.weather[0].description[0].toUpperCase() + elems.weather[0].description.slice(1);
        setTimeout(() => {
          this.fetchWeather();
        }, 60000);
      }
    },
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
        this.fetchWeather();
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap');
body, html {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: lightgrey;
}
#right-sidebar {
  width: calc(25% - 10px);
  height: 100%;
  left: calc(75% + 5px);
  padding-top: 5px;
}
#box-container {
  width: calc(75% + 5px);
  height: 100vh;
  background: lightgray;
  padding-right: 5px;
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
  top: 400px;
  float: left;
}
.container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
#weather-container {
  width: 100%;
  height: fit-content;
  background: white;
  border-radius: 6px; 
  display: flex;
  align-items: center;
  margin-top: 1px;
  flex-direction: column;
  padding-bottom: 5px;
}
#sub-containerWT {
  display: flex;
  flex-direction: row;
}
#months {
  margin-top: 5px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: bold;
  font-size: 16px;
}
#current-time {
  font-size: 45px;
  font-weight: bold;
  margin-top: 16%;
  margin-bottom: 16%;
}
#city-name {
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  margin-right: 10px;
  font-size: 16.5px;
}
#temp {
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}
#states-of-day {
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  font-size: 16.5px;
}
@media only screen and (max-width: 400px) {
  body {
    overflow-y: auto;
  }
  #right-sidebar {
    visibility: hidden;
    width: 0;
  }
  #test-button {
    visibility: hidden;
  }
  .container {
    width: 100%;
  }
  #box-container {
    width: 100%;
    overflow-y: auto;
    border: none;
  }
  .boxes {
    width: calc(100% - 5px);
    height: fit-content;
    margin-bottom: 2px;
  }
}
</style>
