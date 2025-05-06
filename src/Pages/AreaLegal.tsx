/*import React from 'react';
import styles from '../Style/styles.module.css';

const AreaLegal = () => {
  return (
    <form className={styles.formulario}>

      <div className={styles.inputGroup}>
            <label className={styles.label}>NombreAL:</label>
            <input className={styles.input} type="text" name="nombre" />
      </div>
    
      <div className={styles.inputGroup}>
        <label className={styles.label}>CorreoAL:</label>
        <input className={styles.input} type="email" name="correo" />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>ContraseñaAL:</label>
        <input className={styles.input} type="password" name="contraseña" />
      </div>

      <button className={styles.button} type="submit">Registrar</button>
    </form>
  );
};

export default AreaLegal;*/


import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

const AreaLegal = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarPin, setMostrarPin] = useState(false);
  const [pin, setPin] = useState(['', '', '', '', '', '']);  // Array para los 6 dígitos del PIN
  const [isPinValid, setIsPinValid] = useState(true);

  // Manejadores de cambios
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);
  const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value);
  const handleContraseñaChange = (e: React.ChangeEvent<HTMLInputElement>) => setContraseña(e.target.value);

  // Cambiar el valor del PIN en el campo correspondiente
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPin = [...pin];
    newPin[index] = e.target.value.slice(0, 1);  // Solo tomar un carácter
    setPin(newPin);

    // Si el usuario ingresa un valor, mueve el enfoque al siguiente campo
    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // Función para verificar el PIN
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && correo && contraseña) {
      setMostrarPin(true);
    }
  };

  // Verificar que el PIN sea un número de 6 dígitos
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pinString = pin.join('');
    if (/^\d{6}$/.test(pinString)) {
      setIsPinValid(true);
      alert('PIN validado correctamente');
    } else {
      setIsPinValid(false);
    }
  };

  return (
    <div>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>NombreAL:</label>
          <input className={styles.input} type="text" name="nombre" value={nombre} onChange={handleNombreChange} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>CorreoAL:</label>
          <input className={styles.input} type="email" name="correo" value={correo} onChange={handleCorreoChange} />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>ContraseñaAL:</label>
          <input className={styles.input} type="password" name="contraseña" value={contraseña} onChange={handleContraseñaChange} />
        </div>

        <button className={styles.button} type="submit">Registrar</button>
      </form>

      
      {mostrarPin && (
  <div className={styles.pinContainer}>
    {/* Botón de cierre */}
    <button
      className={styles.closeButton}
      onClick={() => setMostrarPin(false)}
      type="button"
    >
      &times;
    </button>

    <form onSubmit={handlePinSubmit} className={styles.formulario}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Ingrese PIN (6 dígitos):</label>
        <div className={styles.pinInputs}>
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              className={`${styles.pinInput} ${!isPinValid ? styles.error : ''}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
      </div>
      <button className={styles.button} type="submit">Verificar PIN</button>
      {!isPinValid && <p className={styles.errorMessage}>El PIN debe ser de 6 dígitos.</p>}
    </form>
  </div>
)}

    </div>
  );
};

export default AreaLegal;
