import client from './client'
// Cada función corresponde a un endpoint de Django
export const listarPreguntas = (params = {}) =>
 client.get('/preguntas/', { params }).then((r) => r.data) // (1)

export const crearPregunta = (datos) =>
 client.post('/preguntas/', datos).then((r) => r.data)

export const borrarPregunta = (id) =>
  client.delete(`/preguntas/${id}/`).then((r) => r.data)