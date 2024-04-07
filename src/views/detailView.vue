<script setup>
import { ref, onMounted, computed } from "vue";
import shortcut from "@/components/shortcut.vue";
import ScrollView from "@/viewComponent/scrollView.vue";
import appHeader from "@/components/header.vue";
import { shortcutStore } from "@/store/shortcut";
const store = shortcutStore();

import { calScroll } from "@/utils/utils.js";
// const props = defineProps(["shortcutDetail"])
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const shortcutDetail = ref( {
        "shortcutName": "读取哈希表",
        
        "canAddParam": true,
        
        "params": [
            {
                "key": "Steam",
                "canAddParam": true,
                "params": [
                    {
                        "key": "孙威",
                        "type": "input",
                        "keyFinished": true,
                        "value": "vittoriaimpero\tVEAnarchy133176",
                        "textarea": true
                    },
                    {
                        "key": "我的",
                        "type": "input",
                        "keyFinished": true,
                        "value": "feizhouren20\tmy20190502",
                        "textarea": true
                    },
                    {
                        "key": "王意",
                        "type": "input",
                        "keyFinished": true,
                        "value": "yw4549\tabcdxyz2001",
                        "textarea": true
                    },
                    {
                        "key": "朱兆勇",
                        "type": "input",
                        "keyFinished": true,
                        "value": "zzy521314520\tzzy521314..+",
                        "textarea": true
                    },
                    {
                        "key": "The憨",
                        "type": "input",
                        "keyFinished": true,
                        "value": "K1tto_qn\tyour@birthday",
                        "textarea": true
                    },
                    {
                        "key": "我的a区",
                        "type": "input",
                        "keyFinished": true,
                        "value": "2298641141\tmy20190502",
                        "textarea": true
                    }
                ]
            },
            {
                "key": "常用",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "2298641141@qq.com\tMy20190502@"
            },
            {
                "key": "Epic",
                "canAddParam": true,
                "params": [
                    {
                        "key": "柯娜 灵媒",
                        "type": "input",
                        "keyFinished": true,
                        "value": "3599632571@qq.com\tmy20200502",
                        "textarea": true
                    },
                    {
                        "key": "四海兄弟 sifu 死亡搁浅 无主之地3",
                        "type": "input",
                        "keyFinished": true,
                        "value": "2041038590@qq.com\tlanqiao1seasy",
                        "textarea": true
                    },
                    {
                        "key": "网易邮箱",
                        "type": "input",
                        "keyFinished": true,
                        "value": "aiurrefugee@163.com\tLanqiao1seasy",
                        "textarea": true
                    }
                ]
            },
            {
                "key": "宽带",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "051988851042\t687666"
            },
            {
                "key": "阿里天池",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "19850221525\tAiur20190502@"
            },
            {
                "key": "清华镜像",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "pip install beautifulsoup4 -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn"
            },
            {
                "key": "Parsec密码",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "Aiur20190502@"
            },
            {
                "key": "学信网",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "3599632571@qq.com\tMy20190502@"
            },
            {
                "key": "PC mac地址",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "D8:BB:C1:3F:D1:F7"
            },
            {
                "key": "光猫账号",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "useradmin\tmwsra"
            },
            {
                "key": "路由器账号",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "admin\t1630@CTCC"
            },
            {
                "key": "美区id",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "AiurRefugee@outlook.com\tMy20230502@"
            },
            {
                "key": "gitlab",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "2298641141@qq.com\tMy20190502@"
            },
            {
                "key": "4k电影,布谷tv",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "2298641141@qq.com\tMy20190502@"
            },
            {
                "key": "B站api",
                "canAddParam": true,
                "params": [
                    {
                        "key": "刷新推荐",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd"
                    },
                    {
                        "key": "关注列表",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "https://api.bilibili.com/x/polymer/web-dynamic/v1/portal"
                    },
                    {
                        "key": "动态",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&page=1&features=itemOpusStyle"
                    }
                ]
            },
            {
                "key": "Apple id",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "2298641141@qq.com\tMy20190502@"
            },
            {
                "key": "Working",
                "canAddParam": true,
                "params": [
                    {
                        "key": "i-go Swagger",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "http://iflight.eatuo.com:30001/sias-manage/PVG/swagger-ui.html#!/\t123456\tYang@123456"
                    },
                    {
                        "key": "ifgliht with GPT",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "xiaohu\t123456"
                    },
                    {
                        "key": "igo, igo2.0账号",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": " 123456\tYang@123456"
                    },
                    {
                        "key": "jerkins",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "http://iflight.eatuo.com:30180\tadmin\tIflight@abcd"
                    },
                    {
                        "key": "igo app账号",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "105669\tMy20190502@"
                    },
                    {
                        "key": "发改委",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "http://192.168.1.6:25624/SZsystem/login\tfagaisys\tfasys2021"
                    }
                ]
            },
            {
                "key": "Ngrok",
                "params": [
                    {
                        "key": "域名",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "routinely-keen-gibbon.ngrok-free.app"
                    },
                    {
                        "key": "命令",
                        "type": "input",
                        "keyFinished": true,
                        "textarea": true,
                        "value": "ngrok http --domain=routinely-keen-gibbon.ngrok-free.app 32400"
                    }
                ]
            },
            {
                "key": "迅雷",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "19850221525\tmy20190502"
            },
            {
                "key": "Mac盗版网站",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "https://mac.macsc.com/\t15950006689\thouhui123"
            },
            {
                "key": "美国手机号",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "3435598466\thttp://45.76.64.177/i_SMS/rest/MSService?state=5&code=openai_5fdcc9591b736dad631fedddd984b2b7"
            },
            {
                "key": "R星",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "2298641141@qq.com\tMy20190502"
            },
            {
                "key": "微软邮箱 猫和老鼠",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "aiurrefugee@outlook.com\tmy20190502"
            },
            {
                "key": "阿里云",
                "type": "input",
                "keyFinished": true,
                "textarea": true,
                "value": "19850221525\tMy20190502@"
            }
        ]
    });
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