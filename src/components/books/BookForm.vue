<template>
  <form @submit.prevent="handleSubmit">
    <div class="row g-3">
      <!-- Title -->
      <div class="col-md-12">
        <label for="title" class="form-label">Título <span class="text-danger">*</span></label>
        <input
            type="text"
            class="form-control"
            id="title"
            v-model="formData.title"
            required
            placeholder="Ingrese el título del libro"
        >
        <div class="invalid-feedback" v-if="errors.title">
          {{ errors.title }}
        </div>
      </div>

      <!-- Author -->
      <div class="col-md-6">
        <label for="author" class="form-label">Autor <span class="text-danger">*</span></label>
        <input
            type="text"
            class="form-control"
            id="author"
            v-model="formData.author"
            required
            placeholder="Nombre del autor"
        >
      </div>

      <!-- Year -->
      <div class="col-md-3">
        <label for="year" class="form-label">Año</label>
        <input
            type="number"
            class="form-control"
            id="year"
            v-model="formData.year"
            min="1000"
            max="2024"
            placeholder="2024"
        >
      </div>

      <!-- Genre -->
      <div class="col-md-3">
        <label for="genre" class="form-label">Género</label>
        <select class="form-select" id="genre" v-model="formData.genre">
          <option value="" disabled>Seleccione un género</option>
          <option value="Ficción">Ficción</option>
          <option value="No Ficción">No Ficción</option>
          <option value="Ciencia">Ciencia</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Biografía">Biografía</option>
          <option value="Historia">Historia</option>
          <option value="Poesía">Poesía</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <!-- Description -->
      <div class="col-12">
        <label for="description" class="form-label">Descripción</label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            v-model="formData.description"
            placeholder="Breve descripción del libro..."
        ></textarea>
      </div>

      <!-- Status -->
      <div class="col-md-6">
        <label for="status" class="form-label">Estado</label>
        <select class="form-select" id="status" v-model="formData.status">
          <option value="Disponible">Disponible</option>
          <option value="Prestado">Prestado</option>
          <option value="Reservado">Reservado</option>
          <option value="Perdido">Perdido</option>
        </select>
      </div>

      <!-- ISBN -->
      <div class="col-md-6">
        <label for="isbn" class="form-label">ISBN</label>
        <input
            type="text"
            class="form-control"
            id="isbn"
            v-model="formData.isbn"
            placeholder="Ej: 978-3-16-148410-0"
        >
      </div>

      <!-- Cover URL -->
      <div class="col-12">
        <label for="coverUrl" class="form-label">URL de portada</label>
        <input
            type="url"
            class="form-control"
            id="coverUrl"
            v-model="formData.coverUrl"
            placeholder="https://ejemplo.com/portada.jpg"
        >
      </div>

      <!-- Rating -->
      <div class="col-12">
        <label class="form-label">Calificación</label>
        <div class="rating-stars">
          <i
              v-for="star in 5"
              :key="star"
              class="bi cursor-pointer me-1"
              :class="star <= formData.rating ? 'bi-star-fill text-warning' : 'bi-star'"
              @click="formData.rating = star"
          ></i>
          <span class="ms-2 text-muted">{{ formData.rating }}/5</span>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="modal-footer border-0 pt-4">
      <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary">
        {{ isEditing ? 'Actualizar' : 'Guardar' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BookForm',
  props: {
    book: {
      type: Object,
      default: null
    }
  },
  data() {
    const defaultBook = {
      title: '',
      author: '',
      description: '',
      genre: '',
      year: new Date().getFullYear(),
      status: 'Disponible',
      isbn: '',
      coverUrl: '',
      rating: 0
    }

    return {
      formData: this.book ? { ...this.book } : { ...defaultBook },
      errors: {}
    }
  },
  computed: {
    isEditing() {
      return !!this.book
    }
  },
  methods: {
    validateForm() {
      this.errors = {}

      if (!this.formData.title.trim()) {
        this.errors.title = 'El título es obligatorio'
      }

      if (!this.formData.author.trim()) {
        this.errors.author = 'El autor es obligatorio'
      }

      return Object.keys(this.errors).length === 0
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.$emit('submit', { ...this.formData })
      }
    }
  },
  watch: {
    book(newBook) {
      if (newBook) {
        this.formData = { ...newBook }
      } else {
        // Reset form
        this.formData = {
          title: '',
          author: '',
          description: '',
          genre: '',
          year: new Date().getFullYear(),
          status: 'Disponible',
          isbn: '',
          coverUrl: '',
          rating: 0
        }
      }
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.rating-stars {
  font-size: 1.5rem;
}

.form-label {
  font-weight: 500;
}
</style>