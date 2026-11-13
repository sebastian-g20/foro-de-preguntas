import RespuestaForm from './RespuestaForm'
import RespuestasLista from './RespuestasLista'

export default function PreguntasLista({ preguntas , onEliminar, onRespuestaCreada, onEliminarRespuesta}) {
  if (preguntas.length === 0) {
    return <p>No hay preguntas guardadas.</p>
  }

  return (
    <ul>
      {preguntas.map((p) => (
        <li key={p.id}>
          <strong>{p.titulo}</strong> · {p.contenido} · {p.autor_usuario} · {new Date(p.fecha).toLocaleString()}
          <button onClick={() => onEliminar(p.id)}>Eliminar</button>
        <RespuestasLista
            respuestas={p.respuestas}
            onEliminar={(respuestaId) => onEliminarRespuesta(p.id, respuestaId)}
          />

          <RespuestaForm
            pregunta={p.id}
            onCreado={(nuevaResp) => onRespuestaCreada(p.id, nuevaResp)}
          />
        </li>
        
      ))
      }
    </ul>
  )
}