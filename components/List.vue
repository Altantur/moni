<template>
  <div id="container-box">
    <div>{{data.staff}}</div>
    <div>{{data.car}}</div>
    <div>{{data.id}}</div>
    <div id="timer-container">
      <svg class="timer-svg">
          <circle cx="50" cy="50" r="47" class="circle" id="circle-of-timer"></circle>
      </svg>
      <div id="time-text">0:0</div>
    </div>
    <div>{{data.comment}}</div>
  </div>
</template>

<script>
export default {
    mounted: function() {

    },
    props: {
        data: Object
    }
}
</script>

<style>
#container-box {
    width: 200px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.timer-svg {
  width: 100px;
  height: 100px;
}
.circle {
  fill: white;
  stroke-width: 3px;
  stroke: black;
  stroke-dasharray: 295.16, 0;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: 1s all linear;
}
.circle:hover {
  stroke-dasharray: 0, 295.16;
}
#time-text {
  width: 100px;
  height: 100px;
  margin-top: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>