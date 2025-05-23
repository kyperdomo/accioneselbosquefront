/*import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import PerfilInversionista from './PerfilInver';
import Portafolio from './Portafolio';
import styles from '../Style/dashboard.module.css';

function Dashboard() {
  const [showPerfil, setShowPerfil] = useState(false);
  const navigate = useNavigate();

  // Contenido del Toolbar
  const leftToolbarContent = (
    <span className={styles.logo}>Acciones ElBosque</span>
  );

  const rightToolbarContent = (
    <Button
      label="Perfil"
      icon="pi pi-user"
      className={styles.profileButton}
      onClick={() => setShowPerfil(!showPerfil)}
    />
  );

  const handleComprarClick = () => {
    navigate('/ordeninvercompra'); // Navega a la ruta de orden de compra
  };

  const handleVenderClick = () => {
    navigate('/ordenventa'); // Navega a la ruta de orden de compra
  };

  const handlePortafolioClick = () => {
    navigate('/portafolio'); // Navega a la ruta de orden de compra
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Barra superior 
      <div className={styles.topNav}>
        <Toolbar
          left={leftToolbarContent}
          right={rightToolbarContent}
          className={styles.toolbar}
        />
      </div>

      {/* Contenido principal 
      <div className={styles.mainContent}>
        {/* Sidebar - Solo botón de portafolio 
        <div className={styles.leftPanel}>
          <Button
            label="Portafolio"
            icon="pi pi-briefcase"
            className={styles.portafolioButton}
            onClick={handlePortafolioClick}
          />
        </div>

        {/* Área derecha - Contenedor principal 
        <div className={styles.rightContent}>
          {!showPerfil && (
            <>
              {/* Contenedor vacío para gráfica/futuro contenido 
              <Card className={styles.chartContainer}>
                <div className={styles.emptyChart}>
                  {/* Espacio reservado para gráfica/contenido 
                </div>
              </Card>
              
              {/* Botones de acción - Parte derecha fuera del contenedor 
              <div className={styles.actionButtons}>
                <Button 
                  label="Comprar" 
                  icon="pi pi-arrow-up" 
                  className={styles.buyButton}
                  onClick={handleComprarClick}
                />
                <Button 
                  label="Vender" 
                  icon="pi pi-arrow-down" 
                  className={styles.sellButton}
                  onClick={handleVenderClick}
                />
              </div>
            </>
          )}

          {/* Perfil del inversionista 
          {showPerfil && (
            <Card className={styles.profileCard}>
              <PerfilInversionista />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;*/

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import PerfilInversionista from './PerfilInver';
import Portafolio from './Portafolio';
import styles from '../Style/dashboard.module.css';

function Dashboard() {
  const [showPerfil, setShowPerfil] = useState(false);
  const [showPortafolio, setShowPortafolio] = useState(false);
  const navigate = useNavigate();

  // Contenido del Toolbar
  const leftToolbarContent = (
    <span className={styles.logo}>Acciones ElBosque</span>
  );

  const rightToolbarContent = (
    <Button
      label="Perfil"
      icon="pi pi-user"
      className={styles.profileButton}
      onClick={() => {
        setShowPerfil(!showPerfil);
        setShowPortafolio(false); // Asegura que solo se muestre uno a la vez
      }}
    />
  );

  const handleComprarClick = () => {
    navigate('/ordeninvercompra');
  };

  const handleVenderClick = () => {
    navigate('/ordenventa');
  };

  const handlePortafolioClick = () => {
    setShowPortafolio(!showPortafolio);
    setShowPerfil(false); // Asegura que solo se muestre uno a la vez
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Barra superior */}
      <div className={styles.topNav}>
        <Toolbar
          left={leftToolbarContent}
          right={rightToolbarContent}
          className={styles.toolbar}
        />
      </div>

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        {/* Sidebar - Solo botón de portafolio */}
        <div className={styles.leftPanel}>
          <Button
            label="Portafolio"
            icon="pi pi-briefcase"
            className={styles.portafolioButton}
            onClick={handlePortafolioClick}
          />
        </div>

        {/* Área derecha - Contenedor principal */}
        <div className={styles.rightContent}>
          {!showPerfil && !showPortafolio && (
            <>
              {/* Contenedor vacío para gráfica/futuro contenido */}
              <Card className={styles.chartContainer}>
                <div className={styles.emptyChart}>
                  {/* Espacio reservado para gráfica/contenido */}
                </div>
              </Card>
              
              {/* Botones de acción - Parte derecha fuera del contenedor */}
              <div className={styles.actionButtons}>
                <Button 
                  label="Comprar" 
                  icon="pi pi-arrow-up" 
                  className={styles.buyButton}
                  onClick={handleComprarClick}
                />
                <Button 
                  label="Vender" 
                  icon="pi pi-arrow-down" 
                  className={styles.sellButton}
                  onClick={handleVenderClick}
                />
              </div>
            </>
          )}

          {/* Perfil del inversionista */}
          {showPerfil && (
            <Card className={styles.profileCard}>
              <PerfilInversionista />
            </Card>
          )}

          {/* Portafolio */}
          {showPortafolio && (
            <div className={styles.portafolioContent}>
              <Portafolio />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;