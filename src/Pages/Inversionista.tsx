import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

function Inversionista() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [subscription, setSubscription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');

    const inversionistaData = {
      nickname: nickname,
      password: password,
      name: nombre,
      subscription: subscription,
      id_portafolio: 1 // Puedes cambiar este valor si lo deseas
    };

    try {
      const response = await fetch('http://localhost:8080/api/inversionista/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inversionistaData),
      });

      if (response.ok) {
        alert('¡Registro exitoso!');
      } else {
        alert('Error en el registro.');
      }
    } catch (error) {
      console.error('Error al registrar inversionista:', error);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nombre:</label>
        <input
          className={styles.input}
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Correo:</label>
        <input
          className={styles.input}
          type="email"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Usuario:</label>
        <input
          className={styles.input}
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Contraseña:</label>
        <input
          className={styles.input}
          type="password"
          name="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Confirmar Contraseña:</label>
        <input
          className={styles.input}
          type="password"
          name="confirmarContraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>¿Desea un comisionista?</label>
        <select
          className={styles.select}
          name="comisionista"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
        >
          <option value="">Seleccione uno</option>
          <option value="comisionista1">Comisionista 1</option>
          <option value="comisionista2">Comisionista 2</option>
          <option value="comisionista3">Comisionista 3</option>
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit">
        Registrar
      </button>
    </form>
  );
}

export default Inversionista;
