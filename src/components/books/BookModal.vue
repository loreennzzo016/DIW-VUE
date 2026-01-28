<template>
  <!-- Modal Component -->
  <div class="modal fade" :class="{ show: show, 'd-block': show }" tabindex="-1" v-if="show">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">
            {{ isEditing ? 'Editar Libro' : 'Agregar Nuevo Libro' }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <BookForm
              :book="book"
              @submit="handleSubmit"
              @cancel="$emit('close')"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Backdrop -->
  <div class="modal-backdrop fade" :class="{ show: show }" v-if="show" @click="$emit('close')"></div>
</template>

<script>
import BookForm from './BookForm.vue'

export default {
  name: 'BookModal',
  components: {
    BookForm
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    book: {
      type: Object,
      default: null
    }
  },
  computed: {
    isEditing() {
      return !!this.book
    }
  },
  methods: {
    handleSubmit(bookData) {
      this.$emit('save', bookData)
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>