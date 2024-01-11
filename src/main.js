import { createApp } from 'vue' 
import '@/styles/common.scss'
// import '@/styles/element.scss'

import App from './App.vue' 

import VueTouch from "vue-touch";

// create Vue app
const app = createApp(App);
 
app.use(VueTouch, { name: 'v-touch' })

app.mount('#app')