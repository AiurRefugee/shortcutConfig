<script setup>
import { ref, onMounted, provide, inject } from "vue";
import axios from "axios";
import { CirclePlusFilled } from "@element-plus/icons-vue";

import { shortcutConfig } from "@/assets/shortcutConfig";

// components
import shortcut from "@/views/shortcut.vue";

const port = 5173;
const lgUrl = `http://localhost:${port}`;
const sizes = [];

const $bus = inject("$bus");
$bus.on("update", update);

const ShortcutConfig = ref(shortcutConfig);

let indexedArray = [];

function calSize(obj) {
  if (!obj.params && !obj.tempNodes) {
    return 1;
  }
  let paramCal = 0,
    tempNodeCal = 0;
  if (obj.params) {
    for (const item of obj.params) {
      paramCal += calSize(item);
    }
  }
  if (obj.tempNodes) {
    for (const item of obj.tempNodes) {
      tempNodeCal += calSize(item);
    }
  }
  return paramCal + tempNodeCal;
}

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

// 检查名称重复
function checkName(name, callBack) {
  callBack(
    ShortcutConfig.value.filter((item) => item.shortcutName == name).length > 1
  );
}

onMounted(() => {
  // axios({
  //   method: "get",
  //   url: lgUrl + "/read-file",
  //   responseType: "stream",
  // })
  //   .then(function (response) {
  //     let shortcutConfig = JSON.parse(response.data);
  //     shortcutConfig.map((item) => sizes.push(calSize(item)));
  //     indexedArray = shortcutConfig.map((value, index) => ({
  //       value: calSize(value),
  //       index,
  //     }));
  //     indexedArray.sort((a, b) => a.value - b.value);
  //     ShortcutConfig.value = indexedArray.map(
  //       (item) => shortcutConfig[item.index]
  //     );
  //   })
  //   .catch((error) => {
  //     ElMessage({
  //       type: "error",
  //       message: error,
  //     });
  //   });
  // shortcutConfig.map((item) => sizes.push(calSize(item)));
  // indexedArray = shortcutConfig.map((value, index) => ({
  //   value: calSize(value),
  //   index,
  // }));
  // indexedArray.sort((a, b) => a.value - b.value);
  // ShortcutConfig.value = indexedArray.map((item) => shortcutConfig[item.index]);
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

</script>
<template> 
    <div class="ShortcutConfig h-10 text-2xl w-full font-bold">
      <h1>ShortcutConfig</h1>
      <div class="addWrapper ml-4">
        <el-icon @click="addShortcut"><CirclePlusFilled /></el-icon>
      </div>
    </div>
    <div class="shortcutContainer pt-10">
      <shortcut
        v-for="(shortcut, index) in ShortcutConfig"
        :key="index"
        :shortcut="shortcut"
        :index="index"
        :shortcutName="shortcut.shortcutName"
        @removeShortcut="removeShortcut"
        @checkName="checkName"
      />
    </div> 
</template>
<style lang="scss" scoped>
 
</style>