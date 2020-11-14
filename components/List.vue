<template>
  <div id="container-box">
    <div id="staff-prof-container">
      <div id="icon-of-staff">Icon</div>
      <div id="staff-name">Staff name here</div>
    </div>
    <div id="car-model" class="mg-l-10">LX570</div>
    <div id="car-id" class="mg-l-10">УБА0000</div>
    <div id="timer-container">
      <svg class="timer-svg">
          <circle cx="40" cy="40" r="37" class="circle" id="circle-of-timer"></circle>
      </svg>
      <div id="time-text">Time</div>
    </div>
    <div id="comments" class="mg-l-10">Comments here</div>
  </div>
</template>

<script>
export default {
    mounted: function() {
      let timeleft = 1800
      let temp = timeleft;
      let LoC = 295.16 / timeleft;
      // setInterval(() => {
      //   if(temp >= 0) {
      //     document.getElementById("time-text").innerHTML = temp;
      //     document.getElementById("circle-of-timer").style.strokeDasharray = LoC * (temp - 1) + "," + LoC * (timeleft - temp + 1);
      //     temp--;
      //   }
      // }, 1000);
    }
}
</script>

<style>
#container-box {
    width: 100%;
    display: flex;
    flex-direction: column;
}
#staff-prof-container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
}
#icon-of-staff {
  width: 25px;
  height: 25px;
  border: 1px solid white;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
}
.timer-svg {
  width: 80px;
  height: 80px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.circle {
  fill: transparent;
  stroke-width: 3px;
  stroke: white;
  stroke-dasharray: 232.58, 0;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: 1s all linear;
}
#time-text {
  width: 80px;
  height: 80px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -80px;
}
#staff-name {
  position: relative;
  font-weight: bold;
  font-family: sans-serif;
  margin-left: 5px;
}
#timer-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mg-l-10 {
  margin-left: 10px;
}
</style>