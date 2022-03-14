<template>
  <div class="home-counter container">
    <div class="counter-container">
      <div class="counter">
        <!-- <img src="./icons/iconmonstr-time-19.svg" alt="timer" srcset="" class="icon" /> -->
        <h3 data-target="15000" class="count">0</h3>
        <h6>Employees</h6>
      </div>
      <div class="counter">
        <!-- <img src="./icons/iconmonstr-coffee-11.svg" alt="Coffee" srcset="" class="icon" /> -->
        <h3 data-target="1200" class="count">0</h3>
        <h6>Topics</h6>
      </div>
      <div class="counter">
        <!-- <img src="./icons/iconmonstr-weather-112.svg" alt="night" srcset="" class="icon" /> -->
        <h3 data-target="500" class="count">0</h3>
        <h6>Ideas</h6>
      </div>
    </div>
  </div>
</template>

<script>
// const counters = document.querySelectorAll(".count");
// const speed = 200;

// counters.forEach((counter) => {
//   const updateCount = () => {
//     const target = parseInt(+counter.getAttribute("data-target"));
//     const count = parseInt(+counter.innerText);
//     const increment = Math.trunc(target / speed);
//     console.log(increment);

//     if (count < target) {
//       counter.innerText = count + increment;
//       setTimeout(updateCount, 1);
//     } else {
//       count.innerText = target;
//     }
//   };
//   updateCount();
// });
export default {
  name: "HomeCounter",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
