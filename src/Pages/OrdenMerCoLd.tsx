import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import styles from '../Style/ordenmercomNY.module.css';

const empresas = [
  { name: 'Shell plc', code: 'SHEL' },
  { name: 'Unilever plc', code: 'ULVR' },
  { name: 'AstraZeneca plc', code: 'AZN' },
  { name: 'HSBC Holdings plc', code: 'HSBA' },
  { name: 'Diageo plc', code: 'DGE' }
];

const OrdenMerCoLd = () => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(empresas[0]);
  const [cantidad, setCantidad] = useState<number>(0);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [precioTotal, setPrecioTotal] = useState<number>(0);

  const calcularTotal = () => {
    const total = cantidad * precioUnitario;
    setPrecioTotal(Number(total.toFixed(2)));
  };

  const enviarOrden = async () => {
    if (cantidad <= 0) return;
    
    const ordenData = {
      empresa: empresaSeleccionada.code,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      total: precioTotal
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
        alert('Hubo un error al enviar la orden');
      }
    } catch (error) {
      console.error('Error al enviar la orden:', error);
    }
  };

  const header = (
    <div className={styles.cardHeader}>
      <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      <span>Nueva Orden de Compra - Londres</span>
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
        <label>Precio por acción (GBP):</label>
        <div className={styles.valueDisplay}>
          £{precioUnitario.toFixed(2)}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Total a pagar (GBP):</label>
        <div className={styles.valueDisplay}>
          £{precioTotal.toFixed(2)}
        </div>
      </div>

      <div className={styles.botones}>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          className={styles.confirmButton}
          onClick={enviarOrden}
          disabled={cantidad <= 0}
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

export default OrdenMerCoLd;