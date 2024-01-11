<script setup>
import { ref, onMounted, provide } from "vue";
import axios from "axios"; 
import { shortcutConfig } from "@/assets/shortcutConfig.js"; 

// components
import shortcut from "@/views/shortcut.vue"; 

const port = 5173;
const lgUrl = `http://localhost:${port}`;
const sizes = {};
const width = 20;
const height = 20;
const heighCell = 2;
const ShortcutConfig = ref(shortcutConfig);
const buttonRef = ref(null);

let addingKeyValue = false;

function calSize(obj) {
  let height = 0;
  let width = 0;
  let onlySwitch = true;
  function retriveObj(obj) {
    if (typeof obj !== "object" || obj === null) {
      return 0;
    }
    let maxDepth = 0;
    if (typeof obj === "object") {
      if (Object.keys(obj).indexOf("value") == -1) {
        for (const value of Object.values(obj)) {
          const depth = retriveObj(value);
          maxDepth = Math.max(maxDepth, depth);
        }
        width += 10;
        return maxDepth + 10;
      } else {
        height += heighCell;
        if (obj.type == "switch") {
          onlySwitch = false;
        }
      }
    }
    return maxDepth;
  }
  width = retriveObj(obj);
  return {
    width: width + 10,
    height: height,
  };
}

function active(shortcut, value) {
  if (shortcut.executable) {
    shortcut.activeValue = value;
  }
}



function update() {
  // axios
  //   .post(lgUrl + "/write-file", shortcutConfig.value)
  //   .then(function (response) {
  //   })
  //   .catch((error) => {
  //     ElMessage({
  //       type: "error",
  //       message: error,
  //     });
  //   });
}

onMounted(() => {
  //   axios({
  //     method: "get",
  //     url: lgUrl + "/read-file",
  //     responseType: "stream",
  //   })
  //     .then(function (response) {
  //       shortcutConfig.value = JSON.parse(response.data);
  //       // for(const [key, value] of Object.entries(shortcutConfig.value)) {
  //       //   const size = calSize(value)
  //       //   sizes[`${key}`] = {
  //       //     width: parseInt(size.width / 100 * width),
  //       //     height: Math.ceil(size.height / 100 * height),
  //       //   }
  //       // }
  //       // console.log(sizes)
  //     })
  //     .catch((error) => {
  //       ElMessage({
  //         type: "error",
  //         message: error,
  //       });
  //     });
});
</script>
<template>
  <div class="appContainer">
    <!-- <iframe src="https://store.steampowered.com/wishlist/profiles/76561198973207878/#sort=order" width="600" height="400"></iframe> -->
    <h1>ShortcutConfig</h1>
   <shortcut v-for="(shortcut, shortcutName) in ShortcutConfig" 
      :key="shortcutName"
      :shortcut="shortcut"
      :shortcutName="shortcutName"
      />
  </div>
</template>
<style lang="scss" scoped>  

</style>