import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Style/styles.module.css';
import fondo from '../images/fondo_principal.jpg'; 

function PagPrincipal() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegistroClick = () => {
    navigate('/registro');
  };

  return (
    <div
      className={styles.fondoConImagen}
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Bienvenido a Acciones ElBosque</h1>
        <h2 className={styles.subtitle}>Ingrese en su campo correspondiente</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={handleLoginClick}>Iniciar Sesión</button>
          <button className={styles.button} onClick={handleRegistroClick}>Registrarse</button>        </div>
      </div>
    </div>
  );
}

export default PagPrincipal;


