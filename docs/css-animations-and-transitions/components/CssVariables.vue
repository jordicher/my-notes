<template>
  <section>
    <div class="box"></div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const box = document.querySelector(".box");
  box.style.setProperty("--custom-red", "red");
  box.style.setProperty("--height-size", "100px");
});
</script>

<style scoped>
:root {
  /* root inside a scoped style do not make sense */
  --border-size: 2px;
  --height-size: 500px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.box {
  --border-size: 2px; /* are added for the example, the variables in the class  */
  --height-size: 500px;
  width: 100px;
  height: var(--height-size);
  background-color: var(--custom-red);
  border: var(--border-size) solid black;
}
</style>
