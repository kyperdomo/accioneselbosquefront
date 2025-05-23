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

interface OrdenVentaLdProps {
  onCompanySelect: (company: Company) => void;
}

const empresas: Company[] = [
  { name: 'Shell plc', code: 'SHEL' },
  { name: 'AstraZeneca plc', code: 'AZN' }
];

const OrdenVentaLd: React.FC<OrdenVentaLdProps> = ({ onCompanySelect }) => {
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
       const response = await fetch(`http://localhost:8080/api/precio/${e.value.code}`);
      if (!response.ok) throw new Error('Error al obtener precio');
      const { currentPrice } = await response.json();
      setPrecioUnitario(currentPrice);
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
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          symbol: empresaSeleccionada.code,
          shares: cantidad,
          price: precioUnitario
        }),
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
      <span>Nueva Orden de Venta - Londres</span>
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
          <label>Total a Vender (GBP):</label>
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

export default OrdenVentaLd;