<script setup>
import { ref, onMounted } from "vue";
import { copyToClipboard, adding } from "@/utils/util.js";
import gsap from "gsap";
const props = defineProps(["object", "wrapperName", "addDiretion"]);
const emit = defineEmits(["addKeyValue"]);

function toBottom(wrapperName) {
  const wrapper = document.querySelector(`#${wrapperName}`);
  if (wrapper) {
    setTimeout(() => {
      gsap.to(`#${wrapperName}`, {
        scrollTop: wrapper.scrollHeight,
        duration: 1,
        ease: "none",
      });
    }, 50);
  }
}

function addSecParam(object, wrapperName) { 
    if (!object.tempNodes) {
      object.tempNodes = {
        canAddKeyValue: true,
      canAddSecParam: true,
        params: [],
      };
    }
    object.tempNodes.params.push({
      canAddKeyValue: true,
      canAddSecParam: true,
      params: [
        {
          type: "input",
          key: "",
          value: Math.random(),
        },
      ],
    });
    // toBottom(wrapperName); 
    if(wrapperName) {
      // setTimeout(() => {
      //   const wrapper = document.querySelector(`#${wrapperName}`);
      //   wrapper.scrollTop = wrapper.scrollHeight;
      // }, 100);
      const wrapper = document.getElementById(wrapperName)
      console.log(wrapper)
      setTimeout(() => {
        gsap.to(wrapper, {
          scrollTop: wrapper.scrollHeight,
          duration: 0.5,
          ease: 'power1.inOut'
        }, 100)
      })
    }
}

function addKeyValue(object, wrapperName) {
  if (object.canAddKeyValue) {
    if (!object.tempNodes) {
      object.tempNodes = {
        canAddKeyValue: false,
        params: [],
      };
    }

    if (props.addDiretion == "btt") {
      object.tempNodes.params.push({
        type: "input",
        key: "",
        value: Math.random(),
      });
      setTimeout(() => {
        const wrapper = document.querySelector(`#${wrapperName}`);
        wrapper.scrollTop = wrapper.scrollHeight;
      }, 50);
    } else {
      object.tempNodes.params.splice(0, 0, {
        type: "input",
        key: "",
        value: "",
      }); 
    }
  }
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
      style="border-radius: var(--radius-lg)"
      :width="200"
      trigger="click"
    >
      <template #reference>
        <el-button
          ref="buttonRef"
          type="primary"
          style="border-radius: var(--radius-lg)"
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
      style="border-radius: var(--radius-lg)"
      @click="addKeyValue(object, wrapperName)"
      >添加</el-button
    >
  </div>
</template>
<style lang="scss" scoped>
// button {
//   width: 80px;
// }
</style>