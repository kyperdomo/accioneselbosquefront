import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import styles from '../Style/ordenmercomNY.module.css';

const empresas = [
  { name: 'Microsoft Corporation', code: 'MSFT' },
  { name: 'Alphabet Inc.', code: 'GOOGL' },
  { name: 'NVIDIA Corporation', code: 'NVDA' },
  { name: 'Meta Platforms Inc.', code: 'META' },
  { name: 'PepsiCo Inc.', code: 'PEP' }
];

const OrdenMerCoNSA = () => {
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
      <span>Nueva Orden de Compra - NASDAQ</span>
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
        <label>Precio por acción (USD):</label>
        <div className={styles.valueDisplay}>
          ${precioUnitario.toFixed(2)}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Total a pagar (USD):</label>
        <div className={styles.valueDisplay}>
          ${precioTotal.toFixed(2)}
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

export default OrdenMerCoNSA;
