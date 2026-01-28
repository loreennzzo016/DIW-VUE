<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Agregar Nuevo Libro</h4>
          </div>

          <div class="card-body">
            <!-- Formulario -->
            <form @submit.prevent="addBook">
              <!-- Título -->
              <div class="mb-3">
                <label for="title" class="form-label">Título del Libro *</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="newBook.title"
                    placeholder="Ej: El Quijote"
                    required
                >
              </div>

              <!-- Autor -->
              <div class="mb-3">
                <label for="author" class="form-label">Autor *</label>
                <input
                    type="text"
                    class="form-control"
                    id="author"
                    v-model="newBook.author"
                    placeholder="Ej: Miguel de Cervantes"
                    required
                >
              </div>

              <!-- ISBN -->
              <div class="mb-3">
                <label for="isbn" class="form-label">ISBN</label>
                <input
                    type="text"
                    class="form-control"
                    id="isbn"
                    v-model="newBook.isbn"
                    placeholder="Ej: 978-3-16-148410-0"
                >
              </div>

              <!-- Categoría -->
              <div class="mb-3">
                <label for="category" class="form-label">Categoría</label>
                <select class="form-select" id="category" v-model="newBook.category">
                  <option value="">Seleccionar categoría</option>
                  <option value="Novela">Novela</option>
                  <option value="Ciencia Ficción">Ciencia Ficción</option>
                  <option value="Fantasía">Fantasía</option>
                  <option value="Clásico">Clásico</option>
                  <option value="Historia">Historia</option>
                  <option value="Biografía">Biografía</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <!-- Estado inicial -->
              <div class="mb-3">
                <label class="form-label">Estado Inicial</label>
                <div class="form-check">
                  <input
                      class="form-check-input"
                      type="radio"
                      value="disponible"
                      v-model="newBook.status"
                      id="status-available"
                  >
                  <label class="form-check-label" for="status-available">
                    <span class="badge bg-success">Disponible</span> - Listo para prestar
                  </label>
                </div>
                <div class="form-check">
                  <input
                      class="form-check-input"
                      type="radio"
                      value="prestado"
                      v-model="newBook.status"
                      id="status-borrowed"
                  >
                  <label class="form-check-label" for="status-borrowed">
                    <span class="badge bg-warning">Prestado</span> - Actualmente prestado
                  </label>
                </div>
                <div class="form-check">
                  <input
                      class="form-check-input"
                      type="radio"
                      value="pendiente"
                      v-model="newBook.status"
                      id="status-pending"
                  >
                  <label class="form-check-label" for="status-pending">
                    <span class="badge bg-danger">Pendiente</span> - En proceso o reparación
                  </label>
                </div>
              </div>

              <!-- Descripción -->
              <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    v-model="newBook.description"
                    placeholder="Breve descripción del libro..."
                ></textarea>
              </div>

              <!-- Botones -->
              <div class="d-flex justify-content-between">
                <router-link to="/books" class="btn btn-outline-secondary">
                  ← Volver a la lista
                </router-link>

                <button type="submit" class="btn btn-custom">
                  Guardar Libro
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Vista previa -->
        <div class="card mt-4" v-if="newBook.title">
          <div class="card-header">
            <h5 class="mb-0">Vista Previa del Libro</h5>
          </div>
          <div class="card-body">
            <h6>{{ newBook.title }}</h6>
            <p class="mb-1"><strong>Autor:</strong> {{ newBook.author }}</p>
            <p class="mb-1"><strong>Categoría:</strong> {{ newBook.category || 'No especificada' }}</p>
            <p class="mb-1"><strong>Estado:</strong>
              <span class="badge" :class="getStatusBadgeClass(newBook.status)">
                {{ getStatusText(newBook.status) }}
              </span>
            </p>
            <p v-if="newBook.description" class="mb-0">
              <strong>Descripción:</strong> {{ newBook.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBookView',
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        isbn: '',
        category: '',
        status: 'disponible',
        description: ''
      }
    }
  },
  methods: {
    // Agregar nuevo libro
    addBook() {
      // Aquí normalmente enviarías los datos a una API
      const newId = Date.now() // ID temporal basado en timestamp

      const bookToAdd = {
        id: newId,
        ...this.newBook,
        addedDate: new Date().toISOString().split('T')[0],
        borrowedDate: this.newBook.status === 'prestado' ? new Date().toISOString().split('T')[0] : null
      }

      // Aquí agregarías el libro a tu almacenamiento
      // Por ahora mostramos un alert
      alert(`Libro "${this.newBook.title}" agregado exitosamente con ID: ${newId}`)

      // Limpiar formulario
      this.resetForm()

      // Redirigir a la lista de libros
      this.$router.push('/books')
    },

    // Limpiar formulario
    resetForm() {
      this.newBook = {
        title: '',
        author: '',
        isbn: '',
        category: '',
        status: 'disponible',
        description: ''
      }
    },

    // Obtener clase para badge de estado
    getStatusBadgeClass(status) {
      const classes = {
        disponible: 'bg-success',
        prestado: 'bg-warning',
        pendiente: 'bg-danger'
      }
      return classes[status] || 'bg-secondary'
    },

    // Obtener texto para estado
    getStatusText(status) {
      const texts = {
        disponible: 'Disponible',
        prestado: 'Prestado',
        pendiente: 'Pendiente'
      }
      return texts[status] || 'Desconocido'
    }
  }
}
</script>