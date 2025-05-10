import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import Inversionista from './Inversionista';
import Comisionista from './Comisionista';
import AreaLegal from './AreaLegal';
import Administracion from './Administracion';
import styles from '../Style/registro.module.css';

function Registro() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);

  const handleOptionClick = (formulario: string) => {
    setFormularioActivo(formulario);
  };

  return (
    <div className={styles.registroBackground}>
      <div className={styles.registroCenterContainer}>
        <Card className={styles.registroCard}>
          <div className={styles.registroContent}>
            <h1 className={styles.registroTitle}>Registro de Usuario</h1>
            
            <div className={styles.registroOptions}>
              <Button 
                label="Inversionista" 
                className={`${styles.registroButton} ${formularioActivo === 'inversionista' ? styles.activeButton : ''}`}
                onClick={() => handleOptionClick('inversionista')}
              />
              <Button 
                label="Comisionista" 
                className={`${styles.registroButton} ${formularioActivo === 'comisionista' ? styles.activeButton : ''}`}
                onClick={() => handleOptionClick('comisionista')}
              />
              <Button 
                label="Área Legal" 
                className={`${styles.registroButton} ${formularioActivo === 'areaLegal' ? styles.activeButton : ''}`}
                onClick={() => handleOptionClick('areaLegal')}
              />
              <Button 
                label="Administración" 
                className={`${styles.registroButton} ${formularioActivo === 'administracion' ? styles.activeButton : ''}`}
                onClick={() => handleOptionClick('administracion')}
              />
            </div>

            <div className={styles.registroFormContainer}>
              {formularioActivo === 'inversionista' && <Inversionista />}
              {formularioActivo === 'comisionista' && <Comisionista />}
              {formularioActivo === 'areaLegal' && <AreaLegal />}
              {formularioActivo === 'administracion' && <Administracion />}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Registro;





