import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

const empresas = ['Amazon', 'Apple', 'Tesla', 'General Electric Co.', 'The Coca-Cola Company'];

const OrdenMerCoNY = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresas[0]);
  const [cantidad, setCantidad] = useState('');

  const [precioUnitario, setPrecioUnitario] = useState('');
  const [precioTotal, setPrecioTotal] = useState('');

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmpresaSeleccionada(e.target.value);
    // Lógica futura: pedir precio al back
  };

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(e.target.value);
    // Lógica futura: calcular total con back
  };

  return (
    <div className={styles.ordenContainer}>
      <h2>Crear Orden de Compra</h2>

      <div className={styles.inputGroup}>
        <label>Empresa:</label>
        <select value={empresaSeleccionada} onChange={handleEmpresaChange}>
          {empresas.map((empresa) => (
            <option key={empresa} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label>Cantidad de acciones:</label>
        <input
          type="number"
          min="0"
          value={cantidad}
          onChange={handleCantidadChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Precio por acción:</label>
        <input type="text" value={precioUnitario} readOnly />
      </div>

      <div className={styles.inputGroup}>
        <label>Total a pagar:</label>
        <input type="text" value={precioTotal} readOnly />
      </div>

      <div className={styles.botones}>
        <button className={styles.button}>Confirmar</button>
        <button className={styles.buttonSecundario}>Cancelar</button>
      </div>
    </div>
  );
};

export default OrdenMerCoNY;
