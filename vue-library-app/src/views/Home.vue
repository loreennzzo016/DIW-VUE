<template>
  <div class="home">
    <div class="container py-5">
      <h1 class="display-4 fw-bold mb-4">¡Bienvenido a la Biblioteca Vue!</h1>
      <p class="lead mb-4">Una aplicación moderna para gestionar libros con Vue.js y Bootstrap.</p>
      
      <div class="row mt-5">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="bi bi-book text-primary display-4 mb-3"></i>
              <h5 class="card-title">Gestión de Libros</h5>
              <p class="card-text">Administra tu colección de libros</p>
              <router-link to="/books" class="btn btn-primary">Ver Libros</router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="bi bi-person text-success display-4 mb-3"></i>
              <h5 class="card-title">Autores</h5>
              <p class="card-text">Gestiona información de autores</p>
              <button class="btn btn-success" disabled>Próximamente</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center">
              <i class="bi bi-bar-chart text-info display-4 mb-3"></i>
              <h5 class="card-title">Reportes</h5>
              <p class="card-text">Genera reportes y estadísticas</p>
              <button class="btn btn-info" disabled>Próximamente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  background-color: #f8f9fa;
  min-height: 80vh;
}
</style>
