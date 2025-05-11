import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import styles from '../Style/ordeninvercompra.module.css';
import OrdenMerCoNY from './OrdenMerCoNY';
import OrdenMerCoTk from './OrdenMerCoTk';
import OrdenMerCoNSA from './OrdenMerCoNSA';
import OrdenMerCoLd from './OrdenMerCoLd';

function OrdenCompra() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);

  const mercados = [
    { id: 'NewYork', label: 'New York', component: <OrdenMerCoNY /> },
    { id: 'NASDAQ', label: 'NASDAQ', component: <OrdenMerCoNSA /> },
    { id: 'Londres', label: 'Londres', component: <OrdenMerCoLd /> },
    { id: 'Tokyo', label: 'Tokyo', component: <OrdenMerCoTk /> }
  ];

  return (
    <div className={styles.containerRegistro}>
      {/* Header con botones de mercado */}
      <Card className={styles.topFrame}>
        <div className={styles.buttonGroup}>
          {mercados.map((mercado) => (
            <Button
              key={mercado.id}
              label={mercado.label}
              className={`${styles.marketButton} ${
                formularioActivo === mercado.id ? styles.activeButton : ''
              }`}
              onClick={() => setFormularioActivo(mercado.id)}
            />
          ))}
        </div>
      </Card>

      {/* Contenedor principal con formulario y gráfica */}
      <div className={styles.mainContent}>
        {/* Formulario a la izquierda */}
        <Card className={styles.formContainer}>
          {formularioActivo ? (
            mercados.find(m => m.id === formularioActivo)?.component
          ) : (
            <div className={styles.welcomeMessage}>
              <h2>Seleccione un mercado</h2>
              <p>Elija una bolsa de valores para realizar su orden</p>
            </div>
          )}
        </Card>

        {/* Gráfica a la derecha */}
        <Card className={styles.chartContainer}>
          <div className={styles.chartPlaceholder}>
            <h3>Gráfica de Mercado</h3>
            {/* Aquí puedes integrar tu librería de gráficos (Chart.js, Highcharts, etc.) */}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OrdenCompra;

