<template>
    <section>
        <div class="reset-complex-circle" style="--i: 0"></div>
        <div class="reset-complex-circle" style="--i: 1"></div>
        <div class="reset-complex-circle" style="--i: 2"></div>
    </section>
    <section>
        <button id="resetComplexCircle">Reset animation</button>
    </section>

</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const button = document.querySelector('#resetComplexCircle');
    button.addEventListener('click', () => {
        document.querySelectorAll('.reset-complex-circle').forEach((circle) => {
            circle.style.animation = 'none';
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
.reset-complex-circle {
    --duration: 1s;
    --stagger: 0.5s;
    --interval: calc(var(--duration) - var(--stagger));

    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    animation: red-to-blue var(--duration) calc(var(--interval) * var(--i)) both;
    /* calc(var(--interval) * var(--i)) it's the delay */
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
