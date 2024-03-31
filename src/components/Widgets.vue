<script setup>
import { ref, onMounted, inject } from "vue";
import { useEventListener } from "@vueuse/core";
import gsap from "gsap";
import OptButton from "@/components/optButton.vue";
import { CopyDocument } from "@element-plus/icons-vue";
import Widgets from "@/components/Widgets.vue";
import { showOpt, copyToClipboard } from '@/utils/utils.js'
const $bus = inject("$bus");

const subWrapper = ref();
const listItemWrapper = ref();
const removeWidth = 80;
const threshold = removeWidth * 8;

const props = defineProps(["param", "index", "type", "deleteFunc"]);

function deleteParam(index) {
  const target = subWrapper.value.children[index];
  console.log("target", subWrapper.value, index);
  gsap.to(target, {
    height: 0,
    opacity: 0,
    padding: 0,
    margin: 0,
    transform: "translate( 0, -30px)",
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      setTimeout(() => {
        props.param.params.splice(index, 1);
      }, 200);
    },
  });
}

function emitDelete(index) {
  console.log("emitWidgetDelete", index);
  props.deleteFunc(index);
}

const timeout = null;


onMounted(() => {});
</script>

<template>
  <div ref="listItemWrapper" class="listItemWrapper rounded-lg" :id="param.key">
    <div
      id="listItem"
      class="text-lg p-2 pr-0 flex items-center cursor-pointer"
    >
      <div class="w-full flex justify-between items-center">
        <div
          class="w-1/2 flex-grow-2 whitespace-nowrap overflow-hidden pr-4"
          :class="param.type ? '' : 'flex-shrink-0'"
          @click.stop="showOpt(listItemWrapper, param.canAddParam)"
        >
          <!-- <div class="divider"></div> -->
          <!-- <el-input
            style="width: 60%;"
            v-model="param.key"
            placeholder="请输入键名"
            v-else
          ></el-input> -->
          <div class="w-full flex items-center overflow-auto">
            <input
              class="bg-transparent text-base txtDark_Primary"
              v-model="param.key"
              placeholder="请输入键名"
            />
          </div>
        </div>
        <div class="w-1/2 pr-2 flex-grow-2" :class="param.type ? '' : ''">
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
            class="w-full flex flex-grow-2 justify-end"
            v-if="param.type == 'input'"
            :class="param.type ? '' : ''"
          >
            <el-input
              placeholder="请输入值"
              v-model="param.value"
              :readonly="props.readOnly"
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
            <el-switch v-model="param.value" size="large"></el-switch>
          </div>
        </div>

        <OptButton
          :object="param"
          :index="index"
          :type="type"
          :deleteParamsFunc="emitDelete"
          :addParamsFunc="emitAdd"
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
          :deleteFunc="deleteParam"
        />
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
