import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import { PrimeVue } from '@primevue/core'
import Aura from '@primevue/themes/aura'
import "primeicons/primeicons.css"


createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .use(createPinia())
    .mount('#app')
