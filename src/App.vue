<script setup>
import { onMounted, inject } from "vue";
import { shortcutStore } from "@/store/shortcut";
const $bus = inject('bus') 
const store = shortcutStore();
onMounted(() => { 
  window.addEventListener("resize", store.updateSize)
});
</script>
<template> 
    <addParamDialog ref="dialog"/>
    <router-view v-slot="{ Component, route }"> 
        <transition :name="route.meta.transition">
          <component :is="Component" />
        </transition> 
    </router-view> 
</template> 