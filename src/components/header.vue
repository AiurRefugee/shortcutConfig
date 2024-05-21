<script setup>
import { ref, onMounted, onUnmounted } from "vue";
defineExpose({});
const props = defineProps([
  "showBack",
  "leftFunc",
  "inputFocus",
  "title",
  "showTitle",
  "scrollFunc",
]);
</script>
<template>
  <header
    id="appHeader"
    class="flex h-10 justify-center px-4 overflow-hidden w-full bgLight_Primary txtDark_Primary sticky top-0 z-50"
    :style="{
      // height: inputFocus ? '0' : '2rem',
    }"
  >
    <div class="w-full flex text-base justify-center headerGrid">
      <div
        id="left"
        class="flex h-full justify-self-start items-center"
        @click="leftFunc"
      >
        <div v-if="showBack" class="flex w-full h-full items-center">
          <svg
            class="w-4 aspect-square txtDark_Basic rotate-180"
            viewBox="0 0 1024 1024"
          >
            <path
              stroke-opacity="1"
              stroke-width="70"
              d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
              p-id="1451"
            ></path>
          </svg>
          <span>Back</span>
        </div>
      </div>
      <div class="relative w-full flex justify-center h-full">
        <h1
          id="topTitle"
          class="title absolute bottom-0 opacity-0 fastTrans"
          :style="{
            opacity: showTitle ? '1' : '0',
          }"
        >
          {{ title }}
        </h1>
      </div>
      <div class="right"></div>
    </div>
    <div id="headerDivider"></div>
  </header>
</template>
<style scoped lang="scss"> 

#headerDivider {
  opacity: 0;
  background: red;
}
#left {
  // font-size: 0.9em;
}
path {
  fill: var(--bgDark_Primary);
  stroke: var(--bgDark_Primary);
}
</style>