import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import styles from '../Style/Portafolio.module.css';

interface Accion {
  id: number;
  empresa: string;
  cantidad: number;
  valor: number;
  fecha: string;
  tipo: 'compra' | 'venta';
}

const Portafolio = () => {
  const [acciones, setAcciones] = useState<Accion[]>([]);
  const [saldoDisponible, setSaldoDisponible] = useState<number>(0);
  const [accionesActuales, setAccionesActuales] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Reemplaza con tus llamadas API reales
        const accionesResponse = await fetch('tu-api/acciones');
        const resumenResponse = await fetch('tu-api/resumen');
        
        if (accionesResponse.ok) {
          const accionesData = await accionesResponse.json();
          setAcciones(accionesData);
        }
        
        if (resumenResponse.ok) {
          const resumenData = await resumenResponse.json();
          setSaldoDisponible(resumenData.saldoDisponible || 0);
          setAccionesActuales(resumenData.accionesActuales || 0);
        }
        
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar acciones compradas y vendidas
  const accionesCompradas = acciones.filter(accion => accion.tipo === 'compra');
  const accionesVendidas = acciones.filter(accion => accion.tipo === 'venta');

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const comprasFooter = `Total compras: ${formatCurrency(
    accionesCompradas.reduce((sum, accion) => sum + (accion.valor * accion.cantidad), 0)
  )}`;

  const ventasFooter = `Total ventas: ${formatCurrency(
    accionesVendidas.reduce((sum, accion) => sum + (accion.valor * accion.cantidad), 0)
  )}`;

  return (
    <div className={styles.portafolioContainer}>
      {/* Resumen de cuenta - SIMPLE Y LIMPIO COMO LO PEDISTE */}
      <div className={styles.resumenSimple}>
        <div className={styles.resumenItem}>
          <span>Saldo disponible: </span>
          <strong>{formatCurrency(saldoDisponible)}</strong>
        </div>
        <div className={styles.resumenItem}>
          <span>Acciones actuales: </span>
          <strong>{accionesActuales}</strong>
        </div>
      </div>

      {/* TABLAS EXISTENTES (MANTENIENDO TU ESTILO ACTUAL) */}
      <Card title="Mi Portafolio de Inversiones" className={styles.portafolioCard}>
        <TabView>
          <TabPanel header="Acciones Compradas" leftIcon="pi pi-shopping-cart mr-2">
            <DataTable
              value={accionesCompradas}
              loading={loading}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} acciones"
              footer={comprasFooter}
              className={styles.dataTable}
              emptyMessage="No hay acciones compradas registradas"
            >
              <Column field="empresa" header="Empresa" sortable />
              <Column field="cantidad" header="Cantidad" sortable />
              <Column
                field="valor"
                header="Valor Unitario"
                body={(rowData) => formatCurrency(rowData.valor)}
                sortable
              />
              <Column
                header="Valor Total"
                body={(rowData) => formatCurrency(rowData.valor * rowData.cantidad)}
                sortable
              />
              <Column field="fecha" header="Fecha" sortable />
            </DataTable>
          </TabPanel>

          <TabPanel header="Acciones Vendidas" leftIcon="pi pi-money-bill mr-2">
            <DataTable
              value={accionesVendidas}
              loading={loading}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} acciones"
              footer={ventasFooter}
              className={styles.dataTable}
              emptyMessage="No hay acciones vendidas registradas"
            >
              <Column field="empresa" header="Empresa" sortable />
              <Column field="cantidad" header="Cantidad" sortable />
              <Column 
                field="valor" 
                header="Valor Unitario" 
                body={(rowData) => formatCurrency(rowData.valor)}
                sortable 
              />
              <Column 
                header="Valor Total" 
                body={(rowData) => formatCurrency(rowData.valor * rowData.cantidad)}
                sortable 
              />
              <Column field="fecha" header="Fecha" sortable />
            </DataTable>
          </TabPanel>
        </TabView>
      </Card>
    </div>
  );
};

export default Portafolio;