<script setup>
import { ref, onMounted, inject } from "vue";

import gsap from "gsap";
const props = defineProps(["deleteParamsFunc", "type", "index"]);
const $bus = inject("$bus");
const emit = defineEmits(["addKeyValue", "deleteParam"]);


function addKeyValue() {
  emit('addKeyValue')
}

function deleteParam(index) {
  emit('deleteParam', index)
}

onMounted(() => {
  // console.log("wrapperName", props.object.canAddParam);
});
</script>
<template>  
  <!-- 添加参数或键值对 -->
  <div id="add" class="w-0 flex-shrink-0 overflow-hidden">
    <el-button ref="buttonRef" type="primary" @click="addKeyValue"
      >添加</el-button
    >
  </div>
  <div id="delete" class="w-0 flex-shrink-0 overflow-hidden">
    <div>
      <el-button type="danger" @click="deleteParam(index)">删除</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>