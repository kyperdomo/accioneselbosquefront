import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import styles from '../Style/perfilinver.module.css';

const PerfilInversionista = () => {
  const [userData, setUserData] = useState({
    name: '',
    nickname: '',
    correo: '',
    rol: 'Inversionista'
  });

  const [ordenes] = useState([
    { id: 1, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
    { id: 2, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
    { id: 3, tipo: '', estado: '', activo: '', cantidad: '', precio: '' },
  ]);

  const [visible, setVisible] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  useEffect(() => {
  const nicknames = localStorage.getItem('nickname');
  console.log('Nickname desde localStorage:', nicknames);
  if (nicknames) {
    fetch(`http://localhost:8080/api/inversionista/perfil?nickname=${nicknames}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener el perfil');
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setEditData(data);
        localStorage.setItem('userProfile', JSON.stringify(data)); // opcional
      })
      .catch((err) => {
        console.error(err);
      });
  }
}, []);


  const getSeverity = (estado: string) => {
    switch (estado) {
      case 'Pendiente': return 'warning';
      case 'En ejecución': return 'info';
      case 'Cancelada': return 'danger';
      default: return null;
    }
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setVisible(false);
    localStorage.setItem('userProfile', JSON.stringify(editData));
  };

  const footer = (
    <div className={styles.dialogFooter}>
      <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className={styles.cancelButton} />
      <Button label="Guardar Cambios" icon="pi pi-check" onClick={handleSave} className={styles.saveButton} />
    </div>
  );

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.mainTitle}>
        <h1>Tu Perfil</h1>
        <div className={styles.titleDivider}></div>
      </div>

      <Card className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.userInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Nombre:</span>
              <span className={styles.infoValue}>{userData.name || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Nickname:</span>
              <span className={styles.infoValue}>{userData.nickname || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Correo:</span>
              <span className={styles.infoValue}>{userData.correo || '-'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Rol:</span>
              <span className={styles.infoValue}>Inversionista</span>
            </div>
          </div>
          <Button label="Editar Perfil" icon="pi pi-pencil" className={styles.editButton}
            onClick={() => {
              setEditData({ ...userData });
              setVisible(true);
            }}
          />
        </div>
      </Card>

      <div className={styles.sectionTitle}>
        <h2>Órdenes Recientes</h2>
        <div className={styles.titleDivider}></div>
      </div>

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

      <Dialog header="Editar Perfil" visible={visible} style={{ width: '50vw' }}
        onHide={() => setVisible(false)} footer={footer}
        className={styles.editDialog} contentClassName={styles.dialogContent}
        headerClassName={styles.dialogHeader}
      >
        <div className={styles.editFormContainer}>
          <div className={styles.editForm}>
            {['nombre', 'numero', 'correo', 'rol'].map((field) => (
              <div className={styles.formField} key={field}>
                <label htmlFor={field} className={styles.formLabel}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <InputText
                  id={field}
                  value={editData[field as keyof typeof editData]}
                  onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                  className={styles.formInput}
                  placeholder={`Ingrese su ${field}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PerfilInversionista;