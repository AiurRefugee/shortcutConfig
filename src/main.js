import { createApp } from 'vue' 
import '@/styles/common.scss'
import '@/styles/element.scss'

import App from './App.vue' 
 
import { EventBus } from "@/utils/util.js"

const $bus = new EventBus() 

// create Vue app
const app = createApp(App);

app.provide('$bus', $bus)


app.mount('#app')