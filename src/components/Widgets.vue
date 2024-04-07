<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import OptButton from "@/components/optButton.vue";
import { CopyDocument } from "@element-plus/icons-vue";
import Widgets from "@/components/Widgets.vue";
import { showOpt, copyToClipboard } from "@/utils/utils.js";
const $bus = inject("$bus");

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
    transform: "translate( 0, -30px)",
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
  const newKeyValue = await store.getAddParam("param");
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

onMounted(() => {});
</script>

<template>
  <div ref="listItemWrapper" class="listItemWrapper rounded-lg" :id="param.key">
    <div
      id="listItem"
      class="text-lg p-2 pr-0 flex items-center cursor-pointer"
      @click="showOpt(listItemWrapper, param.canAddParam)"
    >
      <div class="w-full flex justify-between items-center">
        <div
          class="w-2/5 whitespace-nowrap overflow-hidden pr-1"
          :class="param.params ? 'flex-1' : ''"
          
        >
          <!-- <div class="divider"></div> -->
          <!-- <el-input
            style="width: 60%;"
            v-model="param.key"
            placeholder="请输入键名"
            v-else
          ></el-input> -->
          <div
            class="w-full flex items-center overflow-auto text-base txtDark_Primary"
          >
            {{ param.key }}
          </div>
        </div>
        <div class="pr-3" :class="param.params ? 'w-0' : 'w-3/5'">
          <div class="w-full flex justify-end" v-if="param.type == 'select'">
            <el-select
              v-model="param.value"
              style="width: 100%; position: relative; z-index: 10"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="item in param.options"
                :key="item"
              ></el-option>
            </el-select>
          </div>

          <div
            class="w-full flex flex-grow-2 items-center justify-between rounded-lg pl-2 bg-white"
            v-if="param.type == 'input'"
            :class="param.type ? '' : ''"
          >
            <div class="w-5/6 overflow-auto pr-1">
              <input
                class="w-full h-8 whitespace-nowrap overflow-auto txtLight_Basic"
                style="font-size: 14px;"
                placeholder="请输入值"
                v-model="param.value"
              />
            </div>
            <div class="h-8 w-10 flex justify-center items-center copy">
              <CopyDocument />
            </div>
            <!-- <template #append>
                <el-icon @click="copyToClipboard(param.value)"
                  ><CopyDocument
                /></el-icon>
              </template> -->
          </div>
          <div
            class="w-full flex justify-end flex-grow-2"
            v-if="param.type == 'switch'"
            :class="param.type ? '' : ''"
          >
            <el-switch v-model="param.value"></el-switch>
          </div>
        </div>

        <OptButton
          :index="index"
          @addKeyValue="addKeyValue"
          @deleteParam="emitDelete"
        />
      </div>
    </div>
    <div
      ref="subWrapper"
      class="subWrapper ml-4 pl-2"
      :class="param.params.length ? 'mb-4' : ''"
      v-if="param.params"
    >
      <transition-group name="list">
        <Widgets
          v-for="(item, index) in param.params"
          :key="item"
          :index="index"
          :type="'params'"
          :param="item"
          @deleteParam="deleteParam"
        />
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
