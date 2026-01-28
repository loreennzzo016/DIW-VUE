<template>
  <footer class="bg-dark text-white mt-auto py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5><i class="bi bi-book-half me-2"></i>Biblioteca Vue</h5>
          <p>Sistema de gestión de libros desarrollado con Vue.js y Bootstrap 5.</p>
        </div>
        <div class="col-md-3">
          <h5>Enlaces</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Inicio</router-link></li>
            <li><router-link to="/books" class="text-white text-decoration-none">Libros</router-link></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Contacto</h5>
          <ul class="list-unstyled">
            <li><i class="bi bi-envelope me-2"></i>info@bibliotecavue.com</li>
            <li><i class="bi bi-telephone me-2"></i>+1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <hr class="bg-light">
      <div class="text-center">
        <p class="mb-0">&copy; 2024 Biblioteca Vue. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
footer a:hover {
  color: #4cc9f0 !important;
}
</style>
