<script setup>
import { ref, onMounted, onUnmounted } from "vue";
defineExpose({
  test,
});
const props = defineProps([
  "showBack",
  "leftFunc",
  "inputFocus",
  "title",
  "showTitle",
  "scrollFunc",
]);
function test() {
  console.log("test");
}
</script>
<template>
  <header
    id="appHeader"
    class="fastTrans flex justify-center sticky top-0 z-40 px-2 overflow-hidden w-full bgLight_Primary txtDark_Primary"
    :style="{
        height: inputFocus ? '0' : '2rem',
      }"
  >
    <div class="w-full flex justify-center headerGrid">
      <div
        id="left"
        class="flex mt-1 h-1/2 justify-self-start items-center"
        @click="leftFunc"
      >
        <div v-if="showBack" class="flex w-full h-full items-center">
          <svg
            class="w-8 mr-1 txtDark_Basic rotate-180"
            viewBox="0 0 1024 1024"
          >
            <path
              class="bgDark_Basic"
              d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
              p-id="1451"
            ></path>
          </svg>
          <span class="text-lg">Back</span>
        </div>
      </div>
      <h1
        class="title text-xl opacity-0"
        :style="{ opacity: showTitle ? '1' : '0' }"
      >
        {{ title }}
      </h1>
      <div class="right"></div>
    </div>
    <div id="headerDivider"></div>
  </header>
</template>
<style scoped lang="scss">
* {
  // border: 1px solid black;
}

#headerDivider {
  opacity: 0;
  background: red;
}
</style>