import React from 'react';
import { Chart } from 'primereact/chart';

interface MarketChartProps {
  company: { name: string; code: string } | null;
  priceData?: { dates: string[]; prices: number[] }; // Datos REALES desde tu backend
}

const MarketChart: React.FC<MarketChartProps> = ({ company, priceData }) => {
  // Configuración base del gráfico (sin datos)
  const baseChartOptions = {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: 'Precio (USD)' }
      },
      x: {
        title: { display: true, text: 'Fecha' }
      }
    }
  };

  return (
    <div className="market-chart-container">
      <h3>Gráfica de Mercado</h3>
      
      {company && priceData ? (
        <Chart 
          type="line"
          data={{
            labels: priceData.dates,
            datasets: [{
              label: company.name,
              data: priceData.prices,
              borderColor: '#42A5F5',
              fill: false
            }]
          }}
          options={baseChartOptions}
        />
      ) : (
        <div className="no-data-message">
          {company 
            ? 'Cargando datos...' 
            : 'Seleccione una compañía para visualizar datos históricos'}
        </div>
      )}
    </div>
  );
};

export default MarketChart;