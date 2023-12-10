import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入粒子库
import Particles from "particles.vue3";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import request from '@/util/axios_config'
createApp(App).use(store).use(router).use(ElementPlus).use(Particles).mount('#app')
