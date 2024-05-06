<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
// import { layoutStore } from "@/stores/layout";

const emit = defineEmits(["toogle"]);
const props = defineProps(["calScrollFunc", "top", "classNames"]);

// const layout = layoutStore();
// const size = computed(() => layout.size);
const headerTitle = ref();
const divider = ref();
const scrollView = ref();
const showTitle = ref(false);
const inputFocus = ref(false);

function handleScroll() {
  if (scrollView.value.scrollTop > 32) {
    showTitle.value = true;
  } else {
    showTitle.value = false;
  }
}

onMounted(() => {});
</script>
<template>
  <div
    class="scrollView" 
    ref="scrollView"
    @scroll="handleScroll(scrollView, $event)"
  >
    <slot name="header" :showTitle="showTitle" :inputFocus="inputFocus"></slot>

    <slot name="title"></slot>
    <slot
      name="searchBar"
      :showDivider="showTitle"
      :inputFocus="inputFocus"
    ></slot>
    <slot name="content"></slot>
  </div>
</template>
<style lang="scss" scoped>
// @import "@/style/variables.scss";
.scrollView {
  width: 100%;
  height: 100%;
  //   padding: 0 $tabLeftSpace;
  // transform: translate(0, 0);
  background: var(--bgLight_Primary);
  overflow: auto;
  overscroll-behavior: none;
  // transform: translateX(0);
  // padding-top: $headerHeight;
}
::-webkit-scrollbar {
  display: none;
}
</style>