<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast show"
        :class="`toast-${toast.type}`"
        role="alert"
    >
      <div class="toast-header">
        <i class="bi me-2" :class="toastIcon(toast.type)"></i>
        <strong class="me-auto">{{ toast.title }}</strong>
        <small>{{ toast.time }}</small>
        <button type="button" class="btn-close" @click="removeToast(toast.id)"></button>
      </div>
      <div class="toast-body">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastContainer',
  data() {
    return {
      toasts: [],
      nextId: 1
    }
  },
  mounted() {
    // Escuchar eventos de toast desde cualquier componente
    this.$root.$on('show-toast', this.addToast)
  },
  beforeUnmount() {
    this.$root.$off('show-toast', this.addToast)
  },
  methods: {
    toastIcon(type) {
      switch (type) {
        case 'success': return 'bi-check-circle-fill text-success'
        case 'error': return 'bi-exclamation-circle-fill text-danger'
        case 'warning': return 'bi-exclamation-triangle-fill text-warning'
        case 'info': return 'bi-info-circle-fill text-info'
        default: return 'bi-info-circle-fill text-primary'
      }
    },
    addToast(toast) {
      const id = this.nextId++
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      this.toasts.push({
        id,
        time,
        ...toast
      })

      // Auto-remove after 5 seconds
      setTimeout(() => {
        this.removeToast(id)
      }, 5000)
    },
    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id)
    }
  }
}
</script>

<style scoped>
.toast {
  min-width: 300px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>