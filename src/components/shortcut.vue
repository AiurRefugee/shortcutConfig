<script setup>
import { ref, onMounted, inject, provide } from "vue";
import gsap from "gsap";
import Widgets from "@/components/Widgets.vue";
import OptButton from "@/components/optButton.vue";

import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { showOpt, copyToClipboard } from "@/utils/utils.js";
import { shortcutStore } from "@/store/shortcut";
const store = shortcutStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const props = defineProps(["shortcut", "shortcutIndex"]);
const emit = defineEmits(["removeShortcut", "checkName"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

const $bus = inject("$bus");
const widgetsList = ref();
const thisShortcut = ref();

async function addKeyValue() {
  const param = await store.getAddParam("param");
  console.log("addKeyValue", param);
  props.shortcut.params.unshift(param);
  $bus.emit("update");
}

function removeShortcut(index) {
  gsap.to(thisShortcut.value, {
    transform: "translate(0, -200px)",
    opacity: 0,
    height: 0,
    padding: 0,
    margin: 0,
    duration: 0.6, 
    onComplete: () => {
      if (window.innerWidth <= 628) {
        router.go(-1);
      }
    },
  });
}

function deleteParam(index) {
  console.log("deleteShortcutParam", index);
  const target = widgetsList.value.children[index];
  gsap.to(target, {
    height: 0,
    opacity: 0,
    padding: 0,
    margin: 0,
    transform: "translate( 0, -30px)",
    duration: 0.6,
    ease: "power1.inOut",
    onComplete: () => {
      setTimeout(() => {
        props.shortcut.params.splice(index, 1);
        $bus.emit("update", props.shortcutIndex);
      }, 200);
    },
  });
}

onMounted(() => {});
</script>
<template>
  <div class="shortcutWrapper" ref="thisShortcut">
    <div class="shortcut">
      <div class="w-full flex items-center justify-between">
        <h2 
          class="w-full text-xl"
          @click.stop.prevent="showOpt(thisShortcut, true)"
        >
          {{ shortcut.shortcutName }}
        </h2>
        <OptButton @addKeyValue="addKeyValue" @deleteParam="removeShortcut" />
      </div>
      <div ref="widgetsList">
        <transition-group name="list">
          <div
            class="py-2 overflow-hidden"
            v-for="(item, index) in shortcut.params"
            :key="item"
          >
            <Widgets
              :index="index"
              :shortcutIndex="shortcutIndex"
              :type="'params'"
              :param="item"
              @deleteParam="deleteParam"
            >
            </Widgets>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>