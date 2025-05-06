import React, { useState } from 'react';
import styles from '../Style/styles.module.css';
import OrdenMerCoNY from './OrdenMerCoNY';
import OrdenMerCoTk from './OrdenMerCoTk';
import OrdenMerCoNSA from './OrdenMerCoNSA';
import OrdenMerCoLd from './OrdenMerCoLd';

function OrdenCompra() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);

  const handleNewYorkClick = () => {
    setFormularioActivo('NewYork');
}
  const handleNASDAQClick = () => {
    setFormularioActivo('NASDAQ');
}
  const handleLondresClick = () => {
    setFormularioActivo('Londres');
}
  const handleTokyoClick = () => {
    setFormularioActivo('Tokyo');
}

  return (
    <div className={styles.containerRegistro}>
      <div className={styles.topFrame}>
        <button className={styles.button} onClick={handleNewYorkClick}>New York</button>
        <button className={styles.button} onClick={handleNASDAQClick}>NASDAQ</button>
        <button className={styles.button} onClick={handleLondresClick}>Londres</button>
        <button className={styles.button} onClick={handleTokyoClick}>Tokyo</button>
      </div>

      <div className={styles.bottomFrame}>
        {formularioActivo === 'NewYork' && <OrdenMerCoNY />}
        {formularioActivo === 'NASDAQ' && <OrdenMerCoNSA/>}
        {formularioActivo === 'Londres' && <OrdenMerCoLd/>}
        {formularioActivo === 'Tokyo' && <OrdenMerCoTk />}
      </div>
    </div>
  );
}

export default OrdenCompra;

