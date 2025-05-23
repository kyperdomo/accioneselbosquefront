import React, { useState } from 'react';
import styles from '../Style/styles.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInversionistaClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      nickname: usuario,
      password: contraseña,
    };

    try {
      const response = await fetch('http://localhost:8080/api/inversionista/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        localStorage.setItem('nickname', usuario);

        // Obtener el perfil desde el backend
        const perfilResponse = await fetch(`http://localhost:8080/api/inversionista/perfil?nickname=${usuario}`);
        console.log('Nickname desde localStorage:', usuario);
        if (perfilResponse.ok) {
          const perfilData = await perfilResponse.json();
          localStorage.setItem('userProfile', JSON.stringify(perfilData));
        }

        setError('');
        navigate('/dashboard');
      } else if (response.status === 401) {
        setError('Contraseña incorrecta');
      } else if (response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error inesperado. Intenta más tarde.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al conectar con el servidor');
    }
  };

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