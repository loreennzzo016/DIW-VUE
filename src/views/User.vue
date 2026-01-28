<template>
  <div class="container mt-4">
    <h2>Usuarios y Libros Prestados</h2>
    <table class="table table-bordered table-hover">
      <thead class="table-light">
      <tr>
        <th>Usuario</th>
        <th>Libro</th>
        <th>Fecha de Préstamo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="registro in registros" :key="registro.id">
        <td>{{ registro.usuario }}</td>
        <td>{{ registro.libro }}</td>
        <td>{{ registro.fecha }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const registros = ref<{ id: number; usuario: string; libro: string; fecha: string }[]>([])

onMounted(() => {
  registros.value = [
    { id: 1, usuario: 'Ana García', libro: 'Cien Años de Soledad', fecha: '20 ene 2024' },
    { id: 2, usuario: 'Luis Pérez', libro: '1984', fecha: '22 ene 2024' },
  ]
})
</script>