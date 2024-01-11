<script setup>
import { ref, onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import { copyToClipboard, adding } from "@/utils/util.js";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

import widget from "@/components/widget.vue";
import addButton from "@/components/addButton.vue";
const removeWidth = 80;
const threshold = removeWidth * 8;

let moveFunc, poinerId;

const props = defineProps([
  "paramName",
  "param",
  "readOnly",
  "widgetPointer",
  "layer",
]);
const emit = defineEmits(["updateNode, removeParam", "removeTempNode"]);

const nodeName = ref("");
const removeButton = ref();

function updateNode() {}

function showBtn(e) {
  console.log(e.target);
  const btnWrapper = findItem(e.target, "btnWrapper", 3);
  console.log(btnWrapper);
  if (btnWrapper) {
    console.log(btnWrapper.clientWidth);
    if (!btnWrapper.clientWidth) {
      // 显示按钮
      Array.from(document.getElementsByClassName("btnWrapper")).forEach(
        (btn) => {
          gsap.to(btn, {
            width: 0,
            duration: 0.5,
            ease: "power1.inOut",
          });
        }
      );
      gsap.to(btnWrapper, {
        width: "120px",
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(btnWrapper, {
        width: "0",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }
}

// 隐藏
function resizeToHide(btn) {
  gsap.to(btn, {
    duration: 0.6,
    width: 0,
    paddingRight: "0px",
    ease: "power1.inOut",
  });
}

// 显示
function resizeToFull(btn) {
  const listItem = findItem(btn, "listItem", 3);

  // gsap.to(btn.style, {
  //   paddingRight: '10px',
  //   duration: 0.3,
  //   ease: "power1.inOut",
  // })
  gsap.to(btn, {
    duration: 0.6,
    width: removeWidth,
    paddingRight: "10px",
    ease: "power1.inOut",
  });
  gsap.to(listItem, {
    duration: 0.6,
    scrollLeft: 999,
    ease: "power1.inOut",
  });
}

function findSiblingsWithClass(element, className) {
  const siblings = Array.from(element.children);
  return siblings.filter((sibling) => sibling.classList.contains(className));
}

// 查找节点
function findItem(element, className, depth) {
  if (!element || depth === 0) {
    return;
  }

  if (element && element.classList.contains(className)) {
    return element;
  }

  // 查找子节点中具有指定类名的节点
  const children = Array.from(element.children);
  if (children) {
    for (const child of children) {
      const target = findItem(child, className, depth - 1);
      if (target && target.classList.contains(className)) {
        return target;
      }
    }
  }

  // 查找兄弟节点中具有指定类名的节点
  let sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.classList.contains(className)) {
      // 可以在这里进行相关操作，如返回该节点或执行其他逻辑
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }

  // 递归向上查找父节点的兄弟节点中具有指定类名的节点
  return findItem(element.parentElement, className, depth - 1);
}

function swipeStart(e) {
  let swipeWidth = 0;
  let startX = e.screenX;

  const listItem = findItem(e.target, "listItem", 3);
  console.log("down", listItem);
  if (!listItem) {
    return false;
  }
  // document.getElementById("app").style.overflow = "hidden";
  const removeButton = findSiblingsWithClass(listItem, "btn")[0];
  if (!removeButton) {
    return false;
  }
  const width = removeButton.clientWidth;
  // listItem.style["max-width"] = "";
  // listItem.style.overflow = 'auto'
  // document.getElementsByClassName('appContainer')[0].style.overflow = 'hidden';
  // Array.from(document.getElementsByClassName("wrapper")).forEach((item) => {
  //   item.style.overflow = "hidden";
  // });
  for (const btn of document.getElementsByClassName("btn")) {
    if (btn != removeButton) {
      resizeToHide(btn);
    }
  }
  document.onpointermove = (e) => {
    swipeWidth = Math.abs(startX - e.screenX);
    if (width < 10) {
      removeButton.style.width =
        Math.min(Math.max(startX - e.screenX, 0), threshold) + "px";
      listItem.scrollLeft = listItem.scrollWidth;
      removeButton.style["padding-right"] =
        Math.max(Math.min(startX - e.screenX, 20)) + "px";
    } else {
      removeButton.style.width =
        Math.max(Math.min(removeWidth + startX - e.screenX, threshold), 0) +
        "px";
      removeButton.style["padding-right"] =
        Math.max(Math.min(10 + startX - e.screenX, 10 * 1.5), 0) + "px";

      listItem.scrollLeft = listItem.scrollWidth;
    }

    document.onpointerup = (e) => {
      console.log("up", e);
      // listItem.style["max-width"] = width + "px";
      listItem.style.overflow = "hidden";
      // document.getElementsByClassName("appContainer")[0].style.overflow =
      //   "auto";
      // Array.from(document.getElementsByClassName("wrapper")).forEach((item) => {
      //   item.style.overflow = "auto";
      // });
      document.onpointermove = null;
      if (swipeWidth < 5) {
        return false;
      }
      if (removeButton.clientWidth > removeWidth * 0.5) {
        resizeToFull(removeButton);
        console.log("full");
      } else {
        resizeToHide(removeButton);
        console.log("hide");
      }
      document.onpointerup = null;
    };
  };
}

function calMt() {
  if (!props.layer) {
    if (props.param.params || props.param.tempNodes) {
      return "0";
    } else {
      return "";
    }
  } else {
    return "1vh 0";
  }
}

// 删除参数
function removeParam(paramName) {
  delete(props.param.params[paramName])
}

// 删除tempNode中的元素
function removeTempNode(index) {
  props.param.tempNodes.splice(index, 1);
}

function removeItem() {
  if (props.paramName) {
    console.log('removeParam')
    emit("removeParam", props.paramName);
  } else {
    console.log('removeTempNode')
    emit("removeTempNode", props.widgetPointer);
  }
}

onMounted(() => {
  // console.log('param', props.param)
});
</script>

<template>
  <div class="listItemWrapper">
    <div
      :class="[
        'listItem',
        param.params || param.tempNodes ? 'secItem' : 'keyValueItem',
      ]"
      :style="{
        margin: calMt(),
        paddingBottom: layer && param.params || param.tempNodes ? '0' : '',
      }"
      @pointerdown="swipeStart"
    >
      <div
        :class="['label', param.params || param.tempNodes ? 'primLabel' : '']"
        @pointerdown.stop="swipeStart"
        @click.stop="showBtn"
      >
        <div
          :class="{ hideOverText: paramName }"
          v-if="paramName"
          :id="paramName"
          @pointerdown.stop="swipeStart"
          @click.stop="showBtn"
        >
          {{ paramName }}
          <!-- <addButton v-if="param.canAddKeyValue" :object="param" /> -->
        </div>
        <div v-else>
          <el-input
            v-model="param.key"
            :placeholder="
              param.hasOwnProperty('tempNodes') ? '请输入参数名' : '请输入键名'
            "
            @change="updateNode"
          ></el-input>
        </div>
        <div
          class="btnWrapper"
          v-if="param.params || param.tempNodes"
          :style="{
            justifyContent: param.canAddKeyValue ? 'space-around' : 'flex-end',
          }"
        >
          <div
            class="btnPrim"
            v-if="param.canAddKeyValue || (param.canAddSecParam && layer < 4)"
          >
            <addButton :object="param" />
          </div>
          <div class="btnPrim">
            <el-button type="danger" @click="removeItem">删除</el-button>
          </div>
        </div>
      </div>
      <div class="widget" v-if="param.type == 'switch'">
        <el-switch v-model="param.value" @change="update"></el-switch>
      </div>
      <div class="widget" v-if="param.type == 'input'">
        <el-input
          placeholder="请输入值"
          v-model="param.value"
          @change="update"
          :readonly="readOnly"
        >
          <template #append>
            <el-icon @click="copyToClipboard(param.value)"
              ><CopyDocument
            /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="widget" v-if="param.type == 'select'">
        <el-select v-model="param.value" @change="update" style="width: 100%">
          <el-option
            :label="item"
            :value="item"
            v-for="item in param.options"
            :key="item"
          ></el-option>
        </el-select>
      </div>
      <div
        class="btn"
        v-if="
          !param.hasOwnProperty('params') && !param.hasOwnProperty('tempNodes')
        "
      >
        <el-button type="danger" @click="removeItem">删除</el-button>
      </div>
      <div class="wrapper" style="margin-bottom: 0" v-if="param.params">
        <widget
          v-for="(secParam, secName, index) in param.params"
          :key="index"
          :param="secParam"
          :paramName="secName"
          :layer="layer + 1"
          :widgetPointer="secName"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
        />
      </div>
      <div class="wrapper" style="margin-bottom: 0" v-if="param.tempNodes">
        <widget
          v-for="(node, index) in param.tempNodes"
          :key="index"
          :param="node"
          :layer="layer + 1"
          :widgetPointer="index"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.addWrapper {
  display: flex;
  width: 10vw;
  overflow: visible;
  justify-content: space-between;
  align-items: center;
  /* position: relative; */
}
.addButton {
  /* position: absolute;
  top: 0;
  right: 0;
  z-index: 1; */
  $height: 15px;
  height: $height;
  line-height: $height;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #414141;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  padding: 2px;
  color: white;
}
.paramName {
  /* position: absolute; */
}
// .insertAnimate {
//   animation: 1s ease-in-out forwards showup;
// }
.btnWrapper {
  position: absolute;
  right: 0;
  width: 0;
  display: flex;
  justify-content: space-around;
  height: var(--cellHeight);
  overflow: hidden;
}
.btn {
  right: 10px;
  height: var(--cellHeight);
  overflow: hidden;
  width: 0;
  // transition: width 0.5s linear;
  // opacity: 0;
  position: absolute;
  translate: calc(100% + 10px) 0;
}
.btnPrim {
  width: 45%;
  height: var(--cellHeight);
}
</style>
