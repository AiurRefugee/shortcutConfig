<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const props = defineProps(["showBack", "leftFunc", "title", "scrollFunc"]);

const searchContent = ref("");
const searchWrapper = ref();
onMounted(() => {
  // 目标元素
  const targetElement = searchWrapper.value;

  // 创建一个 Intersection Observer 实例
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.intersectionRatio == 0) {
          //   searchWrapper.value.style.backgroundColor = "#ededed";
        } else {
          // searchWrapper.value.style.backgroundColor = "unset";
        }
      });
    },
    {
      // root: document.querySelector("#appHeader"),
      rootMargin: "-89px",
      threshold: 0,
    }
  );
  // 监视目标元素
  observer.observe(targetElement);
});
</script>
<template>
  <div
    ref="searchWrapper"
    id="searchWrapper"
    class="w-full h-10 overflow-visible  pb-3 px-6 sticky z-50 top-8 basicTrans"
  >
    <div class="max-w-screen-lg m-auto bgLight_Primary w-full h-10 pb-2 flex items-center">
      <div class="w-full h-full bgSearch flex items-center rounded-lg px-2">
        <svg
          viewBox="0 0 1030 1024"
          width="201.171875"
          height="200"
          class="w-5 h-5 mr-2"
        >
          <path
            fill="#858585"
            d="M738.618409 646.405992c96.606263 96.606263 192.944918 192.944918 290.889218 290.621611-31.310063 29.169204-62.352519 57.803193-93.662582 86.972397-93.662582-93.662582-190.001237-190.001237-286.875107-286.875107-104.099269 71.451169-215.691545 95.535833-336.917687 66.901844-96.87387-22.746627-175.015224-75.732887-233.621239-156.282708-120.690927-165.648966-98.747122-390.439162 42.81718-530.130212 149.860131-147.719272 377.861615-153.339027 534.947145-33.450922C814.08369 205.389036 876.436208 448.644141 738.618409 646.405992zM728.984544 407.700212C728.984544 230.008915 585.814598 86.036146 408.658514 86.036146 231.502431 86.036146 86.994448 230.276522 86.994448 407.164998c0 178.226513 143.972768 322.466888 321.664066 321.664066C587.152634 728.293849 728.984544 585.926725 728.984544 407.700212z"
            p-id="4258"
          ></path>
        </svg>
        <div class="inputWrapper w-full">
          <input
            class="bg-transparent text-gray-500 w-full"
            v-model="searchContent"
            type="text"
            placeholder="在列表中查找"
          />
        </div>
      </div>
      <div id="cancelSearch" class="w-0 overflow-hidden whitespace-nowrap flex justify-center items-center">
        <text class="text-red-500">取消</text>
      </div>
    </div>
  </div>
</template>
<style lang="scss"> 
#searchWrapper, #cancelSearch { 
  transition: all 0.3s ease-in-out 0.3s;
} 
</style>