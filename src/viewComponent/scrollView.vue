<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
// import { layoutStore } from "@/stores/layout";


const emit = defineEmits(["toogle"]);
const props = defineProps(['calScrollFunc', 'top', 'classNames']);

// const layout = layoutStore();
// const size = computed(() => layout.size);  
const headerTitle = ref()
const divider = ref()
const scrollView = ref()
function toogle() {
  emit("toogle");
}
 
onMounted(() => { 
})
</script>
<template>
  <div
    class="scrollView"
    :class="classNames"
    ref="scrollView"
    :style="{  
      'padding-top': top ? '5vh' : '0'
    }"
    @scroll="calScrollFunc(scrollView, $event)"
  >
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>
<style lang="scss" scoped>
// @import "@/style/variables.scss";  
.scrollView {
  width: 100%; 
  //   padding: 0 $tabLeftSpace;
  // transform: translate(0, 0);
  background: var(--bgLight_Primary);
  overflow-x: hidden;
  overflow-y: auto;
  // transform: translateX(0);
  // padding-top: $headerHeight;
  
   
}
</style>