<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { shortcutStore } from "@/store/shortcut";
const store = shortcutStore();
const Array = ref([1, 3, 2, 4, 5, 6, 7, 8, 9, 10]);
function deleteButton(index) {
  Array.value.splice(index, 1);
}
onMounted(() => {
  window.addEventListener("resize", store.updateSize)
});
</script>
<template>
  <!-- <div class="mt-12 text-white">
    <button >删除</button>
    <TransitionGroup name="list">
      <div v-for="item in Array" :key="item">
        <span>{{ item }} </span>
        <span v-if="item == 2" @click="deleteButton(2)">删除</span>
      </div>
    </TransitionGroup>
  </div> -->
  <section class="w-full h-full">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <transition :name="route.meta.transition">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </section>
</template> 