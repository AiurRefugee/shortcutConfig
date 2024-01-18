<script setup>
import { ref, onMounted, provide, inject } from "vue";
import axios from "axios"; 
import { CirclePlusFilled} from "@element-plus/icons-vue";

import { shortcutConfig } from '@/assets/shortcutConfig'

// components
import shortcut from "@/views/shortcut.vue"; 

const port = 5173;
const lgUrl = `http://localhost:${port}`;
const sizes = [];

const $bus = inject("$bus");
$bus.on("update", update);

const ShortcutConfig = ref();

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
}

function update() { 
  axios
    .post(lgUrl + "/write-file", ShortcutConfig.value)
    .then(function (response) {
    })
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
    canAddSecParam: true
  });
}

onMounted(() => { 
      shortcutConfig.map((item) => sizes.push(calSize(item)));

      indexedArray = shortcutConfig.map((value, index) => ({
        value: calSize(value),
        index,
      }));

      indexedArray.sort((a, b) => a.value - b.value);

      ShortcutConfig.value = indexedArray.map(
        (item) => shortcutConfig[item.index]
      ); 
  // axios({
  //   method: "get",
  //   url: lgUrl + "/read-file",
  //   responseType: "stream",
  // })
  //   .then(function (response) { 
  //     // let shortcutConfig = JSON.parse(response.data)
  //     // shortcutConfig.map((item) => sizes.push(calSize(item)));

  //     // indexedArray = shortcutConfig.map((value, index) => ({
  //     //   value: calSize(value),
  //     //   index,
  //     // }));

  //     // indexedArray.sort((a, b) => a.value - b.value);

  //     // ShortcutConfig.value = indexedArray.map(
  //     //   (item) => shortcutConfig[item.index]
  //     // ); 
  //   })
  //   .catch((error) => {
  //     ElMessage({
  //       type: "error",
  //       message: error,
  //     });
  //   });
});
</script>
<template>
  <div class="appContainer" id="appContainer">
    <div class="ShortcutConfig">
      <h1>ShortcutConfig</h1>
    <div class="addWrapper">
      <el-icon @click="addShortcut"><CirclePlusFilled /></el-icon> 
    </div> 
    </div>
    <shortcut
      v-for="(shortcut, index) in ShortcutConfig"
      :key="index"
      :shortcut="shortcut"
      :index="index"
      :shortcutName="shortcut.shortcutName"
      @removeShortcut="removeShortcut"
    /> 
  </div>
</template>
<style lang="scss" scoped>
button {
  height: var(--cellHeight);
} 

</style>