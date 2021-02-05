import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element.js'
import importComponent from './plugins/import-component.js'
import hCust from '@/components/HCust'
import axios from '@/config/axios-config'
import icons from '@/icons/index'

/* import styles */
import '@/styles/index.scss' // global css
import '@/styles/main.scss'

const app = createApp(App)
app.use(store);
app.use(router);

app.config.globalProperties.$http = axios; // 挂载全局变量

installElementPlus(app)
importComponent(app)
hCust(app); // 引入composition api  组件
icons(app); // 引入icons
app.mount('#app')
