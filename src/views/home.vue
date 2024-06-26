<script setup>
import { ref, onMounted, provide, inject, computed } from "vue";
import axios from "axios";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

import searchBar from "../components/searchBar.vue";
import gsap from "gsap";
import { shortcutStore } from "@/store/shortcut";
import { ShortcutConfigExports } from "@/utils/shortcutConfig.js";
const store = shortcutStore();

const router = useRouter();
const ShortcutConfig = ref(ShortcutConfigExports);
// components
import debugGUI from "@/components/debugGUI.vue";
import ScrollView from "@/viewComponent/scrollView.vue";
import appHeader from "@/components/header.vue";
import shortcutComponent from "@/components/shortcut.vue";

const header = ref(null);
const scrollView = ref();
const showTitle = ref(false);
const queryInput = ref("");
const inputFocus = ref(false);
const scrollManager = {
  showed: false,
  threshold: 40,
};
const $bus = inject("$bus");
$bus.on("update", update);

function filterValue(originObject, queryInput) {
  if (
    originObject.key &&
    originObject.key.toString().toLowerCase().includes(queryInput.toLowerCase())
  ) {
    console.log(
      originObject.key,
      originObject.key
        .toString()
        .toLowerCase()
        .includes(queryInput.toLowerCase()),
      queryInput
    );
    return true;
  }
  // 如果值包含关键词
  if (
    originObject.value &&
    originObject.value
      .toString()
      .toLowerCase()
      .includes(queryInput.toLowerCase())
  ) {
    console.log(
      originObject.value,
      originObject.value
        .toString()
        .toLowerCase()
        .includes(queryInput.toLowerCase()),
      queryInput
    );
    return true;
  }
  if (originObject.params) {
    for (const item of originObject.params) {
      if (filterValue(item, queryInput)) {
        return true;
      }
    }
  }
  return false;
}

function update() {
  console.log("update", ShortcutConfig.value);
}

async function addShortcut() {
  console.log("addShortcut");
  const newShortcut = await store.getAddParam("shortcut");
  ShortcutConfig.value.unshift(newShortcut);
}

function deleteShortcut(index) {
  console.log("deleteShortcut", index);
  gsap.to(`#shortcut${index}`, {
    transform: "translate(0, -100px)",
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    onComplete: () => {
      ShortcutConfig.value.splice(index, 1);
    },
  });

  // update();
}

function deleteKeyValue(index, keyValueIndex) {
  ShortcutConfig.value[index].params.splice(keyValueIndex, 1);
}

const fileteredList = computed(() => {
  if (!queryInput.value) {
    return ShortcutConfig.value;
  } else {
    return ShortcutConfig.value.filter((shortcut) => {
      return filterValue(shortcut, queryInput.value);
    });
  }
});

onMounted(() => {});

function navToDetail(shortcut) {
  router.push({
    path: "/detail/" + shortcut.shortcutName,
    replace: true,
  });
}

function test() {
  console.log("parent test");
  console.log(header.value);
  header.value.test();
}

function handleScroll() {
  if (scrollView.value.scrollTop > 32) {
    showTitle.value = true;
  } else {
    showTitle.value = false;
  }
}

</script>
<template>
  <div
  ref="scrollView"
    class="w-full h-full overflow-overlay relative z-0"
    @scroll="handleScroll(scrollView, $event)"
  >
    <appHeader
      @test="test"
      ref="header"
      :title="'ShortcutConfig'"
      :showTitle="showTitle"
      :inputFocus="inputFocus"
      @click="test"
    />
    <div
      id="scrollTitle"
      class="fastTrans w-full flex justify-center items-center px-4 overflow-hidden"
      :style="{
        opacity: showTitle ? '0' : '1',
        height: inputFocus ? '0' : '2.5rem',
      }"
    >
      <div
        class="flex max-width-screen items-center text-3xl m-auto w-full font-bold txtDark_Primary"
      >
        <h1>ShortcutConfig</h1>

        <div class="addWrapper ml-4" @click="addShortcut">
          <el-icon><CirclePlusFilled /></el-icon>
        </div>
      </div>
    </div>
    <searchBar
      v-model:queryInput="queryInput"
      v-model:inputFocus="inputFocus"
      :showDivider="showTitle"
    />
    <div class="w-full flex justify-center items-center">
      <div class="shortcutContainer">
        <div class="txtDark_Primary text-2xl font-bold"></div>
        <shortcutComponent
          v-for="(shortcut, index) in fileteredList"
          :key="shortcut"
          :shortcut="shortcut"
          :shortcutIndex="index"
          @removeShortcut="deleteShortcut"
        >
        </shortcutComponent>
        <div class="w-full h-24"></div>
      </div>
    </div>

    <div
      class="shortcutList w-full px-4 pt-2 flex flex-col items-center overflow-auto"
    >
      <div class="w-full max-width-screen rounded-xl overflow-hidden">
        <button
          class="w-full flex-shrink-0 p-2 pb-0 bgLight_Secondary text-left"
          v-for="(shortcut, index) in fileteredList"
          :key="index"
          @click="navToDetail(shortcut)"
        >
          <div class="w-full flex justify-between items-center">
            <div class="">
              <p class="text-lg txtDark_Primary">
                {{ shortcut.shortcutName }}
              </p>
              <div
                class="mr-1 ml-1 txtDark_Basic text-sm text-left mb-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-64"
              >
                <span
                  class="mr-2 overflow-hidden whitespace-nowrap text-ellipsis"
                  v-for="item in shortcut.params.slice(0, 5)"
                  :key="item"
                  >{{ item.key }}</span
                >
                <span class="txtDark_Basic" v-if="shortcut.params">...</span>
              </div>
            </div>
            <div class="w-5 aspect-auto">
              <svg class="w-full h-full txtDark_Basic" viewBox="0 0 1024 1024">
                <path
                  class="bgDark_Basic"
                  d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
                  p-id="1451"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="w-full bgLight_Basic"
            style="height: 1px"
            v-if="index != fileteredList.length - 1"
          ></div>
        </button>
      </div>
      <div id="test" class="w-full h-96"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// .comFather:focus-within #scrollTitle {
//   opacity: 0;
//   height: 0;
// }
// .comFather:focus-within #searchWrapper {
// translate: 0 -80px;
// position: fixed;
// top: 0;
// height: 0;
// transition: all 0.3s ease-in-out 0.4s;
//   #cancelSearch {
//     width: 4rem;
//   }
// }
// .comFather:focus-within header {
//   opacity: 0;
//   height: 0;
// }
// .comFather:focus-within .shortcutList {
//   transition: none;
//   padding-top: 3rem;
// }
</style>