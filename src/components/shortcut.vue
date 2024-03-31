<script setup>
import { ref, onMounted, inject, provide } from "vue";
import gsap from "gsap";
import Widgets from "@/components/Widgets.vue";
import OptButton from "@/components/optButton.vue";

import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { showOpt, copyToClipboard } from '@/utils/utils.js'

const props = defineProps([
  "shortcut",
  "shortcutIndex",
  "pointer",
  "deleteShortcutFunc",
]);
const emit = defineEmits(["removeShortcut", "checkName"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

const $bus = inject("$bus");
const thisShortcut = ref();

function addKeyValue() {
  props.shortcut.params.push({
    key: "",
    value: "",
    type: 'input',
    canAddParam: true,
    canAddSecParam: true
  })
}
provide("addKeyValue", addKeyValue)

function addSecParam() {
  props.shortcut.params.push({
    key: "",

    canAddParam: true,
    canAddSecParam: true,
    params: [{
      key: "",
      value: "",
      type: "input",
      canAddParam: true,
    canAddSecParam: true,
    }]
  })
}
provide("addSecParam", addSecParam)


function deleteParam(index) {
  console.log("deleteShortcutParam", index);
  gsap.to(
    `#${props.shortcut.shortcutName}${props.shortcutIndex}params${index}`,
    {
      height: 0,
      opacity: 0,
      padding: 0,
      margin: 0,
      transform: "translate( 0, -30px)",
      duration: 0.4,
      ease: "power1.inOut",
      onComplete: () => {
        setTimeout(() => {
          props.shortcut.params.splice(index, 1);
        }, 200);
      },
    }
  );
  console.log(props.shortcut);
}

onMounted(() => {});
</script>
<template>
  <div class="shortcutWrapper" ref="thisShortcut">
    <div class="shortcut">
      <div class="w-full flex items-center justify-between">
        <h2
          id="scrollTitle"
          class="w-full text-xl"
          @click.stop.prevent="showOpt(thisShortcut, true)"
        >
          {{ shortcut.shortcutName }}
        </h2>
        <OptButton
          :object="shortcut"
          :type="'shortcut'"
          :index="shortcutIndex"
        />
      </div>
      <transition-group name="list">
        <div
          class="py-2"
          :id="shortcut.shortcutName + shortcutIndex + 'params' + index"
          v-for="(item, index) in shortcut.params"
          :key="item"
        >
          <Widgets
            :index="index"
            :type="'params'"
            :param="item"
            :deleteFunc="deleteParam"
          >
          </Widgets>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>