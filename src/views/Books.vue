<template>
  <div class="container py-4">

    <!-- Si NO hay usuario logueado -->
    <div v-if="!user" class="alert alert-warning text-center">
      Debes iniciar sesión para ver los libros.
    </div>

    <!-- Si hay usuario -->
    <div v-else>

      <!-- Encabezado -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="text-primary mb-3">Gestión de Libros</h1>
          <p class="lead">Administra tu colección de libros de manera eficiente</p>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <div class="card border-success">
            <div class="card-body text-center">
              <h3 class="text-success">{{ stats.available }}</h3>
              <p class="mb-0">Disponibles</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card border-warning">
            <div class="card-body text-center">
              <h3 class="text-warning">{{ stats.borrowed }}</h3>
              <p class="mb-0">Prestados</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card border-danger">
            <div class="card-body text-center">
              <h3 class="text-danger">{{ stats.pending }}</h3>
              <p class="mb-0">Pendientes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón para agregar libro (solo admin) -->
      <div class="row mb-4" v-if="user.role === 'admin'">
        <div class="col-12">
          <router-link to="/add-book" class="btn btn-custom">
            Agregar Nuevo Libro
          </router-link>
        </div>
      </div>

      <!-- Botón reporte (solo admin) -->
      <div class="row mb-4" v-if="user.role === 'admin'">
        <div class="col-12">
          <button class="btn btn-dark" @click="verReporte">
            Ver Reporte de Usuarios
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Filtrar Libros</h5>
              <div class="btn-group" role="group">
                <button
                    v-for="status in ['todos', 'disponible', 'prestado', 'pendiente']"
                    :key="status"
                    class="btn btn-outline-primary"
                    :class="{ 'active': filterStatus === status }"
                    @click="filterStatus = status"
                >
                  {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de libros -->
      <div class="row">
        <div v-if="filteredBooks.length === 0" class="col-12">
          <div class="alert alert-info">
            No hay libros registrados.
          </div>
        </div>

        <div
            v-for="book in filteredBooks"
            :key="book.id"
            class="col-md-6 col-lg-4 mb-4"
        >
          <div class="card book-card h-100" :class="'status-' + book.status">
            <div class="card-body">

              <!-- Badge -->
              <div class="d-flex justify-content-between align-items-start mb-3">
                <span class="badge" :class="getStatusBadgeClass(book.status)">
                  {{ getStatusText(book.status) }}
                </span>
                <small class="text-muted">ID: {{ book.id }}</small>
              </div>

              <!-- Info -->
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">
                <strong>Autor:</strong> {{ book.author }}<br>
                <strong>ISBN:</strong> {{ book.isbn }}<br>
                <strong>Categoría:</strong> {{ book.category }}<br>
                <strong v-if="book.usuario">Usuario:</strong> {{ book.usuario }}
              </p>

              <!-- Fechas -->
              <div class="mb-3">
                <small class="text-muted d-block">
                  <strong>Agregado:</strong> {{ formatDate(book.addedDate) }}
                </small>
                <small v-if="book.borrowedDate" class="text-muted d-block">
                  <strong>Prestado:</strong> {{ formatDate(book.borrowedDate) }}
                </small>
              </div>

              <!-- Acciones -->
              <div class="d-flex justify-content-between">

                <!-- Ver -->
                <button class="btn btn-sm btn-outline-primary" @click="viewBookDetails(book)">
                  Ver
                </button>

                <!-- Acciones ADMIN -->
                <template v-if="user.role === 'admin'">
                  <button
                      class="btn btn-sm btn-outline-success"
                      @click="changeStatus(book, 'disponible')"
                      v-if="book.status !== 'disponible'"
                  >
                    Disponible
                  </button>

                  <button
                      class="btn btn-sm btn-outline-warning"
                      @click="changeStatus(book, 'prestado')"
                      v-if="book.status !== 'prestado'"
                  >
                    Prestar
                  </button>

                  <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteBook(book.id)"
                  >
                    Eliminar
                  </button>
                </template>

                <!-- Acciones USUARIO -->
                <template v-else>
                  <button
                      class="btn btn-sm btn-outline-success"
                      v-if="book.status === 'disponible'"
                      @click="solicitarLibro(book)"
                  >
                    Solicitar
                  </button>
                </template>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BooksView',

  computed: {
    user() {
      return this.$store.state.user;
    },

    stats() {
      return {
        available: this.books.filter(b => b.status === 'disponible').length,
        borrowed: this.books.filter(b => b.status === 'prestado').length,
        pending: this.books.filter(b => b.status === 'pendiente').length
      }
    },

    filteredBooks() {
      if (this.filterStatus === 'todos') return this.books;
      return this.books.filter(book => book.status === this.filterStatus);
    }
  },

  data() {
    return {
      filterStatus: 'todos',

      books: [
        { id: 1, title: 'El Quijote', author: 'Cervantes', isbn: '111', category: 'Clásico', status: 'disponible', addedDate: '2024-01-01' },
        { id: 2, title: 'Cien Años de Soledad', author: 'García Márquez', isbn: '222', category: 'Realismo', status: 'prestado', usuario: 'user', borrowedDate: '2024-01-10', addedDate: '2024-01-02' },
        { id: 3, title: '1984', author: 'Orwell', isbn: '333', category: 'Ficción', status: 'pendiente', usuario: 'user', addedDate: '2024-01-03' },
        { id: 4, title: 'Rayuela', author: 'Cortázar', isbn: '444', category: 'Novela', status: 'disponible', addedDate: '2024-01-04' },
        { id: 5, title: 'La Odisea', author: 'Homero', isbn: '555', category: 'Épico', status: 'disponible', addedDate: '2024-01-05' },
        { id: 6, title: 'Hamlet', author: 'Shakespeare', isbn: '666', category: 'Teatro', status: 'disponible', addedDate: '2024-01-06' },
        { id: 7, title: 'Fahrenheit 451', author: 'Bradbury', isbn: '777', category: 'Ficción', status: 'disponible', addedDate: '2024-01-07' },
        { id: 8, title: 'El Principito', author: 'Saint-Exupéry', isbn: '888', category: 'Infantil', status: 'disponible', addedDate: '2024-01-08' },
        { id: 9, title: 'Crimen y Castigo', author: 'Dostoievski', isbn: '999', category: 'Novela', status: 'disponible', addedDate: '2024-01-09' },
        { id: 10, title: 'La Metamorfosis', author: 'Kafka', isbn: '1010', category: 'Novela', status: 'disponible', addedDate: '2024-01-10' },
        { id: 11, title: 'El Hobbit', author: 'Tolkien', isbn: '1111', category: 'Fantasía', status: 'disponible', addedDate: '2024-01-11' },
        { id: 12, title: 'Drácula', author: 'Stoker', isbn: '1212', category: 'Terror', status: 'disponible', addedDate: '2024-01-12' }
      ]
    }
  },

  methods: {
    getStatusBadgeClass(status) {
      const classes = {
        disponible: 'bg-success',
        prestado: 'bg-warning',
        pendiente: 'bg-danger'
      };
      return classes[status] || 'bg-secondary';
    },

    getStatusText(status) {
      const texts = {
        disponible: 'Disponible',
        prestado: 'Prestado',
        pendiente: 'Pendiente'
      };
      return texts[status] || 'Desconocido';
    },

    formatDate(dateString) {
      if (!dateString) return 'No aplica';
      return new Date(dateString).toLocaleDateString('es-ES');
    },

    viewBookDetails(book) {
      alert(`Detalles de: ${book.title}\nAutor: ${book.author}\nEstado: ${this.getStatusText(book.status)}`);
    },

    solicitarLibro(book) {
      const index = this.books.findIndex(b => b.id === book.id);
      if (index !== -1) {
        this.books[index].status = 'pendiente';
        this.books[index].usuario = this.user.username;
        alert(`Solicitud enviada para "${book.title}"`);
      }
    },

    changeStatus(book, newStatus) {
      const index = this.books.findIndex(b => b.id === book.id);
      if (index !== -1) {
        this.books[index].status = newStatus;

        if (newStatus === 'prestado') {
          this.books[index].borrowedDate = new Date().toISOString().split('T')[0];
        } else {
          this.books[index].borrowedDate = null;
          this.books[index].usuario = null;
        }

        alert(`Libro "${book.title}" marcado como ${this.getStatusText(newStatus)}`);
      }
    },

    deleteBook(bookId) {
      if (confirm('¿Eliminar libro?')) {
        this.books = this.books.filter(book => book.id !== bookId);
        alert('Libro eliminado');
      }
    },

    verReporte() {
      const reporte = {};

      this.books.forEach(book => {
        if (book.usuario) {
          if (!reporte[book.usuario]) reporte[book.usuario] = [];
          reporte[book.usuario].push(book.title);
        }
      });

      let mensaje = 'Reporte de libros por usuario:\n\n';
      for (const usuario in reporte) {
        mensaje += `${usuario}: ${reporte[usuario].join(', ')}\n`;
      }

      alert(mensaje);
    }
  }
}
</script>