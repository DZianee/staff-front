<template>
  <div class="home-counter container">
    <div class="counter card">
      <div>
        <h1>
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="totalTopic"
            :duration="2"
            prefix=""
            suffix=""
            separator=","
            decimalSeparator="."
            :autoinit="true" />
        </h1>
        <h3>Topics</h3>
      </div>
    </div>
    <div class="counter card">
      <div>
        <h1>
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="totalIdea"
            :duration="2"
            prefix=""
            suffix=""
            separator=","
            decimalSeparator="."
            :autoinit="true" />
        </h1>
        <h3>Ideas</h3>
      </div>
    </div>
  </div>
  <div class="end">
    <h1>Let's rock it.... Together</h1>
  </div>
</template>

<script>
// import { defineComponent } from 'vue';
import Vue3autocounter from "vue3-autocounter";

export default {
  name: "HomeCounter",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {};
  },
  props: {
    totalIdea: Number,
    totalTopic: Number,
  },
};
</script>

<style scoped>
.container {
  /* border: solid; */
  margin-top: 130px;
  display: flex;
  justify-content: space-around;
}
.container .card:nth-child(1){
  background: #F9FFEA;
}
.container .card:nth-child(2){
  background: #E0FFCD;
}
.card {
  border: solid pink;
  width: 300px;
  height: 350px;
  border-radius: 20px;
  text-align: center;
}
.card div {
  /* border: solid blueviolet; */
  transform: translate(0, 50px);
}
h1 {
  font-size: 150px;
}
h3 {
  font-size: 35px;
}
.end {
  margin-top: 140px;
  text-align: center;
  background: url("https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80") -10px;
  color: #fbfbfb;
  height: 500px;
  letter-spacing: 1.5px;
  opacity: 0.7;
}
.end h1 {
  position: relative;
  top: 150px;
  left: -140px;
  font-size: 120px;
}
@media screen and (max-width: 1440px) {
  .end h1 {
    font-size: 100px;
  }
}
@media screen and (max-width: 1025px) {
  .container {
    margin-top: 100px;
  }
  .end {
    margin-top: 110px;

    background-position: -160px -600px;
    height: 400px;
  }
  .end h1 {
    font-size: 80px;
    left: -40px;
  }
}
@media screen and (max-width: 769px) {
  .container {
    margin-top: 70px;
    flex-direction: column;
  }
  .end {
    margin-top: 70px;
    background-position: -290px -600px;
    height: 350px;
  }
  .end h1 {
    font-size: 60px;
    left: -30px;
  }
  .card {
    width: 100%;
    height: 200px;
    border-radius: 20px;
    text-align: center;
    margin: 20px 0;
  }
  .card div {
    display: flex;
    padding: 10px;
    transform: translate(0, 0);
  }
  .card div h3{
    padding-top: 80px;
    margin-left: 10px;
  }
  .card div h1{
    padding-left: 30px;
    padding-top: 30px;
    font-size: 100px;
  }
}
@media screen and (min-width: 320px) and (max-width: 480px) {
  .container {
    margin-top: 50px;
  }
  .end {
    margin-top: 50px;
    background-position: -520px -600px;
  }
  .end h1 {
    font-size: 55px;
    left: -20px;
    top: 90px;
  }
  .card {
    width: 100%;
    height: 150px;
    border-radius: 20px;
    text-align: center;
    margin: 10px 0;
  }
  .card div {
    display: flex;
    padding: 10px;
    transform: translate(0, 20px);
  }
  .card div h3{
    padding-top: 30px;
    margin-left: 10px;
    font-size: 30px;

  }
  .card div h1{
    padding-left: 30px;
    font-size: 65px;
    padding-top: 0;
  }
}
</style>
