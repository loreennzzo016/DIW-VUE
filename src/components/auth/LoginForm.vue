<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="mb-3">
      <label for="email">Email</label>
      <input
          v-model="email"
          type="email"
          id="email"
          required
          class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="password">Contraseña</label>
      <input
          v-model="password"
          type="password"
          id="password"
          required
          class="form-control"
      />
    </div>

    <button
        type="submit"
        class="btn btn-primary w-100"
        :disabled="loading"
    >
      {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
    </button>

    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const store = useStore()

// Usuarios de prueba
const users = [
  { email: 'admin@admin.com', password: 'admin123', role: 'admin', username: 'admin' },
  { email: 'user@user.com', password: 'user123', role: 'user', username: 'user' }
]

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    const found = users.find(
        u => u.email === email.value && u.password === password.value
    )

    if (!found) {
      error.value = 'Credenciales incorrectas'
      loading.value = false
      return
    }

    // Guardar usuario en Vuex
    store.commit('setUser', found)

    // Redirigir
    router.push('/books')
  }, 800)
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>