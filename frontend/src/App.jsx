import { useState, useEffect } from 'react'
import { listarPreguntas, borrarPregunta } from './api/preguntas'
import { borrarRespuesta } from './api/respuestas'
import PreguntasLista from './components/PreguntasLista'
import PreguntaForm from './components/PreguntaForm'
import UsuarioForm from './components/UsuarioForm'

export default function App() {
  const [preguntas, setPreguntas] = useState([])
  const [autenticado, setAutenticado] = useState(() => !!localStorage.getItem('access_token'))
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Se ejecuta una vez, al montar el componente
  useEffect(() => {
    async function cargar() {
      try {
        const [pregs] = await Promise.all([
          listarPreguntas()
        ])
        setPreguntas(pregs)
      } catch {
        setError('No se pudo conectar con la API. ¿Está corriendo Django?')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])
  const cerrarSesion = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setAutenticado(false)
  }

  const agregarPregunta = (nuevo) => setPreguntas((prev) => [...prev, nuevo])
  const eliminarPregunta = async (id) => {
  try {
    await borrarPregunta(id)
    setPreguntas((prev) => prev.filter((p) => p.id !== id))
  } catch {
    setError('No se pudo eliminar la pregunta. Verifica tus permisos.')
    }
  }
  const agregarRespuesta = (preguntaId, nuevaRespuesta) => {setPreguntas((prev) =>
      prev.map((p) => p.id === preguntaId ? { ...p, respuestas: [...(p.respuestas || []), nuevaRespuesta] }
          : p
      )
    )
  }

  const eliminarRespuesta = async (preguntaId, respuestaId) => {
    try {
      await borrarRespuesta(respuestaId)
      setPreguntas((prev) =>
        prev.map((p) =>
          p.id === preguntaId ? { ...p, respuestas: (p.respuestas || []).filter((r) => r.id !== respuestaId) }
            : p
        )
      )
    } catch {
      setError('No se pudo eliminar la respuesta. Verifica tus permisos.')
    }
  }

  return (
    <main>
      <h1>Preguntas</h1>

      {!autenticado ? (
        <UsuarioForm onLoginExitoso={() => setAutenticado(true)} />
      ) : (
        <>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
          <PreguntaForm onCreado={agregarPregunta} />
        </>
      )}
      
 
      {cargando && <p>Cargando…</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && <PreguntasLista preguntas={preguntas} onEliminar={eliminarPregunta} 
      onRespuestaCreada={agregarRespuesta} onEliminarRespuesta={eliminarRespuesta}/>}
    </main>
  )
}


