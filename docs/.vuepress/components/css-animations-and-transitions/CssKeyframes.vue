<template>
    <section>
        <div class="circle">
        </div>
    </section>
</template>

<script></script>

<style scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 100px;
}

.circle {
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
    animation-name: move-like-a-square, red-to-blue;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes move-like-a-square {

    from,
    to { /* 0%, 100% */        
        transform: translate(0, 0);
    }

    25% {
        transform: translate(50px, 0);
    }

    50% {
        transform: translate(50px, 50px);
    }

    75% {
        transform: translate(0, 50px);
    }
}

@keyframes red-to-blue {
    from {
        background-color: red;
        /* we can NOT add a tranform, conlfict with the other animation */
    }

    to {
        background-color: blue;
    }
}
</style>
