// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Импортируем стили и библиотеку Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Подключаем всё к приложению
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// Регистрируем иконки (чтобы использовать <Edit />, <Delete /> и т.д.)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')