<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import OptButton from "@/components/optButton.vue";
import { CopyDocument } from "@element-plus/icons-vue";
import Widgets from "@/components/Widgets.vue";
import { showOpt, copyToClipboard } from "@/utils/utils.js";
const $bus = inject("$bus");
const queryInput = inject('queryInput')

import { shortcutStore } from "@/store/shortcut";
const store = shortcutStore();
var longPressTimer = null;
const subWrapper = ref();
const listItemWrapper = ref();

const props = defineProps(["param", "index", "shortcutIndex"]);
const emit = defineEmits(["deleteParam"]);

function deleteParam(index) {
  const target = subWrapper.value.children[index];
  console.log("target", subWrapper.value, index);
  gsap.to(target, {
    height: 0,
    opacity: 0,
    padding: 0,
    margin: 0,
    transform: "translate( -100%, 0)",
    duration: 0.3,
    ease: "power1.inOut",
    onComplete: () => {
      setTimeout(() => {
        props.param.params.splice(index, 1);
        $bus.emit("update", props.shortcutIndex);
      }, 200);
    },
  });
}

async function addKeyValue() {
  const newKeyValue = await $bus.emit("getAddedParam", "param");
  props.param.params.unshift(newKeyValue);
  $bus.emit("update", props.shortcutIndex);
}

function emitDelete(index) {
  emit("deleteParam", index);
}

function calStart(event) {
  // const target = event.target;
  // target.readOnly = false;
  // target.focus();
  // setTimeout(() => {
  //   target.readOnly = false;
  //   target.focus();
  // }, 500);
}

function calEnd(event) {
  const target = event.target;
  // target.readOnly = false;
  // setTimeout(() => {
  //   target.readOnly = false;
  // }, 500);
  // setTimeout(() => {
  //   target.focus()
  // }, 600)
}

function filterParam(param) { 
  if (param && param.key) {
    return param.key.includes(queryInput.value) 
  }
  if (param && param.value) {
    return param.value.includes(queryInput.value) 
  }
  return false
}

onMounted(() => {});
</script>

<template>
  <div
    ref="listItemWrapper"
    class="listItemWrapper rounded-xl my-2"
    :id="param.key" 
  >
    <div
      id="listItem"
      class="text-lg p-3 pr-0 flex w-full justify-between items-center cursor-pointer"
    >
      <div
        class="w-2/5 whitespace-nowrap overflow-auto pr-2"
        :class="param.params ? 'flex-1' : ''"
        @click="showOpt(listItemWrapper, param.canAddParam)"
      >
        <div
          class="w-full flex items-center overflow-hidden text-base txtDark_Primary"
        >
          {{ param.key }}
        </div>
      </div>
      <div
        id="widgetComponent"
        class="pr-3 h-8 flex justify-end"
        :class="param.params ? 'w-0' : 'w-3/5'"
      >
        <select
          class="w-full"
          v-if="param.type == 'select'"
          v-model="param.value"
        >
          <option
            :label="item"
            :value="item"
            v-for="item in param.options"
            :key="item"
          ></option>
        </select>

        <div
          class="w-full flex items-center justify-between rounded-lg pl-2 bg-white"
          v-if="param.type == 'input'"
          :class="param.type ? '' : ''"
        >
          <div class="w-5/6 overflow-auto pr-1">
            <input
              class="w-full h-8 whitespace-nowrap overflow-auto txtLight_Basic"
              style="font-size: 14px"
              placeholder="请输入值"
              v-model="param.value"
            />
          </div>
          <div class="h-8 w-10 flex justify-center items-center copy">
            <CopyDocument />
          </div>
        </div>
        <el-switch
          v-model="param.value"
          v-if="param.type == 'switch'"
        ></el-switch>
      </div>

      <OptButton
        :index="index"
        @addKeyValue="addKeyValue"
        @deleteParam="emitDelete"
      />
    </div>
    <div
      ref="subWrapper"
      class="subWrapper ml-4 pl-2"
      :class="param.params.length ? 'mb-4' : ''"
      v-if="param.params"
    >
      <transition-group name="list">
        <div v-for="(param, index) in param.params" :key="param">
          <Widgets 
            :index="index"
            :type="'params'"
            :param="param"
            @deleteParam="deleteParam"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
