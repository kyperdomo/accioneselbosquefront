import React, { useState } from 'react';
import styles from '../Style/styles.module.css';

const empresas = ['Shell plc', 'Unilever plc', 'AstraZeneca plc', 'HSBC Holdings plc', 'Diageo plc'];

const OrdenMerCoNY = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresas[0]);
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [precioTotal, setPrecioTotal] = useState('');

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmpresaSeleccionada(e.target.value);
  };

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(e.target.value);
    // Aquí calculamos el total basado en la cantidad y el precio unitario
    if (precioUnitario && !isNaN(Number(e.target.value))) {
      setPrecioTotal((Number(e.target.value) * Number(precioUnitario)).toFixed(2));
    }
  };

  const enviarOrden = async () => {
    const ordenData = {
      estado: empresaSeleccionada,
      cantidadAcciones: parseInt(cantidad),
    };

    try {
      const response = await fetch('http://localhost:8080/api/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenData),
      });

      if (response.ok) {
        alert('Orden enviada con éxito');
      } else {
        alert('Hubo un error, intente mas tarde');
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
    }
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
        <button className={styles.button} onClick={enviarOrden}>Confirmar</button>
        <button className={styles.buttonSecundario}>Cancelar</button>
      </div>
    </div>
  );
};

export default OrdenMerCoNY;
