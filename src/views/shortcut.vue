<script setup>
import { ref, onMounted, inject } from "vue";
import gsap from "gsap";
import widget from "@/components/widget.vue";
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
}

function toggleRemove(e) {
  if (e.target.tagName == "INPUT") return;
  if(Array.from(e.target.classList).filter(item => item.includes('el')).length) return
  const btn = thisShortcut.value && thisShortcut.value.querySelector(".shortcutBtn");
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
  let nameRep = false
  emit('checkName', props.shortcut.shortcutName, val => {nameRep = val})
  console.log(nameRep)
  if(nameRep) {
    ElMessage.error('快捷指令名称重复');
    return false
  }
  if (props.shortcut.shortcutName) {
    props.shortcut.nameFinished = true;
  }
  $bus.emit("update");
}

// 检查名称重复
function checkName(name, callBack) {
  callBack(props.shortcut.params.filter(item => item.key == name).length > 0)
}

onMounted(() => {});
</script>
<template>
  <div class="list" ref="thisShortcut">
    <div class="title" @click="toggleRemove">
      <div class="titleH" v-if="shortcut.nameFinished">
        <h2>{{ shortcut.shortcutName }}</h2>
        <div
          class="exec"
          v-if="shortcut.executable"
          @click="runShortCut(shortcut.shortcutName)"
        >
          <Share />
        </div>
      </div>
      <div v-else>
        <el-input
          v-model="shortcut.shortcutName"
          placeholder=""
          @change="finish"
        ></el-input>
      </div>
      <div class="shortcutBtn">
        <el-button type="danger" @click="removeShortCut">删除</el-button>
      </div>
    </div>

    <!-- 外层参数-->
    <div
      class="wrapper"
      :id="shortcut.shortcutName"
      style="margin-bottom: 2vh; max-height: 80vh"
    >
      <widget
        v-for="(param, index) in shortcut.params"
        :key="index"
        :readOnly="shortcut.readOnly"
        :param="param"
        :index="index"
        :layer="0"
        @checkName="checkName"
        @removeParam="removeParam"
        @removeTempNode="removeTempNode"
        @updateNode="updateNode"
      />

      <div v-if="shortcut.canAddKeyValue && shortcut.tempNodes">
        <widget
          v-for="(keyValue, index) in shortcut.tempNodes"
          :key="index"
          :param="keyValue"
          :index="index"
          :layer="0"
          @checkName="checkName"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
          @updateNode="updateNode"
        />
      </div>
    </div>
    <addButton
      :object="shortcut"
      :wrapperName="shortcut.shortcutName"
      addDiretion="btt"
    />
  </div>
</template>
<style lang="scss" scoped>
</style>