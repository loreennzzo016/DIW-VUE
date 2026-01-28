import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap 5 (CSS + JS)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos globales propios
import './assets/css/global.css'

const app: VueApp = createApp(App)

// Protección de rutas (solo admin)
router.beforeEach((to, _, next) => {
    const user = store.state.user

    if (to.meta?.requiresAdmin && user?.role !== 'admin') {
        return next('/books')
    }

    next()
})

app.use(store)
app.use(router)
app.mount('#app')