import { useState } from 'react'
import { crearRespuesta } from '../api/respuestas'

const VACIO = { contenido: '' }

export default function RespuestaForm({ pregunta, onCreado }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  // Un único manejador para todos los campos (usa el atributo name)
  const cambiar = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    try {
      const nuevo = await crearRespuesta({...datos, pregunta})
      onCreado(nuevo)
      setDatos(VACIO)
      setErrores({})
    } catch (err) {
      if (err.response?.status === 400) {
        setErrores(err.response.data) // errores del serializer de DRF
      } else {
        setErrores({ general: ['No se pudo conectar con la API.'] })
      }
    }
  }

  return (
    <form onSubmit={enviar}>
      <input name="contenido" type="text" placeholder="respuesta"
             value={datos.contenido} onChange={cambiar} />
             
      <button type="submit">Enviar Respuesta</button>

      {Object.entries(errores).map(([campo, mensajes]) => (
        <p key={campo} className="error">{campo}: {mensajes.join(' ')}</p>
      ))}
    </form>
  )
}
