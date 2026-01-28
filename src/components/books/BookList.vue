<template>
  <div class="book-list">

    <!-- Filtros -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Buscar libro</label>
            <input
                type="text"
                class="form-control"
                placeholder="Título, autor, género..."
                v-model="searchQuery"
            >
          </div>

          <div class="col-md-3">
            <label class="form-label">Género</label>
            <select class="form-select" v-model="selectedGenre">
              <option value="">Todos</option>
              <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label">Estado</label>
            <select class="form-select" v-model="selectedStatus">
              <option value="">Todos</option>
              <option value="disponible">Disponible</option>
              <option value="prestado">Prestado</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Books Grid -->
    <div v-if="filteredBooks.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="book in paginatedBooks" :key="book.id" class="col">
        <div class="card h-100 shadow-sm">

          <div class="card-header bg-transparent border-0 pt-3">
            <span class="badge" :class="statusBadgeClass(book.status)">
              {{ getStatusText(book.status) }}
            </span>
          </div>

          <div class="card-body text-center">
            <div class="book-cover mb-3 mx-auto">
              <i class="bi bi-book fs-1 text-primary"></i>
            </div>

            <h5 class="card-title fw-bold">{{ book.title }}</h5>
            <p class="card-text text-muted">{{ book.author }}</p>

            <div class="mb-3">
              <span class="badge bg-light text-dark me-1">{{ book.category }}</span>
              <span class="badge bg-light text-dark">{{ book.isbn }}</span>
            </div>

            <p class="card-text small text-truncate" :title="book.description">
              {{ truncateText(book.description || 'Sin descripción', 80) }}
            </p>
          </div>

          <div class="card-footer bg-transparent border-0 pb-3">
            <div class="d-flex justify-content-center gap-2">

              <!-- ADMIN -->
              <template v-if="user?.role === 'admin'">
                <button class="btn btn-sm btn-outline-primary" @click="$emit('edit-book', book)">
                  <i class="bi bi-pencil"></i> Editar
                </button>

                <button class="btn btn-sm btn-outline-danger" @click="confirmDelete(book.id)">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </template>

              <!-- USER -->
              <template v-else>
                <button
                    v-if="book.status === 'disponible'"
                    class="btn btn-sm btn-outline-success"
                    @click="$emit('request-book', book)"
                >
                  Solicitar
                </button>
              </template>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-5">
      <div class="mb-3">
        <i class="bi bi-book text-muted fs-1"></i>
      </div>
      <h4 class="text-muted">No se encontraron libros</h4>
      <p class="text-muted">Intenta ajustar tus filtros de búsqueda</p>
    </div>

    <!-- Pagination -->
    <div v-if="filteredBooks.length > 0" class="d-flex justify-content-center mt-5">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--">Anterior</button>
          </li>

          <li
              v-for="page in totalPages"
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="currentPage = page">{{ page }}</button>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++">Siguiente</button>
          </li>
        </ul>
      </nav>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BookList',

  props: {
    books: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      searchQuery: '',
      selectedGenre: '',
      selectedStatus: '',
      currentPage: 1,
      itemsPerPage: 6
    }
  },

  computed: {
    ...mapState(['user']),

    genres() {
      const set = new Set(this.books.map(b => b.category))
      return [...set]
    },

    filteredBooks() {
      return this.books.filter(book => {
        const matchesSearch =
            !this.searchQuery ||
            book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchesGenre =
            !this.selectedGenre || book.category === this.selectedGenre

        const matchesStatus =
            !this.selectedStatus || book.status === this.selectedStatus

        return matchesSearch && matchesGenre && matchesStatus
      })
    },

    paginatedBooks() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredBooks.slice(start, start + this.itemsPerPage)
    },

    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.itemsPerPage)
    }
  },

  methods: {
    statusBadgeClass(status) {
      return {
        disponible: 'bg-success',
        prestado: 'bg-warning text-dark',
        pendiente: 'bg-danger'
      }[status] || 'bg-secondary'
    },

    getStatusText(status) {
      return {
        disponible: 'Disponible',
        prestado: 'Prestado',
        pendiente: 'Pendiente'
      }[status] || 'Desconocido'
    },

    truncateText(text, length) {
      return text.length <= length ? text : text.substring(0, length) + '...'
    },

    confirmDelete(id) {
      if (confirm('¿Eliminar libro?')) {
        this.$emit('delete-book', id)
      }
    }
  }
}
</script>

<style scoped>
.book-cover {
  width: 80px;
  height: 100px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>