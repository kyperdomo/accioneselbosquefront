import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

function Inversionista() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
    } else {
      setError('');
      alert('¡Registro exitoso!');
    }
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Nombre:</label>
        <input className={styles.input} type="text" name="nombre" />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Correo:</label>
        <input className={styles.input} type="email" name="correo" />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Usuario:</label>
        <input className={styles.input} type="text" name="nickname" />
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
        <select className={styles.select} name="comisionista">
          <option value="">Seleccione uno</option>
          <option value="comisionista1">Comisionista 1</option>
          <option value="comisionista2">Comisionista 2</option>
          <option value="comisionista3">Comisionista 3</option>
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit">Registrar</button>
    </form>
  );
}

export default Inversionista;
