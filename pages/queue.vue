<template>
    <div id="Q-container">
        <div id="header">
            <img src="/logo.jpg">
            <button id="test" @click="test">cancel</button>
        </div>
        <div id="body-container">
            <h1 class="h-one">Queue</h1>
            <div id="list-container">
                <h2 class="h-two">On hold</h2>
                <div v-for="item in object" :key="item">
                    <Qlist class="listed-items" :data="item" :active="arr"/>
                </div>
            </div>
        </div>
        <div id="weather-side">
            <div id="date"></div>
            <div id="city"></div>
            <div id="temp"></div>
            <div id="stats"></div>
            <div id="time"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            arr: [0, 1, 2, 3],
            object: [
                    {
                        name: "Munkhjargal",
                        model: "Land200",
                        status: "Waiting",
                        time: "12:05"
                    },
                    {
                        name: "Badarch",
                        model: "LX570",
                        status: "Waiting",
                        time: "13:30"
                    },
                    {
                        name: "Temuujin",
                        model: "LX470",
                        status: "Waiting",
                        time: "10:10"
                    },
                    {
                        name: "Bataa",
                        model: "Land100",
                        status: "Waiting",
                        time: "11:00"
                    }
            ]
        }
    },
    methods:{
        async fetchWeather() {
            const elems = await this.$axios.$get('http://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&APPID=454e0e864b03e71b886b41d8103e6faf');
            var date = new Date();
            var days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
            document.getElementById("date").innerHTML = days[date.getDay()] + " " + (date.getMonth() + 1) + "/" + date.getDate();
            document.getElementById("city").innerHTML = elems.name;
            document.getElementById("temp").innerHTML = Math.round(elems.main.temp - 273) + "°";
            document.getElementById("stats").innerHTML = elems.weather[0].description[0].toUpperCase() + elems.weather[0].description.slice(1);
            document.getElementById("time").innerHTML = date.getHours() + ":" + date.getMinutes();
            setTimeout(() => {
                this.fetchWeather();
            }, 60000);
        },
        test() {
            document.getElementsByClassName("status-box")[1].innerHTML = "Canceled";
            document.getElementsByClassName("listed-items")[1].classList.add("canceled");
        }
    },
    mounted() {
        this.fetchWeather();
    }
}
</script>
<style>
body {
    background: #f8f9f9;
}
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap');
#test {
    color: white;
}
#header{
    width: 100%;
    height: 150px;
    background: #04442f;
}
#body-container{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.h-one{
    font-size: 25px;
    font-weight: bold;
    font-family: 'Hind Siliguri', sans-serif;
    color: rgba(0, 0, 0, 0.8);
    width: 50%;
}
.canceled {
    opacity: 0.4;
}
#list-container {
    width: 50%;
    padding-left: 20px;
    padding-top: 5px;
}
.h-two{
    font-size: 18px;
    font-weight: bold;
    font-family: 'Hind Siliguri', sans-serif;
    color: rgba(0, 0, 0, 0.7);
    width: 100%;
    margin-bottom: 10px;
}
.canceled {
    opacity: 0.4;
}
#weather-side {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 25%;
    height: fit-content;
    position: absolute;
    top: 150px;
    margin-top: 80px;
    box-shadow: 0px -1px 5px 0.1px rgba(0, 0, 0, 0.2);
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Hind Siliguri', sans-serif;
    font-weight: bold;
    margin-left: 10px;
}
#city {
    font-size: 13px;
    margin-top: 80px;
}
#temp {
    font-size: 60px;
    margin-top: -10px;
}
#stats {
    margin-top: -15px;
    font-size: 13px;
    margin-bottom: 80px;
}
</style>