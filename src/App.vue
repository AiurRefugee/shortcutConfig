<script setup>
import { onMounted } from "vue";
import { shortcutStore } from "@/store/shortcut"; 
const store = shortcutStore();
onMounted(() => {
  
  window.addEventListener("resize", store.updateSize)
});
</script>
<template> 
    <addParamDialog/>
    <router-view v-slot="{ Component, route }"> 
        <transition :name="route.meta.transition">
          <component :is="Component" />
        </transition> 
    </router-view> 
</template> 