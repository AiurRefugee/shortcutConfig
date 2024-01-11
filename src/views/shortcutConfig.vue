<script setup>
import { shortcutConfig } from '@/assets/shortcutConfig';

const divs = ref()
</script>
<template>
    <div :class="`div${index}`" v-for="index in 5" :key=index>
    </div>
</template>
<style lang="scss" scoped>
div {
    border: 2px solid black;
}
.div1 {
    width: 20vw;
    height: 30vh;
}
.div2 {
    width: 10vw;
    height: 14vh;
}
.div3 {
    width: 22vw;
    height: 20vh;
}
.div4 {
    width: 12vw;
    height: 30vh;
}
.div5 {
    width: 16vw;
    height: 15vh;
} 
</style>