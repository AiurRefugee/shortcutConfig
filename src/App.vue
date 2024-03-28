<script setup>
import { ref, onMounted, provide, inject } from "vue";
import axios from "axios";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import ScrollNav from "@/components/scrollNav.vue";
import debugGUI from "@/components/debugGUI.vue";
import ScrollView from "@/viewComponent/scrollView.vue";
import { shortcutConfig } from "@/assets/shortcutConfig";
import { calScroll } from "@/utils/util.js";

// components
import shortcut from "@/views/shortcut.vue";

const gui = ref({
  down: false,
  startY: 0,
  endY: 0,
});

const breakPointSmall = 628;
const breakPointNormal = 1375;
const rightThreshold = 0.2;
const moveThreshold = 75;
const port = 5173;
const lgUrl = `http://localhost:${port}`;
const sizes = [];

const $bus = inject("$bus");
$bus.on("update", update);

var startY = null;

const size = ref("normal");
const ShortcutConfig = ref(shortcutConfig);
const rotateDeg = ref(0);
const showScrollNav = ref(false);

function removeShortcut(index) {
  ShortcutConfig.value.splice(index, 1);
  update();
}

function update() {
  axios
    .post(lgUrl + "/write-file", ShortcutConfig.value)
    .then(function (response) {})
    .catch((error) => {
      ElMessage({
        type: "error",
        message: error,
      });
    });
}

function addShortcut() {
  ShortcutConfig.value.unshift({
    shortcutName: "",
    params: [],
    tempNodes: [],
    nameFinished: false,
    canAddKeyValue: true,
    canAddSecParam: true,
  });
  update();
}

function enableScroll() {
  const container = document.querySelector(".appContainer");
  container.style.overflow = "auto";
}

function disableScroll() {
  if (showScrollNav.value) {
    return false;
  }
  const container = document.querySelector(".appContainer");
  container.style.overflow = "hidden";
  setTimeout(enableScroll, 500);
}

function setScrollHeight(height) {
  const container = document.querySelector(".appContainer");
  container.style["overflow-y"] = "auto";
  container.scrollTop = window.innerHeight - height;
  container.style["overflow-y"] = "hidden";
}

function listenGesture() {
  let touchStartX = 0;
  const screenWidth = window.innerWidth;
  var down = false;

  window.addEventListener("pointerdown", function (event) {
    event.stopPropagation();
    event.preventDefault();
    touchStartX = event.clientX;
    startY = event.clientY;
    gui.value.startY = startY;
    down = true;
    gui.value.down = true;
  });

  window.onpointermove = function (event) {
    event.preventDefault();
    event.stopPropagation();
    setScrollHeight(touchEndY);
  };
  window.addEventListener("pointerup", function (event) {
    if (down) {
      const touchEndX = event.clientX;
      const touchEndY = event.clientY;
      gui.value.endY = touchEndY;

      console.log(touchStartX, screenWidth * rightThreshold);
      if (touchStartX >= screenWidth * rightThreshold) {
        if (touchStartX - touchEndX >= moveThreshold) {
          console.log("从最右边往左划动");
          showScrollNavWidget();
          down = false;
        }
      }
      if (touchEndX - touchStartX >= moveThreshold) {
        console.log("向右划动");
        hideScrollNavWidget();
        down = false;
      }
    }
    down = false;
    gui.value.down = false;

    // window.onpointermove = null;
  });
}

function showScrollNavWidget() {
  rotateDeg.value = 10;
  showScrollNav.value = true;
}

function hideScrollNavWidget() {
  rotateDeg.value = 0;
  showScrollNav.value = false;
}

onMounted(() => {
  calWindowSize();
  window.addEventListener("resize", calWindowSize);
});

function vibrate() {
  // 检查设备是否支持振动
  if ("vibrate" in navigator) {
    // 触发振动，可以传递一个振动模式数组，如 [100, 200, 300]，表示振动100ms，停止200ms，再振动300ms
    navigator.vibrate([200, 100, 200]);
  } else {
    alert("您的设备不支持振动功能。");
  }
}

function calWindowSize() {
  var newSize = "normal";
  console.log("resize");
  const windowSize = window.innerWidth;
  if (windowSize <= breakPointSmall) {
    newSize = "small";
  } else if (windowSize > breakPointSmall && windowSize <= breakPointNormal) {
    newSize = "normal";
  }
  if (windowSize > breakPointNormal) {
    newSize = "large";
  }
  size.value = newSize;
  return newSize;
}
</script>
<template>
  <!-- <debugGUI :gui="gui"></debugGUI> -->
  <ScrollView :calScrollFunc="calScroll">
    <template v-slot:header>
      <header class="w-full h-10 flex justify-center items-center appHeader">
        <h1 class="title text-2xl">ShortcutConfig</h1>
      </header>
    </template>
    <template v-slot:content>
      <div class="appContainer">
        <div id="scrollTitle" class="ShortcutConfig mt-10 h-10 w-full font-bold">
          <h1>ShortcutConfig</h1>

          <div class="addWrapper ml-4">
            <el-icon @click="addShortcut"><CirclePlusFilled /></el-icon>
          </div>
        </div>
        <div class="perspectWrapper" v-if="size != 'small'">
          <div
            class="shortcutContainer pb-16"
            :style="{
              transform: `rotate3d(0, 1, 0, ${rotateDeg}deg)`,
            }"
          >
            <shortcut
              v-for="(shortcut, index) in ShortcutConfig"
              :key="index"
              :shortcut="shortcut"
              :index="index"
              :shortcutName="shortcut.shortcutName"
              @removeShortcut="removeShortcut"
              @checkName="checkName"
            />
            <div class="w-full h-24"></div>
          </div>
        </div>
        <div class="w-full p-4 overflow-auto" v-else>
          <div class="w-full text-white rounded-2xl overflow-hidden">
            <button
              class="w-full flex-shrink-0 py-2 px-4 bgLight_Secondary text-left"
              v-for="(shortcut, index) in ShortcutConfig"
              :key="index"
            >
              <div class="w-full flex justify-between items-center">
                <div class="">
                  <p class="text-2xl txtDark_Primary">
                    {{ shortcut.shortcutName }}
                  </p>
                  <div class="mr-4 mt-1 mb-2 overflow-hidden">
                    <span
                      class="mx-1 txtDark_Basic overflow-hidden whitespace-nowrap"
                      v-for="item in shortcut.params.slice(0, 5)"
                      :key="item"
                      >{{ item.key }}</span
                    >
                    <span class="txtDark_Basic" v-if="shortcut.params">...</span>
                  </div>
                </div>
                <div class="w-6 aspect-auto">
                  <svg class="w-full h-full txtDark_Basic" viewBox="0 0 1024 1024">
                    <path
                    class="bgDark_Basic"
                    d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
                    p-id="1451"
                  ></path>
                  </svg>
                </div>
              </div>
              <div class="w-full bgLight_Basic" style="height: 2px" v-if="index != ShortcutConfig.length - 1"></div>
            </button>
          </div>
        </div>
      </div>
    </template>
  </ScrollView>
</template>
<style lang="scss" scoped>
</style>