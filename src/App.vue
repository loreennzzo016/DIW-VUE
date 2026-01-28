<template>
  <div id="app">
    <!-- Header -->
    <AppHeader />

    <!-- Contenido principal -->
    <main class="py-4">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
/* Asegurar que el contenido principal ocupe el espacio disponible */
main {
  min-height: calc(100vh - 130px);
}
</style>