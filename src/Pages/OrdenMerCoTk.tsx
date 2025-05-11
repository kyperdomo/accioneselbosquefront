/*import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import styles from '../Style/ordenmercomNY.module.css';

const empresas = [
  { name: 'Toyota Motor Corporation', code: 'TM' },
  { name: 'Sony Group Corporation', code: 'SONY' },
  { name: 'Nintendo Co., Ltd.', code: 'NTDOY' },
  { name: 'Mitsubishi UFJ Financial Group', code: 'MUFG' },
  { name: 'Daikin Industries, Ltd.', code: 'DKILY' }
];

const OrdenMerCoTk = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresas[0]);
  const [cantidad, setCantidad] = useState<number>(0);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [precioTotal, setPrecioTotal] = useState<number>(0);

  const calcularTotal = () => {
    const total = cantidad * precioUnitario;
    setPrecioTotal(Number(total.toFixed(2)));
  };

  const handleConfirmar = () => {
    if (cantidad <= 0 || precioUnitario <= 0) return;
    console.log({
      empresa: empresaSeleccionada.code,
      cantidad,
      precioUnitario,
      total: precioTotal
    });
  };

  const header = (
    <div className={styles.cardHeader}>
      <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      <span>Nueva Orden de Compra - Tokyo</span>
    </div>
  );

  return (
    <Card header={header} className={styles.ordenContainer}>
      <div className={styles.inputGroup}>
        <label>Empresa:</label>
        <Dropdown
          value={empresaSeleccionada}
          options={empresas}
          onChange={(e) => setEmpresaSeleccionada(e.value)}
          optionLabel="name"
          placeholder="Seleccione una empresa"
          className={styles.dropdown}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Cantidad de acciones:</label>
        <InputNumber
          value={cantidad}
          onValueChange={(e) => {
            setCantidad(e.value as number);
            calcularTotal();
          }}
          mode="decimal"
          min={0}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Precio por acción (JPY):</label>
        <div className={styles.valueDisplay}>
          ¥{precioUnitario.toFixed(2)}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Total a pagar (JPY):</label>
        <div className={styles.valueDisplay}>
          ¥{precioTotal.toFixed(2)}
        </div>
      </div>

      <div className={styles.botones}>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          className={styles.confirmButton}
          onClick={handleConfirmar}
          disabled={cantidad <= 0 || precioUnitario <= 0}
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          className={styles.cancelButton}
          severity="secondary"
        />
      </div>
    </Card>
  );
};

export default OrdenMerCoTk;*/

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

interface OrdenMerCoTkProps {
  onCompanySelect: (company: Company) => void;
}

const empresas: Company[] = [
  { name: 'Toyota Motor Corporation', code: 'TM' },
  { name: 'Sony Group Corporation', code: 'SONY' },
  { name: 'Nintendo Co., Ltd.', code: 'NTDOY' },
  { name: 'Mitsubishi UFJ Financial Group', code: 'MUFG' },
  { name: 'Daikin Industries, Ltd.', code: 'DKILY' }
];

const OrdenMerCoTk: React.FC<OrdenMerCoTkProps> = ({ onCompanySelect }) => {
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
      // DESCOMENTA Y REEMPLAZA CON TU LLAMADA REAL AL BACKEND:
      /*
      const response = await fetch(`/api/tokyo-stock-price/${e.value.code}`);
      if (!response.ok) throw new Error('Error al obtener precio');
      const { currentPrice } = await response.json();
      setPrecioUnitario(currentPrice);
      */
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
      const response = await fetch('/api/tokyo-orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Market': 'Tokyo' 
        },
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
      <span>Nueva Orden de Compra - Tokyo</span>
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
        <label>Precio por acción (JPY):</label>
        <div className={styles.valueDisplay}>
          {loadingPrice ? (
            <i className="pi pi-spinner pi-spin" style={{ fontSize: '1rem' }}></i>
          ) : precioUnitario > 0 ? (
            `¥${precioUnitario.toFixed(2)}`
          ) : (
            '---'
          )}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Total a pagar (JPY):</label>
        <div className={styles.valueDisplay}>
          {precioTotal > 0 ? `¥${precioTotal.toFixed(2)}` : '---'}
        </div>
      </div>

      <div className={styles.botones}>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          className={styles.confirmButton}
          onClick={handleConfirmar}
          disabled={cantidad <= 0 || precioUnitario <= 0 || loadingPrice}
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

export default OrdenMerCoTk;