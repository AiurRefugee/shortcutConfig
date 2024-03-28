<script setup>
import { ref, onMounted, inject } from "vue";
import gsap from "gsap";
const props = defineProps(["configs", "show"]);
const $bus = inject("$bus");
const emit = defineEmits(["addKeyValue"]);
const navItems = ref([]);

var size;

function getNavItems(obj) {
  let paramsNodes;
  if (obj.params) {
    paramsNodes = obj.params.map((item) => item.key);
    for (const item of obj.params) {
      paramsNodes = paramsNodes.concat(getNavItems(item));
    }
  } else {
    return [];
  }
  return paramsNodes;
}
onMounted(() => {
  props.configs.forEach((element) => {
    navItems.value = navItems.value.concat(getNavItems(element));
  });
});
</script>
<template>
  <!-- 添加参数或键值对 -->
  <div class="scrollNavWrap" :style="{translate: show ? '0 0' : '100% 0'}">
    <div class="overlay"></div>
    <a class="scrollNavItem" v-for="item in navItems" :key="item">
      {{ item }}
    </a>
  </div>
</template>
<style lang="scss" scoped>
// @import "@/assets/style/global.scss";
</style>