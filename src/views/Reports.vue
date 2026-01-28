<template>
  <div class="container py-4">

    <h1 class="mb-4 text-primary">Reporte de Libros por Usuario</h1>

    <!-- Si no hay datos -->
    <div v-if="Object.keys(report).length === 0" class="alert alert-info">
      Ningún usuario ha solicitado o prestado libros todavía.
    </div>

    <!-- Reporte agrupado -->
    <div v-else>
      <div
          v-for="(libros, usuario) in report"
          :key="usuario"
          class="card mb-3 shadow-sm"
      >
        <div class="card-header bg-dark text-white">
          Usuario: {{ usuario }}
        </div>

        <div class="card-body">
          <ul class="list-group">
            <li
                v-for="libro in libros"
                :key="libro.id"
                class="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{{ libro.title }}</span>
              <span class="badge bg-secondary">{{ getStatusText(libro.status) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReportsView',

  computed: {
    ...mapState(['books', 'user']),

    report() {
      return this.books.reduce((acc, libro) => {
        if (libro.usuario) {
          acc[libro.usuario] = acc[libro.usuario] || []
          acc[libro.usuario].push(libro)
        }
        return acc
      }, {})
    }
  },

  methods: {
    getStatusText(status) {
      return {
        disponible: 'Disponible',
        prestado: 'Prestado',
        pendiente: 'Pendiente'
      }[status] || 'Desconocido'
    }
  }
}
</script>

<style scoped>
.card-header {
  font-size: 1.1rem;
}
</style>