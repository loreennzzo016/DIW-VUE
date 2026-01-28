<template>
  <div id="app">
    <AppHeader />
    <main class="container-fluid px-0">
      <router-view />
    </main>
    <AppFooter />
    <ToastContainer ref="toastContainer" />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import ToastContainer from './components/ui/ToastContainer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ToastContainer
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
