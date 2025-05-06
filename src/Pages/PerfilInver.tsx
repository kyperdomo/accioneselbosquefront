/*import React from 'react';
import styles from '../Style/styles.module.css';

const PerfilInversionista = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Perfil del Inversionista</h2>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Tipo de Inversor:</strong> Moderado</p>
        <p><strong>Preferencias:</strong> Acciones, Bonos, Fondos Mutuos</p>
        <p><strong>Nivel de riesgo:</strong> Medio</p>
        <p><strong>Experiencia:</strong> 3 años en mercados financieros</p>
      </div>
    </div>
  );
};

export default PerfilInversionista;*/

import React from 'react';
import styles from '../Style/styles.module.css';

const ordenes = [
  { id: 1, tipo: 'Compra', estado: 'Pendiente' },
  { id: 2, tipo: 'Venta', estado: 'En ejecución' },
  { id: 3, tipo: 'Compra', estado: 'Cancelada' },
];

const PerfilInversionista = () => {
  return (
    <div className={styles.perfilContainer}>
      <div className={styles.header}>
        <img
          //src="https://via.placeholder.com/80"
          alt="Usuario"
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <h2>Juan Pérez</h2>
          <p className={styles.riesgo}>Inversor Moderado | Riesgo Medio</p>
        </div>
      </div>

      <div className={styles.seccion}>
        <h3>Preferencias</h3>
        <p>Acciones, Bonos, Fondos Mutuos</p>
        <p>Experiencia: 3 años en mercados financieros</p>
      </div>

      <div className={styles.seccion}>
        <h3>Órdenes recientes</h3>
        <ul className={styles.listaOrdenes}>
          {ordenes.map((orden) => (
            <li key={orden.id} className={`${styles.orden} ${styles[orden.estado.toLowerCase()]}`}>
              {orden.tipo} - <span>{orden.estado}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerfilInversionista;

