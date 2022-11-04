<template>
    <section>
        <div class="box">
            <div class="action">hover</div>
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
}
.box {
    width: 100px;
    height: 100px;
    background-color: red;
    transition-property: background-color;
    transition-duration: 1s;
    position: relative;
}

.box:hover {
    background-color: blue;
    transform: scale(2);
}

.action {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}
</style>
