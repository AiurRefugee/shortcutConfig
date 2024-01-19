<script setup>
import { ref, onMounted, inject } from "vue";
import { copyToClipboard, adding } from "@/utils/util.js";
import gsap from "gsap";
const props = defineProps(["object", "wrapperName", "addDiretion"]);
const $bus = inject("$bus");
const emit = defineEmits(["addKeyValue"]);

function addSecParam(object, wrapperName) {
  if (!object.tempNodes) {
    object.tempNodes = [];
  }
  object.tempNodes.push({
    key: "",
    keyFinished: false,
    canAddKeyValue: true,
    tempNodes: [
      {
        type: "input",
        key: "",
        keyFinished: false,
        canAddKeyValue: true,
        value: "",
      },
    ],
  });
  // toBottom(wrapperName);
  if (wrapperName) {
    const wrapper = document.getElementById(wrapperName);
    setTimeout(() => {
      gsap.to(
        wrapper,
        {
          scrollTop: wrapper.scrollHeight,
          duration: 0.5,
          ease: "power1.inOut",
        },
        100
      );
    });
  }
  $bus.emit("update");
}

function addKeyValue(object, wrapperName) {
  if (object.canAddKeyValue) {
    if (!object.tempNodes) {
      object.tempNodes = [];
    }

    if (props.addDiretion == "btt") {
      object.tempNodes.push({
        type: "input",
        key: "",
        keyFinished: false,
        value: "",
      });
      setTimeout(() => {
        const wrapper = document.querySelector(`#${wrapperName}`);
        wrapper.scrollTop = wrapper.scrollHeight;
      }, 50);
    } else {
      object.tempNodes.splice(0, 0, {
        type: "input",
        key: "",
        value: "",
      });
    }
  }
  $bus.emit("update");
}
onMounted(() => {
  // console.log("wrapperName", props.object.canAddKeyValue);
});
</script>
<template>
  <!-- 添加参数或键值对 -->
  <div v-if="object.canAddKeyValue">
    <el-popover
      v-if="object.canAddSecParam"
      placement="top-start"
      title="选择添加类型"
      style="border-radius: var(--radius-base)"
      :width="200"
      trigger="click"
    >
      <template #reference>
        <el-button
          ref="buttonRef"
          type="primary"
          style="border-radius: var(--radius-base)"
          >添加</el-button
        >
      </template>
      <el-row justify="space-around" style="width: 100%" :gutter="10">
        <el-col :span="12"
          ><el-button type="primary" @click="addKeyValue(object, wrapperName)"
            >键值对</el-button
          ></el-col
        >
        <el-col :span="12"
          ><el-button type="primary" @click="addSecParam(object, wrapperName)"
            >二级参数</el-button
          ></el-col
        >
      </el-row>
    </el-popover>
  </div>
  <div v-if="object.canAddKeyValue && !object.canAddSecParam">
    <el-button
      ref="buttonRef"
      type="primary"
      style="border-radius: var(--radius-base)"
      @click="addKeyValue(object, wrapperName)"
      >添加</el-button
    >
  </div>
</template>
<style lang="scss" scoped>
</style>