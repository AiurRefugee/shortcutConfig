<script setup>
import { ref, onMounted, provide, inject, computed } from "vue";
import axios from "axios";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import debugGUI from "@/components/debugGUI.vue";
import ScrollView from "@/viewComponent/scrollView.vue";
import appHeader from "@/components/header.vue";
import { useRouter } from "vue-router";

import detailView from "@/views/detailView.vue";
import { calScroll } from "@/utils/utils.js";
import gsap from "gsap";
import { shortcutStore } from "@/store/shortcut";
import { ShortcutConfigExports } from "@/utils/shortcutConfig.js";
const store = shortcutStore();

const router = useRouter();
const ShortcutConfig = ref(ShortcutConfigExports)
// components
import shortcutComponent from "@/components/shortcut.vue";

const port = 5173;
const lgUrl = `http://localhost:${port}`;

const $bus = inject("$bus");
$bus.on("update", update);
 
console.log('ShortcutConfig', ShortcutConfig.value)
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

onMounted(() => {});

function navToDetail(shortcut) {
  router.push({
    path: "/detail/" + shortcut.shortcutName,
    replace: true,
  });
}
</script>
<template> 
  <!-- <ScrollView :calScrollFunc="calScroll">
    <template v-slot:header> -->
      <!-- <appHeader :title="'shortcutConfig'" />
    </template>
    <template v-slot:content>  -->
        <div
          id="scrollTitle"
          class="ShortcutConfig mt-12 h-10 w-full font-bold"
        >
          <h1 class="flex-shrink-0">ShortcutConfig</h1>
          <div class="addWrapper ml-4" @click="addShortcut">
            <el-icon><CirclePlusFilled /></el-icon>
          </div>
        </div>
        <div class="shortcutContainer pb-16"> 
            <div
              v-for="(shortcut, index) in ShortcutConfig"
              :key="shortcut"
              :shortcut="shortcut"
              :shortcutIndex="index" 
              @removeShortcut="deleteShortcut"
            >{{ shortcut }}
            </div> 
          <div class="w-full h-24"></div>
        </div>

        <div class="shortcutList w-full p-6 overflow-auto">
          <div class="w-full rounded-2xl overflow-hidden">
            <button
              class="w-full flex-shrink-0 py-2 px-4 bgLight_Secondary text-left"
              v-for="(shortcut, index) in ShortcutConfig"
              :key="index"
              @click="navToDetail(shortcut)"
            >
              <div class="w-full flex justify-between items-center">
                <div class="">
                  <p class="text-lg txtDark_Primary">
                    {{ shortcut.shortcutName }}
                  </p>
                  <div class="mr-4 ml-1 text-sm text-left mb-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-64">
                    <span
                      class="mr-2 txtDark_Basic overflow-hidden whitespace-nowrap text-ellipsis"
                      v-for="item in shortcut.params.slice(0, 5)"
                      :key="item"
                      >{{ item.key }}</span
                    >
                    <span class="txtDark_Basic" v-if="shortcut.params"
                      >...</span
                    >
                  </div>
                </div>
                <div class="w-6 aspect-auto">
                  <svg
                    class="w-full h-full txtDark_Basic"
                    viewBox="0 0 1024 1024"
                  >
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
                v-if="index != ShortcutConfig.length - 1"
              ></div>
            </button>
          </div>
          <div id="test" class="w-full h-52"></div>
        </div> 
    <!-- </template>
  </ScrollView> -->
</template>
<style lang="scss" scoped>
</style>