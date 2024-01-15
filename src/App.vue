<script setup>
import { ref, onMounted, provide } from "vue";
import axios from "axios"; 
import { shortcutConfig } from "@/assets/shortcutConfig.js"; 

// components
import shortcut from "@/views/shortcut.vue"; 

const port = 5173;
const lgUrl = `http://localhost:${port}`; 
const width = 20;
const height = 20;
const heighCell = 2;
const sizes = []
const buttonRef = ref(null);
const ShortcutConfig = ref()

let addingKeyValue = false;
let indexedArray = [];


function calSize(obj) {
   if(!obj.params && !obj.tempNodes) {
    return 1
   } 
   let paramCal = 0, tempNodeCal = 0
   if(obj.params) {
    for ( const item of obj.params ) {
      paramCal += calSize(item) 
    }
   }
   if(obj.tempNodes) {
    for ( const item of obj.tempNodes ) {
      tempNodeCal += calSize(item) 
    }
   }
   return paramCal + tempNodeCal
}

function active(shortcut, value) {
  if (shortcut.executable) {
    shortcut.activeValue = value;
  }
}

function removeShortcut(index) {
  ShortcutConfig.value.splice(index, 1);
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

  shortcutConfig.map(item => sizes.push(calSize(item)))

  indexedArray = shortcutConfig.map((value, index) => ({ value: calSize(value), index }));
  
  indexedArray.sort((a, b) => a.value - b.value)

  ShortcutConfig.value = indexedArray.map(item => shortcutConfig[item.index])
  

  
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
   <shortcut v-for="(shortcut, index) in ShortcutConfig" 
      :key="index"
      :shortcut="shortcut"
      :pointer="index"
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