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
  const navigate = useNavigate();

  const handleInversionistaClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !contraseña) {
      setError('Por favor ingrese usuario y contraseña');
      return;
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



