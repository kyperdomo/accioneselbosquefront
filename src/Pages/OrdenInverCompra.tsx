/*import React, { useState } from 'react';
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
      {/* Header con botones de mercado
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

      {/* Contenedor principal con formulario y gráfica 
      <div className={styles.mainContent}>
        {/* Formulario a la izquierda 
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

        {/* Gráfica a la derecha 
        <Card className={styles.chartContainer}>
          <div className={styles.chartPlaceholder}>
            <h3>Gráfica de Mercado</h3>
            {/* Aquí puedes integrar tu librería de gráficos (Chart.js, Highcharts, etc.) 
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OrdenCompra;*/

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import styles from '../Style/ordeninvercompra.module.css';
import OrdenMerCoNY from './OrdenMerCoNY';
import OrdenMerCoTk from './OrdenMerCoTk';
import OrdenMerCoNSA from './OrdenMerCoNSA';
import OrdenMerCoLd from './OrdenMerCoLd';

interface Company {
  name: string;
  code: string;
}

function OrdenCompra() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const mercados = [
    { id: 'NewYork', label: 'New York', component: <OrdenMerCoNY onCompanySelect={setSelectedCompany} /> },
    { id: 'NASDAQ', label: 'NASDAQ', component: <OrdenMerCoNSA onCompanySelect={setSelectedCompany} /> },
    { id: 'Londres', label: 'Londres', component: <OrdenMerCoLd onCompanySelect={setSelectedCompany} /> },
    { id: 'Tokyo', label: 'Tokyo', component: <OrdenMerCoTk onCompanySelect={setSelectedCompany} /> }
  ];

  useEffect(() => {
    if (!selectedCompany) {
      setChartData(null);
      return;
    }

    const fetchRealData = async () => {
      try {
        // IMPORTANTE: Reemplaza esto con tu llamada real al backend
        // Ejemplo:
        // const response = await fetch(`/api/stock-data/${selectedCompany.code}`);
        // const realData = await response.json();
        
        // Estructura esperada de la API:
        // realData = {
        //   dates: ['2023-01', '2023-02', ...],
        //   prices: [100.50, 102.75, ...]
        // }

        // Ejemplo de implementación REAL (descomenta y adapta):
        /*
        const response = await fetch(`/api/market-data/${selectedCompany.code}`);
        if (!response.ok) throw new Error('Error en la respuesta');
        const realData = await response.json();
        
        setChartData({
          labels: realData.dates,
          datasets: [
            {
              label: selectedCompany.name,
              data: realData.prices,
              borderColor: '#42A5F5',
              fill: false,
              tension: 0.4
            }
          ]
        });
        */
      } catch (error) {
        console.error("Error obteniendo datos del mercado:", error);
        setChartData(null);
      }
    };

    fetchRealData();
  }, [selectedCompany]);

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

      {/* Contenedor principal */}
      <div className={styles.mainContent}>
        {/* Formulario */}
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

        {/* Gráfica */}
        <Card className={styles.chartContainer}>
          <div className={styles.chartPlaceholder}>
            <h3>Gráfica de Mercado</h3>
            
            {selectedCompany ? (
              chartData ? (
                <Chart 
                  type="line"
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top'
                      }
                    },
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'Precio (USD)'
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Fecha'
                        }
                      }
                    }
                  }}
                  style={{ height: '100%' }}
                />
              ) : (
                <div className={styles.loadingMessage}>
                  <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }}></i>
                  <p>Obteniendo datos de {selectedCompany.name}...</p>
                </div>
              )
            ) : (
              <div className={styles.emptyMessage}>
                <i className="pi pi-chart-line" style={{ fontSize: '2rem' }}></i>
                <p>Seleccione una compañía para visualizar datos históricos</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OrdenCompra;

