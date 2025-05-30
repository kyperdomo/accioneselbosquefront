import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import styles from '../Style/ordenmercomNY.module.css';

interface Company {
  name: string;
  code: string;
}

interface OrdenVentaNYProps {
  onCompanySelect: (company: Company) => void;
}

const empresas: Company[] = [
  { name: 'Amazon', code: 'AMZN' },
  { name: 'Apple', code: 'AAPL' },
  { name: 'Tesla', code: 'TSLA' },
  { name: 'General Electric Co.', code: 'GE' },
  { name: 'The Coca-Cola Company', code: 'KO' }
];

const OrdenVentaNY: React.FC<OrdenVentaNYProps> = ({ onCompanySelect }) => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Company>(empresas[0]);
  const [cantidad, setCantidad] = useState<number>(0);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);

  // Obtener precio real al seleccionar empresa
  const handleCompanyChange = async (e: { value: Company }) => {
    setEmpresaSeleccionada(e.value);
    setLoadingPrice(true);
    onCompanySelect(e.value);

     try {

      const response = await fetch(`http://localhost:8080/api/precio/${e.value.code}`);
      const { currentPrice } = await response.json();

      if (!response.ok) throw new Error('Error al obtener precio');
      setPrecioUnitario(currentPrice);

    } catch (error) {
      console.error("Error obteniendo precio:", error);
      setPrecioUnitario(0);
    } finally {
      setLoadingPrice(false);
    }
  };

  // Calcular total automáticamente
  useEffect(() => {
    setPrecioTotal(Number((cantidad * precioUnitario).toFixed(2)));
  }, [cantidad, precioUnitario]);

  const handleConfirmar = async () => {
    if (cantidad <= 0 || precioUnitario <= 0) return;
    
    // EJEMPLO DE LLAMADA REAL (descomenta y adapta):
    /*
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: empresaSeleccionada.code,
          shares: cantidad,
          price: precioUnitario
        })
      });
      if (!response.ok) throw new Error('Error al crear orden');
      // Manejar éxito
    } catch (error) {
      console.error("Error confirmando orden:", error);
    }
    */
  };

  const header = (
    <div className={styles.cardHeader}>
      <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      <span>Nueva Orden de Venta - NYSE</span>
    </div>
  );

  return (
    <Card header={header} className={styles.ordenContainer}>
      <div className={styles.inputGroup}>
        <label>Empresa:</label>
        <Dropdown
          value={empresaSeleccionada}
          options={empresas}
          onChange={handleCompanyChange}
          optionLabel="name"
          placeholder="Seleccione una empresa"
          className={styles.dropdown}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Cantidad de acciones:</label>
        <InputNumber
          value={cantidad}
          onValueChange={(e) => setCantidad(e.value as number)}
          mode="decimal"
          min={0}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Precio por acción (USD):</label>
        <div className={styles.valueDisplay}>
          {loadingPrice ? (
            <i className="pi pi-spinner pi-spin" style={{ fontSize: '1rem' }}></i>
          ) : precioUnitario > 0 ? (
            `$${precioUnitario.toFixed(2)}`
          ) : (
            '---'
          )}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Total a vender (USD):</label>
        <div className={styles.valueDisplay}>
          {precioTotal > 0 ? `$${precioTotal.toFixed(2)}` : '---'}
        </div>
      </div>

      <div className={styles.botones}>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          className={styles.confirmButton}
          onClick={handleConfirmar}
          disabled={cantidad <= 0 || precioUnitario <= 0}
          loading={loadingPrice}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          className={styles.cancelButton}
          severity="secondary"
          onClick={() => {
            setCantidad(0);
            setPrecioTotal(0);
          }}
        />
      </div>
    </Card>
  );
};

export default OrdenVentaNY;