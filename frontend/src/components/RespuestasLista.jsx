export default function RespuestasLista({ respuestas , onEliminar}) {
  if (respuestas.length === 0) {
    return <p>No hay respuestas.</p>
  }

  return (
    <ul>
      {respuestas.map((r) => (
        <li key={r.id}>
          {r.contenido} · {r.autor_usuario} · {new Date(r.fecha).toLocaleString()}
          <button onClick={() => onEliminar(r.id)}>Eliminar</button>

        </li>
      ))}
    </ul>
  )
}