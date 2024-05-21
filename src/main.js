import { createApp } from 'vue' 
import '@/styles/common.scss'
import '@/styles/element.scss'
import '@/styles/variables.scss'
import '@/styles/transition.scss';
import { createPinia } from 'pinia'

import App from './App.vue' 
import addParamDialog from '@/components/addParamDialog.vue'
 
import { EventBus } from "@/utils/utils.js"
import router from './router'
const $bus = new EventBus() 

// create Vue app
const app = createApp(App);
app.use(router)
app.use(createPinia())

app.component('addParamDialog', addParamDialog)

app.provide('$bus', $bus)


app.mount('body')