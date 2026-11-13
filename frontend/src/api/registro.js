import client from './client'
// Cada función corresponde a un endpoint de Django

export const registrarUsuario = (datos) =>
 client.post('/registro/', datos).then((r) => r.data)

export const iniciarSesion = (credenciales) =>
  client.post('/token/', credenciales).then((r) => r.data)
