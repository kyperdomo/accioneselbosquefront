/*import React from 'react';
import styles from '../Style/styles.module.css';

const ordenes = [
  { id: 1, tipo: 'Compra', estado: 'Pendiente' },
  { id: 2, tipo: 'Venta', estado: 'En ejecución' },
  { id: 3, tipo: 'Compra', estado: 'Cancelada' },
];

const PerfilInversionista = () => {
  return (
    <div className={styles.perfilContainer}>
      <div className={styles.header}>
        <img
          //src="https://via.placeholder.com/80"
          alt="Usuario"
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <h2>Juan Pérez</h2>
          <p className={styles.riesgo}>Inversor Moderado | Riesgo Medio</p>
        </div>
      </div>

      <div className={styles.seccion}>
        <h3>Preferencias</h3>
        <p>Acciones, Bonos, Fondos Mutuos</p>
        <p>Experiencia: 3 años en mercados financieros</p>
      </div>

      <div className={styles.seccion}>
        <h3>Órdenes recientes</h3>
        <ul className={styles.listaOrdenes}>
          {ordenes.map((orden) => (
            <li key={orden.id} className={`${styles.orden} ${styles[orden.estado.toLowerCase()]}`}>
              {orden.tipo} - <span>{orden.estado}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PerfilInversionista;*/

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import styles from '../Style/perfilinver.module.css';

const PerfilInversionista = () => {
  // Datos del usuario (vacíos)
  const [userData, setUserData] = useState({
    nombre: '',
    numero: '',
    correo: '',
    rol: ''
  });

  // Órdenes recientes (vacías)
  const ordenes = [
    { id: 1, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
    { id: 2, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
    { id: 3, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
  ];

  // Estado para el diálogo de edición
  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  const getSeverity = (estado: string) => {
    switch(estado) {
      case 'Pendiente': return 'warning';
      case 'En ejecución': return 'info';
      case 'Cancelada': return 'danger';
      default: return null;
    }
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setVisible(false);
  };

  const footer = (
    <div className={styles.dialogFooter}>
      <Button 
        label="Cancelar" 
        icon="pi pi-times" 
        onClick={() => setVisible(false)} 
        className={styles.cancelButton}
      />
      <Button 
        label="Guardar Cambios" 
        icon="pi pi-check" 
        onClick={handleSave} 
        className={styles.saveButton}
      />
    </div>
  );

  return (
    <div className={styles.perfilContainer}>
      {/* Título principal */}
      <div className={styles.mainTitle}>
        <h1>Tu Perfil</h1>
        <div className={styles.titleDivider}></div>
      </div>

      {/* Header del perfil */}
      <Card className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.userInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Nombre:</span>
              <span className={styles.infoValue}>{userData.nombre || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Teléfono:</span>
              <span className={styles.infoValue}>{userData.numero || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Correo:</span>
              <span className={styles.infoValue}>{userData.correo || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Rol:</span>
              {userData.rol ? (
                <Tag value={userData.rol} severity="info" className={styles.roleTag} />
              ) : (
                <span className={styles.infoValue}>-</span>
              )}
            </div>
          </div>
          <Button 
            label="Editar Perfil" 
            icon="pi pi-pencil" 
            className={styles.editButton}
            onClick={() => {
              setEditData({ ...userData });
              setVisible(true);
            }}
          />
        </div>
      </Card>

      {/* Título de órdenes */}
      <div className={styles.sectionTitle}>
        <h2>Órdenes Recientes</h2>
        <div className={styles.titleDivider}></div>
      </div>

      {/* Sección de órdenes */}
      <Card className={styles.sectionCard}>
        <div className={styles.ordersTable}>
          <div className={styles.tableHeader}>
            <span>Tipo</span>
            <span>Activo</span>
            <span>Cantidad</span>
            <span>Precio</span>
            <span>Estado</span>
          </div>
          {ordenes.map((orden) => (
            <div key={orden.id} className={styles.orderRow}>
              <span>{orden.tipo || '-'}</span>
              <span className={styles.asset}>{orden.activo || '-'}</span>
              <span>{orden.cantidad || '-'}</span>
              <span>{orden.precio ? `$${orden.precio}` : '-'}</span>
              <span>{orden.estado || '-'}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Diálogo de edición */}
      <Dialog 
        header="Editar Perfil" 
        visible={visible} 
        style={{ width: '50vw' }} 
        onHide={() => setVisible(false)}
        footer={footer}
        className={styles.editDialog}
        contentClassName={styles.dialogContent}
        headerClassName={styles.dialogHeader}
      >
        <div className={styles.editFormContainer}>
          <div className={styles.editForm}>
            <div className={styles.formField}>
              <label htmlFor="nombre" className={styles.formLabel}>Nombre</label>
              <InputText 
                id="nombre" 
                value={editData.nombre} 
                onChange={(e) => setEditData({...editData, nombre: e.target.value})} 
                className={styles.formInput}
                placeholder="Ingrese su nombre"
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="numero" className={styles.formLabel}>Teléfono</label>
              <InputText 
                id="numero" 
                value={editData.numero} 
                onChange={(e) => setEditData({...editData, numero: e.target.value})} 
                className={styles.formInput}
                placeholder="Ingrese su teléfono"
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="correo" className={styles.formLabel}>Correo</label>
              <InputText 
                id="correo" 
                value={editData.correo} 
                onChange={(e) => setEditData({...editData, correo: e.target.value})} 
                className={styles.formInput}
                placeholder="Ingrese su correo"
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="rol" className={styles.formLabel}>Rol</label>
              <InputText 
                id="rol" 
                value={editData.rol} 
                onChange={(e) => setEditData({...editData, rol: e.target.value})} 
                className={styles.formInput}
                placeholder="Ingrese su rol"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PerfilInversionista;
