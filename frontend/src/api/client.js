import axios from 'axios'
// Instancia única de axios: la URL base viene del .env
const client = axios.create({
 baseURL: import.meta.env.VITE_API_URL, // (1)
 headers: { 'Content-Type': 'application/json' },
})
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client