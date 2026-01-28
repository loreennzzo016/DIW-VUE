<template>
  <footer class="bg-dark text-white py-4 mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-3">
          <h5>Biblioteca Online</h5>
          <p>Sistema de gestión de libros desarrollado con Vue.js y Bootstrap.</p>
        </div>

        <div class="col-md-4 mb-3">
          <h5>Enlaces Rápidos</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white text-decoration-none">Inicio</router-link></li>
            <li><router-link to="/books" class="text-white text-decoration-none">Libros</router-link></li>
            <li><router-link to="/add-book" class="text-white text-decoration-none">Agregar Libro</router-link></li>
          </ul>
        </div>

        <div class="col-md-4 mb-3">
          <h5>Contacto</h5>
          <p class="mb-1">info@bibliotecavue.com</p>
          <p class="mb-1">+34 (555) 123-4567</p>
          <p class="mb-0">312 Calle Principal, Ciudad</p>
        </div>
      </div>

      <hr class="bg-light">

      <div class="text-center">
        <p class="mb-0">
          © 2026 Biblioteca Vue. Todos los derechos reservados. |
          <a href="#" class="text-white text-decoration-none">Política de privacidad</a> |
          <a href="#" class="text-white text-decoration-none">Términos de servicio</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>