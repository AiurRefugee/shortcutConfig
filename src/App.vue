<script setup>
import { ref, onMounted, provide } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { shortcutConfig } from "@/assets/shortcutConfig.js";
import { CopyDocument, Share } from "@element-plus/icons-vue";
import { copyToClipboard } from "@/utils/util.js";

// components
import widget from "@/components/widget.vue";
import addButton from "@/components/addButton.vue";

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

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
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
    <div
      class="list"
      v-for="(shortcut, shortcutName) in ShortcutConfig"
      :key="shortcutName"
    >
      <div class="title">
        <h2>{{ shortcutName }}</h2>
        <div
          class="exec"
          v-if="shortcut.executable"
          @click="runShortCut(shortcutName)"
        >
          <Share />
        </div>
      </div>
      <!-- 外层参数-->
      <div
        class="wrapper"
        :id="shortcutName"
        style="margin-bottom: 2vh"
      >
        <widget
          v-for="(param, paramName, index) in shortcut.params"
          :key="paramName"
          :readOnly="shortcut.readOnly"
          :param="param"
          :paramName="paramName"
          :widgetIndex="index"
          :layer="0"
        />

        <div v-if="shortcut.canAddKeyValue && shortcut.tempNodes">
          <TransitionGroup name="fade" tag="ul">
            <widget
              v-for="(keyValue, index) in shortcut.tempNodes.params"
              :key="index"
              :param="keyValue"
              :widgetIndex="index"
            />
          </TransitionGroup>
        </div>
      </div>
      <addButton
        :object="shortcut"
        :wrapperName="shortcutName"
        addDiretion="btt"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
$radius: 10px;

$border: 2px solid lightgray;
::-webkit-scrollbar {
  display: none;
}
.el-input-group__append {
  padding: 0 10px;
}
h1 {
  width: 100%;
}
h1,
h2,
h3 {
  // width: 80%;
  padding: 0 2%;
  text-shadow: rgba(133, 129, 129, 0.8196078431) 5px 0px 8px;
}
.add {
  height: var(--cellHeight);
  width: 50px;
  border-radius: var(--radius-base);
  background: var(--graColor);
  background: linear-gradient(
    to right,
    var(--graColor) 5%,
    transparent 50%,
    var(--graColor) 95%
  );
  transition: width 0.1s ease-in-out;
}
.add:active {
  width: 100%;
  // background: linear-gradient(to right, var(--graColor) 5%, transparent 50%, var(--graColor) 95%);
}
.title {
  height: 8vh;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  .exec {
    height: 50%;
    width: 15%;
    color: lightgray;
  }
}
.active {
  background-color: #409eff;
  border-radius: var(--radius-base);
  padding: 3px 15px;
}
.list {
  // min-width: 25vw;
  // max-width: 25vw;
  padding: 1% 2%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: var(--radius-lg);
  box-shadow: 0 0 15px 10px #858181d1;
  // background-color: #f6f6f6;

  // .listItem:first-of-type {
  //   border-top-left-radius: var(--radius-lg);
  //   border-top-right-radius: var(--radius-lg);
  // }
  // .listItem:last-of-type {
  //   border-bottom-left-radius: var(--radius-lg);
  //   border-bottom-right-radius: var(--radius-lg);
  //   border-bottom: none;
  // }
}
</style>