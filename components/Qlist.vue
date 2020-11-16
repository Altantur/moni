<template>
    <div id="box-container">
        <div id="header-container">
            <h1 class="h-one">Munkhjargal</h1>&nbsp;
            <div class="g-color h-one">LX570</div>
        </div>
        <div id="status-container">
            <div class="l-side">
                <h3 class="h-three">Status</h3>
                <div class="d-flex">
                    <div id="status-box">{{status}}</div>
                    <div id="ordered-time">Захиалага авсан цаг {{time}}</div>
                </div>
                </div>
            <div class="r-side">
                <h3 class="h-three">Car Number</h3>
                <div id="car-id">
                    {{id}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: "Waiting",
            time: "12:07",
            id: "УБА0000"
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap');
#header-container {
    display: flex;
    flex-direction: row;
}
#box-container {
    width: 100%;
    height: fit-content;
    box-shadow: 0px 0px 5px 0.1px rgba(0, 0, 0, 0.2);
    padding-left: 20px;
    background: white;
    margin-bottom: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.h-one {
    font-size: 18px;
    color: #168c67;
    font-weight: bold;
    font-family: 'Hind Siliguri', sans-serif;
}
.g-color {
    color: rgba(0, 0, 0, 0.6);
}
#status-container {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
}
.h-three {
    font-size: 14px;
    color: black;
    font-weight: bold;
    font-family: 'Hind Siliguri', sans-serif;
    margin-bottom: 5px;
}
#status-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 25px;
    border: 1px solid rgba(8, 135, 94, 0.6);
    border-radius: 4px;
    font-family: 'Hind Siliguri', sans-serif;
    font-size: 14px;
    text-transform: uppercase;
}
.d-flex {
    display: flex;
    flex-direction: row;
}
#ordered-time {
    font-family: 'Hind Siliguri', sans-serif;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.6);
    width: 200px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.l-side {
    margin-right: 200px;
}
#car-id {
    color: rgba(0, 0, 0, 0.6);
}
</style>