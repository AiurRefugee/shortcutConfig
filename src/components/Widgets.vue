<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import { copyToClipboard, findItem } from "@/utils/util.js";
import { CopyDocument, Share, Plus } from "@element-plus/icons-vue";

import Widgets from "@/components/Widgets.vue";
import addButton from "@/components/addButton.vue";

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

function showOpt(item, event) {
  console.log(event);
  const opt = listItemWrapper.value.querySelector("#opt");
  gsap.to(opt, {
    width: "10rem",
    duration: 0.3,
    ease: "power1.inOut",
  });
}

onMounted(() => {});
</script>

<template>
  <div
    ref="listItemWrapper"
    class="listItemWrapper rounded-lg my-4"
    :id="param.key"
    @click.stop="showOpt(item, $event)"
  >
    <div
      id="listItem"
      class="text-lg pl-2 flex items-center py-2 cursor-pointer"
    >
      <div class="w-1/2 flex-1 whitespace-nowrap overflow-hidden">
        <h2 class="w-full overflow-auto">{{ param.key }}</h2>
        <!-- <div class="divider"></div> -->
      </div>
      <div class="w-1/2 flex-1 pr-2">
        <div class="w-full flex justify-end" v-if="param.type == 'select'">
          <el-select v-model="param.value" @change="update" style="width: 100%">
            <el-option
              :label="item"
              :value="item"
              v-for="item in param.options"
              :key="item"
            ></el-option>
          </el-select>
        </div>

        <div class="w-full flex justify-end" v-if="param.type == 'input'">
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
        <div class="w-full flex justify-end" v-if="param.type == 'switch'">
          <el-switch v-model="param.value" @change="update"></el-switch>
        </div>
      </div>
      <div
        id="add"
        class="w-16 flex-shrink-0 mr-2 overflow-hidden"
        v-if="param.canAddKeyValue || param.canAddSecParam"
      >
        <el-button type="primary" @click="addKeyValue">添加</el-button>
      </div>
      <div id="delete" class="w-16 flex-shrink-0 overflow-hidden mr-2">
        <el-button type="danger">删除</el-button>
      </div>
    </div>
    <div class="subWrapper ml-4 mb-4 pl-2 pr-0" v-if="param.params">
      <Widgets
        v-for="(item, index) in param.params"
        :key="index"
        :param="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
