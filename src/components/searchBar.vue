<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
const props = defineProps(["queryInput", "showDivider"]);
const queryInput = defineModel("queryInput");
const inputFocus = defineModel("inputFocus");
const searchContent = ref("");
const searchWrapper = ref();

function inputOnFocus() {
  inputFocus.value = true;
  const mask = document.getElementById("mask");
  // document.documentElement.style.overflow = "hidden";
  // mask.style.display = "block";
  // const searchBarWrapper = document.getElementById("searchBarWrapper");
  // gsap.to(searchBarWrapper, {
  //   duration: 0.5,
  //   top: 0,
  // });
  // gsap.to("#cancelSearch", {
  //   width: "2rem",
  //   marginLeft: "1rem",
  //   duration: 0.05,
  // });
  gsap.to("#scrollTitle", {
    height: 0,
    duration: 0.5,
  });

  // gsap.to("#appHeaderWrapper", {
  //   height: 0,
  //   duration: 0.5,
  // });
}

function inputBlur() {
  inputFocus.value = false;
  // const mask = document.getElementById("mask");
  // const searchInput = document.getElementById("searchInput");
  // searchInput;
  // // mask.style.display = "none";
  // const searchBarWrapper = document.getElementById("searchBarWrapper");

  gsap.to("#scrollTitle", {
    height: "2.5rem",
    duration: 0.2,
    ease: 'power1', 
  });
  // gsap.to("#cancelSearch", {
  //   width: "0",
  //   margin: "0",
  //   duration: 0.5,
  // });
  // gsap.to("#appHeaderWrapper", {
  //   height: "2rem",
  //   duration: 0.5,
  //   onUpdate: () => {
  //     console.log("update");
  //   },
  //   onComplete: () => {
  //     searchInput.blur();
  //   },
  // });
}

onMounted(() => {});
</script>
<template>
  <div id="mask" class="mask"></div>
  <div
    ref="searchWrapper"
    id="searchBar"
    class="overflow-hidden flex flex-col items-center fastTrans bgLight_Primary"
  >
    <div class="w-full px-4 max-width-screen flex justify-center bgLight_Primary pt-2 pb-3"
      :style="{
        // paddingTop: inputFocus ? '0.75rem' : '0.25rem',
        // paddingBottom: inputFocus ? '0.75rem' : '0.25rem'
      }"
    >
      <div
        class="w-full h-full bgSearch flex-1 flex items-center rounded-lg px-2" 
      >
        <svg viewBox="0 0 1030 1024" class="aspect-auto h-4 mr-2">
          <path
            fill="#858585"
            d="M738.618409 646.405992c96.606263 96.606263 192.944918 192.944918 290.889218 290.621611-31.310063 29.169204-62.352519 57.803193-93.662582 86.972397-93.662582-93.662582-190.001237-190.001237-286.875107-286.875107-104.099269 71.451169-215.691545 95.535833-336.917687 66.901844-96.87387-22.746627-175.015224-75.732887-233.621239-156.282708-120.690927-165.648966-98.747122-390.439162 42.81718-530.130212 149.860131-147.719272 377.861615-153.339027 534.947145-33.450922C814.08369 205.389036 876.436208 448.644141 738.618409 646.405992zM728.984544 407.700212C728.984544 230.008915 585.814598 86.036146 408.658514 86.036146 231.502431 86.036146 86.994448 230.276522 86.994448 407.164998c0 178.226513 143.972768 322.466888 321.664066 321.664066C587.152634 728.293849 728.984544 585.926725 728.984544 407.700212z"
            p-id="4258"
          ></path>
        </svg>
        <input
          id="searchInput"
          class="bg-transparent text-gray-500 w-full h-8 text-lg txtDark_Primary"
          v-model="queryInput"
          type="text"
          placeholder="在列表中查找"
          @focus="inputOnFocus"
        />
        <!-- <div
            class="bg-transparent text-gray-500 w-full h-8 text-lg txtDark_Primary"
            @click="inputFocus"
            >
            在列表中查找
          </div> -->
      </div>
      <div
        id="cancelSearch"
        class="fastTrans w-0 overflow-hidden whitespace-nowrap flex justify-center items-center"
        :style="{
          width: inputFocus ? '3rem' : '0px',
        }"
        @click="inputBlur"
      >
        <text class="text-red-500">取消</text>
      </div>
    </div>
    <div
      id="searchDivider"
      class="bgDark_Primary"
      :style="{
        opacity: showDivider || inputFocus ? '1' : '0',
      }"
    ></div>
  </div>
</template>
<style lang="scss">
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  display: none;
  background: transparent;
}

#searchDivider {
  width: 100%;
  background: rgba(206, 206, 206, 0.686);
  height: 1px;
  transition: all 0.5s ease-in-out;
}
</style>