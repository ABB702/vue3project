import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n';
import mitt from 'mitt';

const app = createApp(App)

app.use(router)
app.use(i18n)
app.config.globalProperties.$eventBus = mitt();
i18n.global.locale = 'zh';

app.mount('#app')
