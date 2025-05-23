/*import React, { useState } from 'react';
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
        alert('Orden entegada con éxito');
      } else {
        alert('Hubo un error, intente mas tarde');
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

export default OrdenMerCoLd;*/

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import styles from '../Style/ordenmercomNY.module.css';

interface Company {
  name: string;
  code: string;
}

interface OrdenMerCoLdProps {
  onCompanySelect: (company: Company) => void;
}

const empresas: Company[] = [
  { name: 'Shell plc', code: 'SHEL' },
  { name: 'Unilever plc', code: 'ULVR' },
  { name: 'AstraZeneca plc', code: 'AZN' },
  { name: 'HSBC Holdings plc', code: 'HSBA' },
  { name: 'Diageo plc', code: 'DGE' }
];

const OrdenMerCoLd: React.FC<OrdenMerCoLdProps> = ({ onCompanySelect }) => {
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<Company>(empresas[0]);
  const [cantidad, setCantidad] = useState<number>(0);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = React.useRef<Toast>(null);

  // Obtener precio real al seleccionar empresa
  const handleCompanyChange = async (e: { value: Company }) => {
    setEmpresaSeleccionada(e.value);
    setLoadingPrice(true);
    onCompanySelect(e.value);

    try {
      // DESCOMENTA Y REEMPLAZA CON TU LLAMADA REAL AL BACKEND:
      /*
      const response = await fetch(`/api/london-stock-price/${e.value.code}`);
      if (!response.ok) throw new Error('Error al obtener precio');
      const { currentPrice } = await response.json();
      setPrecioUnitario(currentPrice);
      */
    } catch (error) {
      console.error("Error obteniendo precio:", error);
      setPrecioUnitario(0);
      showError("Error al obtener el precio actual");
    } finally {
      setLoadingPrice(false);
    }
  };

  // Calcular total automáticamente
  useEffect(() => {
    setPrecioTotal(Number((cantidad * precioUnitario).toFixed(2)));
  }, [cantidad, precioUnitario]);

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 5000
    });
  };

  const enviarOrden = async () => {
    if (cantidad <= 0 || precioUnitario <= 0) {
      showError('Cantidad y precio deben ser mayores a cero');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const ordenData = {
        mercado: 'LONDON',
        simbolo: empresaSeleccionada.code,
        cantidad: cantidad,
        precioUnitario: precioUnitario,
        total: precioTotal,
        moneda: 'GBP'
      };

      const response = await fetch('http://localhost:8080/api/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Market': 'LSE' // London Stock Exchange
        },
        body: JSON.stringify(ordenData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      showSuccess('Orden ejecutada correctamente');
      // Resetear formulario después de éxito
      setCantidad(0);
      setPrecioTotal(0);
    } catch (error) {
      console.error('Error al enviar la orden:', error);
      showError('Error al procesar la orden. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const header = (
    <div className={styles.cardHeader}>
      <i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i>
      <span>Nueva Orden de Compra - Londres</span>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Precio por acción (GBP):</label>
          <div className={styles.valueDisplay}>
            {loadingPrice ? (
              <i className="pi pi-spinner pi-spin" style={{ fontSize: '1rem' }}></i>
            ) : precioUnitario > 0 ? (
              `£${precioUnitario.toFixed(2)}`
            ) : (
              '---'
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Total a pagar (GBP):</label>
          <div className={styles.valueDisplay}>
            {precioTotal > 0 ? `£${precioTotal.toFixed(2)}` : '---'}
          </div>
        </div>

        <div className={styles.botones}>
          <Button
            label="Confirmar"
            icon="pi pi-check"
            className={styles.confirmButton}
            onClick={enviarOrden}
            disabled={cantidad <= 0 || precioUnitario <= 0 || isSubmitting}
            loading={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
      </Card>
    </>
  );
};

export default OrdenMerCoLd;