<script setup>
import { ref, onMounted, inject } from "vue";
import { copyToClipboard, adding } from "@/utils/util.js";
import gsap from "gsap";
const props = defineProps(["object", "wrapperName", "addDiretion"]);
const $bus = inject("$bus");
const emit = defineEmits(["addKeyValue"]);

onMounted(() => {
  // console.log("wrapperName", props.object.canAddKeyValue);
});
</script>
<template>
  <!-- 添加参数或键值对 -->
  <div v-if="object.canAddKeyValue && object.canAddSecParam">
    <el-popover
      v-if="object.canAddSecParam"
      placement="left"
      title="选择添加类型"
      :width="200"
      trigger="click"
    >
      <template #reference>
        <div
          id="add"
          class="w-0 flex-shrink-0 mr-2 overflow-hidden"
        >
        <el-button
            ref="buttonRef"
            type="primary" 
            >添加</el-button
          >
        </div>
      </template>
      <el-row justify="space-around" style="width: 100%" :gutter="10">
        <el-col :span="12"
          ><el-button type="primary" 
            >键值对</el-button
          ></el-col
        >
        <el-col :span="12"
          ><el-button type="primary" 
            >二级参数</el-button
          ></el-col
        >
      </el-row>
    </el-popover>
  </div>
  <div
    id="add"
    class="w-0 flex-shrink-0 mr-2 overflow-hidden"
    v-if="object.canAddKeyValue && !object.canAddSecParam"
  >
    <el-button
      ref="buttonRef"
      type="primary"
      @click="addKeyValue(object, wrapperName)"
      >添加</el-button
    >
  </div>
  <div id="delete" class="w-0 flex-shrink-0 overflow-hidden mr-2">
    <el-button type="danger">删除</el-button>
  </div>
</template>
<style lang="scss" scoped>
</style>