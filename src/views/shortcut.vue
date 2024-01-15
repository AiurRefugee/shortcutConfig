<script setup>
import { ref, onMounted } from "vue";

import widget from "@/components/widget.vue";
import addButton from "@/components/addButton.vue";
import { calHeight } from "../utils/util";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

const props = defineProps(["shortcut", "shortcutName", "pointer"]);
const emit = defineEmits(["removeShortcut"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

// 删除
function removeParam(index) { 
  props.shortcut.params.splice(index, 1); 
  console.log(props.shortcut.params.length - 1, index)
  if( props.shortcut.params.length == 0 ) {
    emit('removeShortcut', props.pointer)
  }
}
 


onMounted(() => {
  // console.log(calHeight(props.shortcut));
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
    <div class="wrapper" :id="shortcutName" style="margin-bottom: 1vh; max-height: 80vh;">
      <widget
        v-for="(param, index) in shortcut.params"
        :key="index"
        :readOnly="shortcut.readOnly"
        :param="param" 
        :widgetPointer="index"
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