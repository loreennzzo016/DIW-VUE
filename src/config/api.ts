import axios, { AxiosHeaders } from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')

        if (token) {
            // Crear headers Axios si no existen
            if (!config.headers) {
                config.headers = new AxiosHeaders()
            }

            // Agregar el token usando el método set de AxiosHeaders
            config.headers.set('Authorization', `Bearer ${token}`)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api