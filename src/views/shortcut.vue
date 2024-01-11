<script setup>
import { ref, onMounted } from "vue";

import widget from "@/components/widget.vue";
import addButton from "@/components/addButton.vue";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

const props = defineProps(["shortcut", "shortcutName"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

// 删除参数
function removeParam(paramName) {
  console.log(paramName);
  delete props.shortcut.params[paramName];
}

// 删除tempNode中的元素
function removeTempNode(index) {
  console.log(index);
  props.shortcut.tempNodes.splice(index, 1);
}

function calHeight(object) {
  if (!object.params && !object.tempNodes) {
    return 1;
  } else {
    let paramNum = 0;
    let tempNum = 0;
    if (object.params) {
      for (const [key, subObj] of Object.entries(object.params)) {
        // console.log(key, subObj)
        paramNum += calHeight(subObj);
        console.log(key, paramNum)
      }
    }
    if (object.tempNodes) {
      for (const subTemp of object.tempNodes) {
        tempNum += calHeight(subTemp);
        console.log(subTemp.key, tempNum)
      }
    }
    return paramNum + tempNum;
  }
}

onMounted(() => {
  console.log(calHeight(props.shortcut));
});
</script>
<template>
  <div class="list">
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
    <div class="wrapper" :id="shortcutName" style="margin-bottom: 1vh">
      <widget
        v-for="(param, paramName) in shortcut.params"
        :key="paramName"
        :readOnly="shortcut.readOnly"
        :param="param"
        :paramName="paramName"
        :widgetPointer="shortcutName"
        :layer="0"
        @removeParam="removeParam"
        @removeTempNode="removeTempNode"
      />

      <div v-if="shortcut.canAddKeyValue && shortcut.tempNodes">
        <widget
          v-for="(keyValue, index) in shortcut.tempNodes"
          :key="index"
          :param="keyValue"
          :widgetPointer="index"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
        />
      </div>
    </div>
    <addButton
      :object="shortcut"
      :wrapperName="shortcutName"
      addDiretion="btt"
    />
  </div>
</template>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.el-input-group__append {
  padding: 0 10px;
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
    display: flex;
    justify-content: center;
  }
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
}
</style>