<template>
  <section>
    <div class="reset-circle"></div>
    <div class="reset-circle"></div>
    <div class="reset-circle"></div>
  </section>
  <section>
    <button id="resetCircle">Reset animation</button>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const button = document.querySelector("#resetCircle");
  button.addEventListener("click", () => {
    document.querySelectorAll(".reset-circle").forEach((circle) => {
      circle.style.animation = "none";
      circle.offsetWidth;
      circle.style.animation = null;
    });
  });
});
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.reset-circle {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  animation: red-to-blue 0.5s both;
}

.reset-circle:nth-child(2) {
  animation-delay: 1s;
}

.reset-circle:nth-child(3) {
  animation-delay: 2s;
}

@keyframes red-to-blue {
  from {
    background-color: red;
  }

  to {
    background-color: blue;
  }
}
</style>
