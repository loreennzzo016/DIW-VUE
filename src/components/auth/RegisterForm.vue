<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary">Registro de Usuario</h2>

    <form @submit.prevent="handleRegister" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="username" class="form-label">Nombre de usuario</label>
        <input v-model="username" type="text" id="username" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input v-model="email" type="email" id="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input v-model="password" type="password" id="password" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="role" class="form-label">Rol</label>
        <select v-model="role" id="role" class="form-select">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary w-100">Registrarse</button>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: 'user',
      error: ''
    }
  },
  methods: {
    handleRegister() {
      if (!this.username || !this.email || !this.password) {
        this.error = 'Todos los campos son obligatorios'
        return
      }

      // Simulación de registro (puedes conectar con API o store)
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      }

      // Aquí podrías guardar en localStorage, store o enviar a backend
      console.log('Usuario registrado:', newUser)

      this.$router.push('/login')
    }
  }
}
</script>