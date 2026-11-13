import client from './client'
// Cada función corresponde a un endpoint de Django
export const listarRepuestas = (params = {}) =>
 client.get('/respuestas/', { params }).then((r) => r.data) 

export const crearRespuesta = (datos) =>
 client.post('/respuestas/', datos).then((r) => r.data)

export const borrarRespuesta= (id) =>
  client.delete(`/respuestas/${id}/`).then((r) => r.data)