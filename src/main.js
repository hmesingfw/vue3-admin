import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element.js'
import importComponent from './plugins/import-component.js'
import hCust from '@/components/h-cust'
import axios from '@/config/axios-config'

/* import styles */
import '@/styles/main.scss'

const app = createApp(App)
app.use(store).use(router);

app.config.globalProperties.$http = axios; // 挂载全局变量

installElementPlus(app)
importComponent(app)
hCust(app); // 引入composition api  组件

app.mount('#app')
