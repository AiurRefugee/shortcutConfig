<script setup>
import { ref, onMounted, inject } from "vue";
import gsap from "gsap";
import Widgets from "@/components/Widgets.vue";
import addButton from "@/components/addButton.vue";
import { calHeight } from "../utils/util";

import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const props = defineProps(["shortcut", "index", "pointer"]);
const emit = defineEmits(["removeShortcut", "checkName"]);

function runShortCut(name) {
  window.open(`shortcuts://run-shortcut?name=${name}&input=clipboard`);
}

const $bus = inject("$bus");
const thisShortcut = ref();

// 删除参数
function removeParam(index) {
  props.shortcut.params.splice(index, 1);
  if (!props.shortcut.canAddKeyValue && !props.shortcut.canAddSecParam) {
    if (props.shortcut.params && props.shortcut.params.length == 0) {
      removeShortCut();
    }
  }
}

// 删除shortcut
function removeShortCut() {
  emit("removeShortcut", props.index);
}

// 删除tempNode中的元素
function removeTempNode(index) {
  props.shortcut.tempNodes.splice(index, 1);
  if (!props.shortcut.canAddKeyValue && !props.shortcut.canAddSecParam) {
    if (!props.shortcut.tempNodes || props.shortcut.tempNodes.length == 0) {
      removeShortCut();
    }
  }
}

function updateNode(index) {
  props.shortcut.params.push(props.shortcut.tempNodes.splice(index, 1)[0]);
  console.log(props.shortcut.params);
}

function toggleRemove(e) {
  if (e.target.tagName == "INPUT") return;
  if (
    Array.from(e.target.classList).filter((item) => item.includes("el")).length
  )
    return;
  const btn =
    thisShortcut.value && thisShortcut.value.querySelector(".shortcutBtn");
  if (!btn) return;
  Array.from(document.getElementsByClassName("shortcutBtn")).forEach((btn) => {
    if (btn !== e.target) {
      gsap.to(btn, {
        width: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  });
  if (!btn.clientWidth) {
    gsap.to(btn, {
      width: "100px",
      duration: 0.5,
      ease: "power1.inOut",
    });
  } else {
    gsap.to(btn, {
      width: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }
}

function finish() {
  let nameRep = false;
  emit("checkName", props.shortcut.shortcutName, (val) => {
    nameRep = val;
  });
  console.log(nameRep);
  if (nameRep) {
    ElMessage.error("快捷指令名称重复");
    return false;
  }
  if (props.shortcut.shortcutName) {
    props.shortcut.nameFinished = true;
  }
  $bus.emit("update");
}

// 检查名称重复
function checkName(name, callBack) {
  callBack(props.shortcut.params.filter((item) => item.key == name).length > 0);
}

onMounted(() => {});
</script>
<template>
  <div class="shortcutWrapper" ref="thisShortcut">
    <div class="shortcut">
      <h2 class="text-lg font-bold">{{ shortcut.shortcutName }}</h2>
 
      <Widgets v-for="(item, index) in shortcut.params" :key="index" :param="item">
      </Widgets>
      <addButton
        :object="shortcut"
        :wrapperName="shortcut.shortcutName"
        addDiretion="btt"
      />
      
    </div>
    <!-- <div class="w-full h-52"></div> -->
  </div>
</template>
<style lang="scss" scoped>
</style>