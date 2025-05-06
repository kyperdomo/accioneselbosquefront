/*import React from 'react';
import styles from '../Style/styles.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesion</h1>
      <form>
      <label>Correo o Usuario:</label>
        <div className={styles.inputGroup}>
          <input className={styles.input} type="text" name="usuario" />
        </div>
        <label>Contraseña:</label>
        <div className={styles.inputGroup}>
          <input className={styles.input} type="password" name="contraseña" />
        </div>
        <button className={styles.button} type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default Login;*/


/* medio funcional por eso del servidor
import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://TU_BACKEND_API/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        // Aquí podrías guardar el token, redirigir, etc.
        alert('Inicio de sesión exitoso');
      } else {
        setError(data.mensaje || 'Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label>Correo o Usuario:</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <label>Contraseña:</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;*/

import React, { useState } from 'react';
import styles from '../Style/styles.module.css';
import PerfilInversionista from './PerfilInver';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [formularioActivo, setFormularioActivo] = useState<'login' | 'inversionista'>('login');

  const handleInversionistaClick = (e: React.FormEvent) => {
    e.preventDefault();
    setFormularioActivo('inversionista'); // Mostrar perfil
  };

  if (formularioActivo === 'inversionista') {
    return <PerfilInversionista />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <form onSubmit={handleInversionistaClick}>
        <label>Correo o Usuario:</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <label>Contraseña:</label>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;

