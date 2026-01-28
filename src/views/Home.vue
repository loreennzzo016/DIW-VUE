<template>
  <div class="container py-5">
    <!-- Hero Section -->
    <div class="text-center mb-5">
      <h1 class="display-4 text-primary mb-3">Gestión de Libros</h1>
      <p class="lead mb-4">Administra tu colección de libros de manera eficiente</p>
      <router-link to="/books" class="btn btn-custom btn-lg">
        Comenzar a Gestionar →
      </router-link>
    </div>

    <!-- Características -->
    <div class="row mb-5">
      <div class="col-md-4 mb-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="display-4 mb-3"></div>
            <h3>Catálogo Completo</h3>
            <p>Gestiona todos tus libros en un solo lugar con búsqueda avanzada</p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="display-4 mb-3"></div>
            <h3>Seguimiento de Préstamos</h3>
            <p>Controla qué libros están disponibles, prestados o pendientes</p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card text-center h-100">
          <div class="card-body">
            <div class="display-4 mb-3"></div>
            <h3>Reportes Detallados</h3>
            <p>Visualiza estadísticas y genera reportes de tu biblioteca</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="card bg-primary text-white">
      <div class="card-body text-center py-5">
        <h2 class="card-title mb-3">¿Listo para organizar tu biblioteca?</h2>
        <p class="card-text mb-4">Comienza hoy mismo a gestionar tu colección de libros</p>
        <router-link to="/add-book" class="btn btn-light btn-lg">
            Agregar Mi Primer Libro
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>