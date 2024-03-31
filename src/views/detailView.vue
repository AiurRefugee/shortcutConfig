<script setup>
import { ref, onMounted, computed } from "vue";
import shortcut from "@/components/shortcut.vue";
import ScrollView from "@/viewComponent/scrollView.vue";
import appHeader from "@/components/header.vue";
import { shortcutStore } from "@/store/shortcut";
const store = shortcutStore();
import { useRouter, useRoute } from "vue-router";
import { calScroll } from "@/utils/utils.js";
// const props = defineProps(["shortcutDetail"])
const router = useRouter();
const route = useRoute();
const shortcutDetail = ref({
        "shortcutName": "经典永流传",
        
        "executable": true,
        "canAddParam": true,
        "readOnly": true,
        "params": [
            {
                "key": "孟德瞬息全宇宙",
                "type": "input",
                "keyFinished": true,
                "value": "BV1CG411J7MG"
            },
            {
                "key": "【川普】（高能泪目）起风了",
                "type": "input",
                "keyFinished": true,
                "value": "BV1J441157MP"
            },
            {
                "key": "兰亭序",
                "type": "input",
                "keyFinished": true,
                "value": "BV1Cv41187pd"
            },
            {
                "key": "东汉变种人",
                "type": "input",
                "keyFinished": true,
                "value": "BV1ZB4y1Y7Hm"
            },
            {
                "key": "叶问有枪",
                "type": "input",
                "keyFinished": true,
                "value": "BV1dp4y187JE"
            },
            {
                "key": "大雨还在下，做僵尸也会害怕",
                "type": "input",
                "keyFinished": true,
                "value": "BV1d8411Q76i"
            },
            {
                "key": "京海魔盗团",
                "type": "input",
                "keyFinished": true,
                "value": "BV1qh4y1s7cv"
            },
            {
                "key": "“不要唤醒我，我并不是在做梦”",
                "type": "input",
                "keyFinished": true,
                "value": "BV1Q44y1o77h"
            },
            {
                "key": "本来挺喜欢Fall Out Boy的",
                "type": "input",
                "keyFinished": true,
                "value": "BV1ZD4y1h7Cj "
            },
            {
                "key": "Zood",
                "type": "input",
                "keyFinished": true,
                "value": "BV1fV411W7Ss"
            },
            {
                "key": "i got smoke",
                "type": "input",
                "keyFinished": true,
                "value": "BV1UW4y1N79w"
            },
            {
                "key": "【星际老男孩】-黄旭东《基地转移》",
                "type": "input",
                "keyFinished": true,
                "value": "BV1DW411P7qy"
            },
            {
                "key": "【星际老男孩】-黄旭东《水手》",
                "type": "input",
                "keyFinished": true,
                "value": "BV1xW411Y7fV"
            },
            {
                "key": "烟distance",
                "type": "input",
                "keyFinished": true,
                "value": "BV1N84y1P7en"
            },
            {
                "key": "疯狂动物城2:热门生物鉴定",
                "type": "input",
                "keyFinished": true,
                "value": "BV1qg411M7ND"
            },
            {
                "key": "跟着雷总摇起来!Are you OK",
                "type": "input",
                "keyFinished": true,
                "value": "BV1es411D7sW"
            }
        ]
    },);
const touchPointx = computed( () => store.touchPointx)

const shortcutName = route.params.shortcutName;
console.log(shortcutName)

function navBack() {
  router.push({
    path: '/',
    replace: true
  })
}
 


onMounted(() => { 
});
</script>
<template>
  <ScrollView
    :top="false"
    :calScrollFunc="calScroll"
    :classNames="'detailView'"
  >
    <template v-slot:header>
      <appHeader
        :showBack="true"
        :leftFunc="navBack"
        :title="shortcutName"
      ></appHeader>
    </template>
    <template v-slot:content>
      <div class="h-8"></div>
      <!-- <button
        id="scrollTitle"
        class="flex items-center p-4 txtDark_Primary mt-6 text-2xl"
        @click="navBack"
      >
        <svg
          class="w-8 h-6 mr-1 txtDark_Basic rotate-180"
          viewBox="0 0 1024 1024"
        >
          <path
            class="bgDark_Basic"
            d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
            p-id="1451"
          ></path>
        </svg>
        <h2 class="font-bold">ShortcutConfig</h2>
      </button> -->
      <!-- <h2 id="scrollTitle" class="text-2xl px-5 font-bold txtDark_Primary">{{ shortcutDetail.shortcutName }}</h2> -->
      <shortcut :shortcut="shortcutDetail" v-if="shortcutDetail"></shortcut>
    </template>
  </ScrollView>
</template>