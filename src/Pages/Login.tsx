import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import styles from '../Style/login.module.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [formularioActivo, setFormularioActivo] = useState<'login' | 'inversionista'>('login');
  const navigate = useNavigate();

  const handleInversionistaClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !contraseña) {
      setError('Por favor ingrese usuario y contraseña');
      return;
    }

    const loginData = {
      nickname: usuario,
      password: contraseña,
    };

    try {
      const response = await fetch('http://localhost:8080/api/inversionista/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        setError('');
        setFormularioActivo('inversionista');
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
    
    // Guardar estado de autenticación
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redirigir al dashboard
    navigate('/dashboard');

  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginCenterContainer}>
        <Card className={styles.loginCard}>
          <div className={styles.loginContent}>
            <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
            
            <form onSubmit={handleInversionistaClick} className={styles.loginForm}>
              <div className={styles.loginField}>
                <label htmlFor="usuario" className={styles.inputLabel}>Correo o Usuario</label>
                <InputText
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className={styles.loginInput}
                />
              </div>

              <div className={styles.loginField}>
                <label htmlFor="contraseña" className={styles.inputLabel}>Contraseña</label>
                <Password
                  id="contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  feedback={false}
                  toggleMask
                  className={styles.loginInput}
                  inputClassName={styles.loginInput}
                />
              </div>

              {error && (
                <div className={styles.loginError}>
                  <Message severity="error" text={error} />
                </div>
              )}

              <Button 
                label="INICIAR SESIÓN" 
                type="submit" 
                className={styles.loginButton}
              />
            </form>

            <div className={styles.loginFooter}>
              <p>¿No tienes cuenta? <a href="#">Regístrate</a></p>
              <p><a href="#">¿Olvidaste tu contraseña?</a></p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;

