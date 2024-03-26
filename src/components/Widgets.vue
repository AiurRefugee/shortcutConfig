<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import OptButton from "@/components/optButton.vue";
import { copyToClipboard, findItem } from "@/utils/util.js";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

import Widgets from "@/components/Widgets.vue";

const $bus = inject("$bus");

const listItemWrapper = ref();
const removeWidth = 80;
const threshold = removeWidth * 8;

const props = defineProps(["param", "index", "layer"]);
const emit = defineEmits([
  "updateNode",
  "removeParam",
  "removeTempNode",
  "index",
  "checkName",
]);

const timeout = null;

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
  console.log(item);
  const deleteButton = listItemWrapper.value.querySelector("#delete");
  if (props.param.canAddKeyValue) {
    const addButton = listItemWrapper.value.querySelector("#add");
    if (addButton) {
      toogleButton(addButton);
    }
  }
  hideAllButton("#add");
  hideAllButton("#delete");
  if (deleteButton) {
    toogleButton(deleteButton);
  }
}

onMounted(() => {});
</script>

<template>
  <div
    ref="listItemWrapper"
    class="listItemWrapper rounded-lg my-4"
    :id="param.key"
  >
    <div
      id="listItem"
      class="text-lg pl-2 flex items-center py-2 cursor-pointer"
    >
      <div class="w-full flex items-center" @click.stop="showOpt(item, $event)">
        <div
          class="w-1/2 flex-grow-2 whitespace-nowrap overflow-hidden pr-4"
          :class="param.type ? '' : 'flex-shrink-0'"
        >
          <h2
            class="w-full overflow-auto"
            v-if="param.key"
            
          >
            {{ param.key }}
          </h2>
          <!-- <div class="divider"></div> -->
          <el-input
            v-model="param.key"
            placeholder="请输入键名"
            v-else
          ></el-input>
        </div>
        <div class="w-1/2 flex-grow-2 pr-2" :class="param.type ? '' : ''">
          <div class="w-full flex justify-end" v-if="param.type == 'select'">
            <el-select
              v-model="param.value"
              @change="update"
              style="width: 100%"
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
            class="w-full flex flex-grow-2 justify-end"
            v-if="param.type == 'input'"
            :class="param.type ? '' : ''"
          >
            <el-input
              placeholder="请输入值"
              v-model="param.value"
              :readonly="props.readOnly"
              @change="update"
            >
              <template #append>
                <el-icon @click="copyToClipboard(param.value)"
                  ><CopyDocument
                /></el-icon>
              </template>
            </el-input>
          </div>
          <div
            class="w-full flex justify-end flex-grow-2"
            v-if="param.type == 'switch'"
            :class="param.type ? '' : ''"
          >
            <el-switch
              v-model="param.value"
              @change="update"
              size="large"
            ></el-switch>
          </div>
        </div>
        <OptButton :object="param" />
      </div>
    </div>
    <div class="subWrapper ml-4 mb-4 pl-2 pr-0" v-if="param.params">
      <Widgets
        v-for="(item, index) in param.params"
        :key="index"
        :param="item"
      />
    </div>
    <div class="subWrapper ml-4 mb-4 pl-2 pr-0" v-if="param.tempNodes">
      <Widgets
        v-for="(item, index) in param.tempNodes"
        :key="index"
        :param="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
