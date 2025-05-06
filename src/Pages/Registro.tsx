/*import React, { useState } from 'react';
import styles from '../Style/styles.module.css';
import Inversionista from './Inversionista'; 
import Comisionista from './Comisionista';

function Registro() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleInversionistaClick = () => {
    setMostrarFormulario(true);
  };

  const handleComisionistaClick = () => {
    setMostrarFormulario(true);
  };

  return (
    <div className={styles.containerRegistro}>
      <div className={styles.topFrame}>
        <button className={styles.button} onClick={handleInversionistaClick}>Inversionista</button>
        <button className={styles.button} onClick={handleComisionistaClick}>Comisionista</button>
        <button className={styles.button}>Área Legal</button>
        <button className={styles.button}>Administración</button>
      </div>

      <div className={styles.bottomFrame}>
        {mostrarFormulario && <Inversionista />}
      </div>
      <div className={styles.bottomFrame}>
        {mostrarFormulario && <Comisionista />}
      </div>
    </div>
  );
}

export default Registro;*/

import React, { useState } from 'react';
import styles from '../Style/styles.module.css';
import Inversionista from './Inversionista'; 
import Comisionista from './Comisionista';
import AreaLegal from './AreaLegal'; 
import Administracion from './Administracion';

function Registro() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);

  const handleInversionistaClick = () => {
    setFormularioActivo('inversionista');
  };

  const handleComisionistaClick = () => {
    setFormularioActivo('comisionista');
  };

  const handleAreaLegalClick = () => {
    setFormularioActivo('areaLegal');
  };

  const handleAdministracionClick = () => {
    setFormularioActivo('administracion');
  };

  return (
    <div className={styles.containerRegistro}>
      <div className={styles.topFrame}>
        <button className={styles.button} onClick={handleInversionistaClick}>Inversionista</button>
        <button className={styles.button} onClick={handleComisionistaClick}>Comisionista</button>
        <button className={styles.button} onClick={handleAreaLegalClick}>Área Legal</button>
        <button className={styles.button} onClick={handleAdministracionClick}>Administración</button>
      </div>

      <div className={styles.bottomFrame}>
        {formularioActivo === 'inversionista' && <Inversionista />}
        {formularioActivo === 'comisionista' && <Comisionista />}
        {formularioActivo === 'areaLegal' && <AreaLegal />}
        {formularioActivo === 'administracion' && <Administracion />}


      </div>
    </div>
  );
}

export default Registro;





