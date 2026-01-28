<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold" to="/">
        Biblioteca Online
      </router-link>

      <!-- Botón móvil -->
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/books">Libros</router-link>
          </li>

          <!-- Solo admin -->
          <li class="nav-item" v-if="$store.getters.isAdmin">
            <router-link class="nav-link" to="/add-book">Agregar Libro</router-link>
          </li>

          <!-- Solo admin -->
          <li class="nav-item" v-if="$store.getters.isAdmin">
            <router-link class="nav-link" to="/reports">Reportes</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/user">Usuarios</router-link>
          </li>
        </ul>

        <!-- Botones de acción -->
        <div class="d-flex">
          <router-link to="/login" class="btn btn-custom ms-3">
            Iniciar Sesión
          </router-link>

          <router-link to="/register" class="btn btn-outline-primary ms-2">
            Registrarse
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>