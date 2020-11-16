<template>
    <div id="Q-container">
        <div id="header">
            <img src="/logo.jpg">
        </div>
        <div id="body-container">
            <h1 class="h-one">Queue</h1>
            <div id="list-container">
                <h2 class="h-two">In progress</h2>
                <div v-for="item in arr" :key="item">
                    <Qlist />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            arr: [0, 1, 2, 3]
        }
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
</style>