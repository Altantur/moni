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
        <div id="current-time"></div>
        <div id="sub-containerWT">
          <div id="city-name"></div>
          <div id="temp"></div>
          <div id="states-of-day"></div>
        </div>
      </div>
      <div id="ads-container">
        <div id="plain-text">ADs will be placed here.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  modules: ['@nuxtjs/axios'],
    data () {
        return {
            message: "Loading...",
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            scrollB: 0
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
        var days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        document.getElementById("months").innerHTML = days[time.getDay()] + " " + (time.getMonth() + 1) + "/" + time.getDate();
          document.getElementById("current-time").innerHTML = this.numberConverter(time.getHours()) + ":" + this.numberConverter(time.getMinutes());
          document.getElementById("city-name").innerHTML = elems.name;
          document.getElementById("temp").innerHTML = Math.round(elems.main.temp - 273) + "°";
          document.getElementById("states-of-day").innerHTML = elems.weather[0].description[0].toUpperCase() + elems.weather[0].description.slice(1);
        setTimeout(() => {
          this.fetchWeather();
        }, 60000);
      },
      scroller() {
        if(this.arr.length > 6) {
                if(this.scrollB == 0) {
                  document.getElementById("box-container").scrollTop = document.getElementById("box-container").scrollHeight;
                  this.scrollB = 1;
                }
                else {
                  document.getElementById("box-container").scrollTo(0, 0);
                  this.scrollB = 0;
                }
              setTimeout(() => {
                this.scroller();
              }, 20000);
            }
      }
    },
    mounted () {
        this.$fire.database.ref('message').on('value', snapshot => {
            this.message = snapshot.val().message;
        })
        this.fetchWeather();
          this.scroller();
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap');
body, html {
  background: url('bg1.jpg');
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
#right-sidebar {
  color: white;
  width: calc(25% - 10px);
  height: 100vh;
  left: calc(75% + 5px);
  padding-top: 7px;
  display: flex;
  flex-direction: column;
}
#ads-container {
  margin-top: 5px;
  width: 100%;
  height: calc(60% - 15px);
  border-radius: 6px;
  background: transparent;
  border: 1px solid white;
}
#plain-text {
  width: calc(100% - 5px);
  margin-left: 5px;
  margin-top: 5px;
}
#box-container {
  width: calc(75% + 5px);
  height: 100vh;
  background: transparent;
  padding-right: 5px;
  overflow-y: scroll;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}
#box-container::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.boxes {
  backdrop-filter: blur(5px);
  box-shadow: 1.1px 1.1px 3px 0.5px wheat;
  color: white;
  float: left;
  background: transparent;
  border-radius: 6px;
  width: calc(33.3% - 5px);
  height: calc(50% - 6px);
  margin-left: 5px;
  margin-top: 7px;
  margin-bottom: 1px;
}
.container {
  min-width: 100%;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
#weather-container {
  width: 100%;
  height: 40%;
  background: transparent;
  border-radius: 6px; 
  display: flex;
  align-items: center;
  margin-top: 1px;
  flex-direction: column;
  padding-bottom: 5px;
  border: 1px solid white;
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
  margin-top: 19%;
  margin-bottom: 19%;
}
#city-name {
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  margin-right: 15px;
  font-size: 16.5px;
}
#temp {
  font-weight: bold;
  font-size: 16px;
  margin-right: 15px;
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
