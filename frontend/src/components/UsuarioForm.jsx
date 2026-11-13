import { useState } from 'react'
import { registrarUsuario, iniciarSesion } from '../api/registro'

export default function UsuarioForm({ onLoginExitoso }) {
  const [modoRegistro, setModoRegistro] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const manejarSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      // Si está en modo registro, primero crea el usuario en Django
      if (modoRegistro) {
        await registrarUsuario({ username, email, password })
      }

      // Obtiene los tokens JWT (access y refresh)
      const tokens = await iniciarSesion({ username, password })
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)

      // Avisa al componente padre (App) que el usuario ya inició sesión
      onLoginExitoso()
    } catch {
      setError(
        modoRegistro
          ? 'No se pudo completar el registro. Verifica los datos.'
          : 'Usuario o contraseña incorrectos.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section>
      <h2>{modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {modoRegistro && (
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={enviando}>
          {enviando
            ? 'Procesando...'
            : modoRegistro
            ? 'Registrarme y entrar'
            : 'Entrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setModoRegistro(!modoRegistro)
          setError(null)
        }}
      >
        {modoRegistro
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </section>
  )
}
