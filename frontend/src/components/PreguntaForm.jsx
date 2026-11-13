import { useState } from 'react'
import { crearPregunta } from '../api/preguntas'

const VACIO = { titulo: '', contenido: ''}

export default function PreguntaForm({ onCreado }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  // Un único manejador para todos los campos (usa el atributo name)
  const cambiar = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value })

  async function enviar(e) {
    e.preventDefault()
    try {
      const nuevo = await crearPregunta(datos)
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
      <input name="titulo" placeholder="titulo"
             value={datos.titulo} onChange={cambiar} />
      <input name="contenido" type="text" placeholder="contenido"
             value={datos.contenido} onChange={cambiar} />
      <button type="submit">Enviar Pregunta</button>

      {Object.entries(errores).map(([campo, mensajes]) => (
        <p key={campo} className="error">{campo}: {mensajes.join(' ')}</p>
      ))}
    </form>
  )
}
