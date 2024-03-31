<script setup>
import { ref, onMounted, inject } from "vue";

import gsap from "gsap";
const props = defineProps(["object", "deleteParamsFunc", "type", "index"]);
const $bus = inject("$bus");
const emit = defineEmits(["addKeyValue"]);
const deleteShortcut = inject("deleteShortcut");
const addKeyValue = inject("addKeyValue");
const addSecParam = inject("addSecParam");
const getAddParam = inject("getAddParam")
const showAddDialog = ref(false);

function addKeyValueFunc() {
  if (props.type == "shortcut") {
    addKeyValue();
  }
}

async function getAddParamFunc() {
  const res = await getAddParam()
  console.log("res", res);
}

function addSecParamFunc() {
  if (props.type == "shortcut") {
    addSecParam();
  }
}



onMounted(() => {
  // console.log("wrapperName", props.object.canAddParam);
});
</script>
<template>  
  <!-- 添加参数或键值对 -->
  <div id="add" class="w-0 flex-shrink-0 overflow-hidden">
    <el-button ref="buttonRef" type="primary" @click="getAddParamFunc"
      >添加</el-button
    >
  </div>
  <div id="delete" class="w-0 flex-shrink-0 overflow-hidden">
    <div v-if="type == 'shortcut'">
      <el-button type="danger" @click="deleteShortcut(index)">删除</el-button>
    </div>
    <div v-if="type == 'params'">
      <el-button type="danger" @click="deleteParamsFunc(index)">删除</el-button>
    </div>
    <div v-if="type == 'tempNodes'">
      <el-button type="danger" @click="deleteParamsFunc(index)">删除</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>