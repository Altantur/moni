<template>
  <div id="container-box">
    <div>Staff name here</div>
    <div>Car model here</div>
    <div>Id number of car here</div>
    <div id="timer-container">
      <svg class="timer-svg">
          <circle cx="40" cy="40" r="37" class="circle" id="circle-of-timer"></circle>
      </svg>
      <div id="time-text">Time</div>
    </div>
    <div>Comments here</div>
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
    align-items: center;
    flex-direction: column;
}
.timer-svg {
  width: 80px;
  height: 80px;
}
.circle {
  fill: white;
  stroke-width: 3px;
  stroke: navy;
  stroke-dasharray: 232.58, 0;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: 1s all linear;
}
#time-text {
  width: 80px;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
}
</style>