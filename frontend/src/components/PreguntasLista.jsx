export default function PreguntasLista({ preguntas , onEliminar}) {
  if (preguntas.length === 0) {
    return <p>No hay preguntas guardadas.</p>
  }

  return (
    <ul>
      {preguntas.map((p) => (
        <li key={p.id}>
          <strong>{p.titulo}</strong> · {p.contenido} · {p.autor_usuario} · {new Date(p.fecha).toLocaleString()}
          <button onClick={() => onEliminar(p.id)}>Eliminar</button>

        </li>
      ))}
    </ul>
  )
}