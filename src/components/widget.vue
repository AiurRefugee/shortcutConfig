<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import { copyToClipboard, findItem } from "@/utils/util.js";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

import widget from "@/components/widget.vue";
import addButton from "@/components/addButton.vue";

const $bus = inject("$bus")
const removeWidth = 80;
const threshold = removeWidth * 8;

const props = defineProps(["param", "readOnly", "index", "layer"]);
const emit = defineEmits([
  "updateNode",
  "removeParam",
  "removeTempNode", 
  "index"
]);
 
const timeout = null

function updateNode() {
  props.param.params.push(props.param.tempNodes.splice(index, 1)[0])
}

function finish() { 
  if(props.param.key) {
    console.log(props.index)
    props.param.keyFinished = true
    emit("updateNode", props.index)
    $bus.emit('update')
  }
} 

function update(val) { 
  $bus.emit('update')
}

function showBtn(e) {
  cancelMove()
  const btnWrapper = findItem(e.target, "btnWrapper", 3);
  if (btnWrapper) {
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
        width: "140px",
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
    // paddingRight: "0px",
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
    // paddingRight: "10px",
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

function cancelMove() {
  document.onpointermove = null
}

function swipeStart(e) { 
  let swipeWidth = 0;
  let startX = e.screenX;
  console.log('down', e)

  const listItem = findItem(e.target, "listItem", 3);
  if (!listItem || e.target.tagName === "BUTTON") {
    return false;
  } 
  const removeButton = findSiblingsWithClass(listItem, "btn")[0];
  if (!removeButton) {
    return false;
  }
  const width = removeButton.clientWidth; 
  for (const btn of document.getElementsByClassName("btn")) {
    document.getElementById('appContainer').style.overflow = 'hidden'
    if (btn != removeButton) {
      resizeToHide(btn);
    }
  }
  document.onpointermove = (e) => {
    e.preventDefault(); 
    if(!e.isPrimary) return
    swipeWidth = Math.abs(startX - e.screenX);
    if (width < 10) {
      removeButton.style.width =
        Math.min(Math.max(startX - e.screenX, 0), threshold) + "px";
      listItem.scrollLeft = listItem.scrollWidth;
      // removeButton.style["padding-right"] =
      //   Math.max(Math.min(startX - e.screenX, 20)) + "px";
    } else {
      removeButton.style.width =
        Math.max(Math.min(removeWidth + startX - e.screenX, threshold), 0) +
        "px";
      // removeButton.style["padding-right"] =
      //   Math.max(Math.min(10 + startX - e.screenX, 10 * 1.5), 0) + "px";

      listItem.scrollLeft = listItem.scrollWidth;
    }

    document.onpointerup = (e) => { 
      console.log('up')
      document.getElementById('appContainer').style.overflow = 'auto' 
      listItem.style.overflow = "hidden"; 
      document.onpointermove = null;
      document.onpointerup = null;
      if (swipeWidth < 5) {
        return false;
      } 
      if (removeButton.clientWidth > removeWidth * 0.5) {
        resizeToFull(removeButton); 
      } else {
        resizeToHide(removeButton); 
      }
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
function removeParam(index) {
  console.log('l', props.param)
  props.param.params.splice(index, 1);  
  if (!props.param.canAddKeyValue && !props.param.canAddSecParam) {
    if (props.param.params && props.param.params.length == 0) {
      removeItem() 
    } 
  }
}

// 删除tempNode中的元素
function removeTempNode(index) { 
  props.param.tempNodes.splice(index, 1);  
  if (!props.param.canAddKeyValue && !props.param.canAddSecParam) {
    if (props.param.params && props.param.params.length == 0) {
      removeItem()
      return
    }
    if (!props.param.tempNodes || props.param.tempNodes.length == 0) {
      removeItem()
    }
  }
}

function removeItem(e) {
  // const listItem = findItem(e.target, "list-item", 3)
  document.getElementById('appContainer').style.overflow = 'auto' 
    // listItem.style.overflow = "hidden"; 
  if (props.param.key) { 
    emit("removeParam", props.index);
  } else { 
    emit("removeTempNode", props.index);
  }
}

function updateParam(index) {
  props.param.params.push(props.param.tempNodes.splice(index, 1)[0]);
}
 
onMounted(() => { 
});
</script>

<template>
  <div class="listItemWrapper" :id="param.key">
    <div
      :class="[
        'listItem',
        param.params || param.tempNodes ? 'secItem' : 'keyValueItem',
      ]"
      :style="{
        margin: calMt(),
        paddingBottom: (layer && param.params) || param.tempNodes ? '0' : '',
      }"
      @pointerdown="swipeStart"
      @click="cancelMove"
      @click.stop="showBtn"
    >
      <div
        :class="['label', param.params || param.tempNodes ? 'primLabel' : '']"
        @click.stop="showBtn"
      >
        <div
          :class="{ hideOverText: param.key }"
          v-if="!param.params && !param.keyFinished "
          :id="param.key"
          @pointerdown.stop="swipeStart"
          @click.stop="showBtn"
        >
          <el-input
            v-model="param.key"
            autocomplete="new-password"
            @blur="finish"
            :placeholder="
              param.hasOwnProperty('tempNodes') ? '请输入参数名' : '请输入键名'
            "
          ></el-input>

          <!-- <addButton v-if="param.canAddKeyValue" :object="param" /> -->
        </div>
        <div v-else>
          {{ param.key }}
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
      <div v-if="!param.params && !param.tempNodes">
        <div class="widget" v-if="param.type == 'switch'">
          <el-switch v-model="param.value" @change="update"></el-switch>
        </div>
        <div class="widget" v-if="param.type == 'input'" autocomplete="new-password">
          <el-input
            placeholder="请输入值"
            v-model="param.value"
            :readonly="readOnly"
            @change="update"
          >
            <template #append>
              <el-icon @click="copyToClipboard(param.value)"
                ><CopyDocument
              /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="widget" v-if="param.type == 'select'">
          <el-select v-model="param.value" @change="update" autocomplete="new-password" style="width: 100%">
            <el-option
              :label="item"
              :value="item"
              v-for="item in param.options"
              :key="item"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div
        class="btn"
        v-if="
          !param.hasOwnProperty('params') && !param.hasOwnProperty('tempNodes')
        "
      >
        <el-button type="danger" @click="removeItem">删除</el-button>
      </div>
      <div class="wrapper secWrapper" v-if="param.params">
        <widget
          v-for="(secParam, index) in param.params"
          :key="index"
          :param="secParam"
          :layer="layer + 1"
          :index="index"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
        />
      </div>
      <div class="wrapper secWrapper" v-if="param.tempNodes">
        <widget
          v-for="(node, index) in param.tempNodes"
          :key="index"
          :param="node"
          :layer="layer + 1"
          :index="index"
          @removeParam="removeParam"
          @removeTempNode="removeTempNode"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
