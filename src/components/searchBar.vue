<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
const props = defineProps(["queryInput", "showDivider"]);
const queryInput = defineModel("queryInput");
const inputFocus = defineModel("inputFocus");
const focusFinished = defineModel("focusFinished");
const searchContent = ref("");
const searchWrapper = ref();
const aniDur = 0.3;

const emit = defineEmits(["setFocusFinised"]);

function inputOnFocus() {
  inputFocus.value = true;
  gsap.to("#scrollTitle", {
    height: 0,
    ease: "power1.inOut",
    duration: aniDur,
  });
  gsap.to("#cancelSearch", {
    width: "3rem",
    duration: aniDur,
    ease: "power1.inOut",
  });
  gsap.to("#appHeader", {
    height: "0",
    duration: aniDur,
    ease: "power1.inOut",
    onComplete: () => {
      focusFinished.value = true;
      const scrollView = document.getElementById("scrollView");
      const searchBar = document.getElementById("searchBar");
      scrollView.insertAdjacentElement("beforebegin", searchBar);
      setTimeout(() => {
        const searchInput = document.getElementById("searchInput");
        console.log(searchInput);
        searchInput.focus();
      }, 500);
    },
  });
}

function inputBlur() {
  inputFocus.value = false;
  const scrollTitle = document.getElementById("scrollTitle");
  const searchBar = document.getElementById("searchBar");
  scrollTitle.insertAdjacentElement("afterend", searchBar);
  // const mask = document.getElementById("mask");
  // const searchInput = document.getElementById("searchInput");
  // searchInput;
  // // mask.style.display = "none";
  // const searchBarWrapper = document.getElementById("searchBarWrapper");
  focusFinished.value = false;
  gsap.to("#cancelSearch", {
    width: "0",
    duration: aniDur,
  });
  gsap.to("#scrollTitle", {
    height: "4rem",

    duration: aniDur,
    ease: "power1",
  });
  gsap.to("#appHeader", {
    height: "2rem",
    duration: aniDur,
    ease: "power1",
    onComplete: () => {},
  });
  // gsap.to('#searchBar', {
  //   paddingTop: '0.25rem',
  //   duration: aniDur,
  //   ease: "power1",
  // })

  // gsap.to("#cancelSearch", {
  //   width: "0",
  //   margin: "0",
  //   duration: aniDur,
  // });
  // gsap.to("#appHeaderWrapper", {
  //   height: "2rem",
  //   duration: aniDur,
  //   onUpdate: () => {
  //     console.log("update");
  //   },
  //   onComplete: () => {
  //     searchInput.blur();
  //   },
  // });
}

onMounted(() => {
  // setTimeout(() => {
  //   const height = window.visualViewport.height;
  //   alert(height);
  // }, 1000);
});
</script>
<template>
  <div
    class="overflow-hidden pt-0 pb-4 pl-4 flex items-center fastTrans bgLight_Primary"
  >
    <div
      class="inputWrap w-full h-full bgSearch flex-1 flex items-center rounded-lg px-2"
    >
      <svg viewBox="0 0 1030 1024" class="aspect-auto h-4 mr-2">
        <path
          fill="#858585"
          d="M738.618409 646.405992c96.606263 96.606263 192.944918 192.944918 290.889218 290.621611-31.310063 29.169204-62.352519 57.803193-93.662582 86.972397-93.662582-93.662582-190.001237-190.001237-286.875107-286.875107-104.099269 71.451169-215.691545 95.535833-336.917687 66.901844-96.87387-22.746627-175.015224-75.732887-233.621239-156.282708-120.690927-165.648966-98.747122-390.439162 42.81718-530.130212 149.860131-147.719272 377.861615-153.339027 534.947145-33.450922C814.08369 205.389036 876.436208 448.644141 738.618409 646.405992zM728.984544 407.700212C728.984544 230.008915 585.814598 86.036146 408.658514 86.036146 231.502431 86.036146 86.994448 230.276522 86.994448 407.164998c0 178.226513 143.972768 322.466888 321.664066 321.664066C587.152634 728.293849 728.984544 585.926725 728.984544 407.700212z"
          p-id="4258"
        ></path>
      </svg>
      <div
        v-if="!focusFinished"
        @click="inputOnFocus"
        class="bg-transparent w-full text-base"
      >
        <text class="txtDark_Secondary" v-if="queryInput">{{ queryInput }}</text>
        <text class="txtPlaceHolder" v-else>在列表中查找</text>
      </div>
      <input
        v-else 
        id="searchInput"
        class="bg-transparent font-normal text-gray-500 w-full text-base txtDark_Primary"
        v-model="queryInput"
        type="text"
        placeholder="在列表中查找"
      />
    </div>
    <button
      id="cancelSearch"
      class="w-0 mx-2 overflow-hidden whitespace-nowrap flex justify-center items-center"
      :style="{
        // width: inputFocus ? '3rem' : 0,
      }"
      @click="inputBlur"
    >
      <text class="text-red-500">取消</text>
    </button>
  </div>
  <div
    id="searchDivider"
    class="bgDark_Primary"
    :style="{
      opacity: showDivider ? '1' : '0',
    }"
  ></div>
</template>
<style lang="scss"> 
.inputWrap {
  padding: 0.3rem 0.5rem;
}
#searchDivider {
  width: 100%;
  background: rgba(82, 82, 82, 0.622);
  height: 0.8px;
  transition: all 0.5s ease-in-out;
}
</style>