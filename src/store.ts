import { createStore } from 'vuex'

interface User {
    username: string
    email?: string
    role: 'admin' | 'user'
}

interface Book {
    id: number
    title: string
    author: string
    isbn: string
    category: string
    status: 'disponible' | 'prestado' | 'pendiente'
    addedDate: string
    borrowedDate?: string
    usuario: string | null
}

interface State {
    user: User | null
    books: Book[]
}

export default createStore<State>({
    state: {
        user: null,
        books: [
            { id: 1, title: 'El Quijote', author: 'Cervantes', isbn: '111', category: 'Clásico', status: 'disponible', addedDate: '2024-01-01', usuario: null },
            { id: 2, title: 'Cien Años de Soledad', author: 'García Márquez', isbn: '222', category: 'Realismo', status: 'prestado', addedDate: '2024-01-02', borrowedDate: '2024-01-10', usuario: 'user' },
            { id: 3, title: '1984', author: 'Orwell', isbn: '333', category: 'Ficción', status: 'pendiente', addedDate: '2024-01-03', usuario: 'user' },
            { id: 4, title: 'Rayuela', author: 'Cortázar', isbn: '444', category: 'Novela', status: 'disponible', addedDate: '2024-01-04', usuario: null },
            { id: 5, title: 'La Odisea', author: 'Homero', isbn: '555', category: 'Épico', status: 'disponible', addedDate: '2024-01-05', usuario: null },
            { id: 6, title: 'Hamlet', author: 'Shakespeare', isbn: '666', category: 'Teatro', status: 'disponible', addedDate: '2024-01-06', usuario: null },
            { id: 7, title: 'Fahrenheit 451', author: 'Bradbury', isbn: '777', category: 'Ficción', status: 'disponible', addedDate: '2024-01-07', usuario: null },
            { id: 8, title: 'El Principito', author: 'Saint-Exupéry', isbn: '888', category: 'Infantil', status: 'disponible', addedDate: '2024-01-08', usuario: null },
            { id: 9, title: 'Crimen y Castigo', author: 'Dostoievski', isbn: '999', category: 'Novela', status: 'disponible', addedDate: '2024-01-09', usuario: null },
            { id: 10, title: 'La Metamorfosis', author: 'Kafka', isbn: '1010', category: 'Novela', status: 'disponible', addedDate: '2024-01-10', usuario: null },
            { id: 11, title: 'El Hobbit', author: 'Tolkien', isbn: '1111', category: 'Fantasía', status: 'disponible', addedDate: '2024-01-11', usuario: null },
            { id: 12, title: 'Drácula', author: 'Stoker', isbn: '1212', category: 'Terror', status: 'disponible', addedDate: '2024-01-12', usuario: null }
        ]
    },

    mutations: {
        setUser(state: State, user: User) {
            state.user = user
        },

        logout(state: State) {
            state.user = null
        },

        updateBook(state: State, updatedBook: Book) {
            const index = state.books.findIndex((b: Book) => b.id === updatedBook.id)
            if (index !== -1) {
                state.books[index] = { ...state.books[index], ...updatedBook }
            }
        },

        deleteBook(state: State, id: number) {
            state.books = state.books.filter((b: Book) => b.id !== id)
        },

        addBook(state: State, book: Book) {
            state.books.push(book)
        }
    },

    actions: {
        login({ commit }: { commit: Function }, user: User) {
            commit('setUser', user)
        },

        logout({ commit }: { commit: Function }) {
            commit('logout')
        }
    },

    getters: {
        isAdmin: (state: State) => state.user?.role === 'admin',
        getBooks: (state: State) => state.books,
        getUser: (state: State) => state.user
    }
})