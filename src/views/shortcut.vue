<script setup>
import { ref, onMounted, inject } from "vue";
import gsap from "gsap";
import Widgets from "@/components/Widgets.vue";
import OptButton from "@/components/optButton.vue";

import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const props = defineProps(["shortcut", "index", "pointer"]);
const emit = defineEmits(["removeShortcut", "checkName"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

const $bus = inject("$bus");
const thisShortcut = ref();

function hideAllButton(id) {
  Array.from(document.querySelectorAll(id)).forEach((item) => {
    gsap.to(item, {
      width: "0",
      duration: 0.3,
      ease: "power1.inOut",
    });
  });
}

function toogleButton(button) {
  if (button.clientWidth > 0) {
    gsap.to(button, {
      width: "0",
      duration: 0.3,
      ease: "power1.inOut",
    });
  } else {
    gsap.to(button, {
      width: "4rem",
      duration: 0.3,
      ease: "power1.inOut",
    });
  }
}

function showOpt(item, event) {
  if (event.target.tagName === "SPAN" || event.target.tagName == 'BUTTON') return false;
  console.log(item, event);
  hideAllButton("#add");
  hideAllButton("#delete");
  const deleteButton = thisShortcut.value.querySelector("#delete");
  if (deleteButton) {
    toogleButton(deleteButton);
  }
  if (props.shortcut.canAddKeyValue) {
    const addButton = thisShortcut.value.querySelector("#add");
    if (addButton) {
      toogleButton(addButton);
    }
  }
}

onMounted(() => {});
</script>
<template>
  <div class="shortcutWrapper" ref="thisShortcut">
    <div class="shortcut">
      <div class="w-full flex items-center justify-between pr-2">
        <h2 class="w-full text-lg font-bold" @click.stop.prevent="showOpt(shortcut, $event)">{{ shortcut.shortcutName }}</h2>
        <OptButton :object="shortcut" />
      </div>

      <Widgets
        v-for="(item, index) in shortcut.params"
        :key="index"
        :param="item"
      >
      </Widgets>
      <Widgets
        v-for="(item, index) in shortcut.tempNodes"
        :key="index"
        :param="item"
      >
      </Widgets>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>