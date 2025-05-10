/*import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import PerfilInversionista from './PerfilInver';
import styles from '../Style/dashboard.module.css';

function Dashboard() {
  const [formularioActivo, setFormularioActivo] = useState<string | null>(null);

  const handlePerfilClick = () => {
    setFormularioActivo('inversionista');
  };

  // Elementos de la barra de herramientas (toolbar)
  const leftContents = (
    <span className={styles.logo}>Acciones ElBosque</span>
  );

  const rightContents = (
    <Button 
      label="Perfil" 
      icon="pi pi-user" 
      className={styles.profileButton}
      onClick={handlePerfilClick}
    />
  );

  return (
    <div className={styles.dashboardContainer}>
      
      <div className={styles.topNav}>
        <Toolbar 
          left={leftContents} 
          right={rightContents}
          className={styles.toolbar}
        />
      </div>

      
      <div className={styles.mainContent}>
        {formularioActivo === 'inversionista' && <PerfilInversionista />}
      </div>
    </div>
  );
}

export default Dashboard;*/

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Card } from 'primereact/card';
import PerfilInversionista from './PerfilInver';
import styles from '../Style/dashboard.module.css';

function Dashboard() {
  const [showPerfil, setShowPerfil] = useState(false);
  const [showPortafolio, setShowPortafolio] = useState(false);

  const handlePerfilClick = () => {
    setShowPerfil(!showPerfil);
    setShowPortafolio(false);
  };

  const handlePortafolioClick = () => {
    setShowPortafolio(!showPortafolio);
    setShowPerfil(false);
  };

  // Elementos de la barra de herramientas
  const leftContents = (
    <span className={styles.logo}>MiDashboard</span>
  );

  const rightContents = (
    <Button 
      label="Perfil" 
      icon="pi pi-user" 
      className={styles.profileButton}
      onClick={handlePerfilClick}
    />
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* Barra de navegación superior */}
      <div className={styles.topNav}>
        <Toolbar 
          left={leftContents} 
          right={rightContents}
          className={styles.toolbar}
        />
      </div>

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        {/* Contenedor izquierdo (contenido principal) */}
        <div className={styles.leftContent}>
          {showPerfil && <PerfilInversionista />}
        </div>

        {/* Contenedor derecho (portafolio) */}
        <div className={styles.rightPanel}>
          <Button 
            label="Portafolio" 
            icon="pi pi-briefcase" 
            className={styles.portafolioButton}
            onClick={handlePortafolioClick}
          />
          
          {showPortafolio && (
            <Card className={styles.portafolioCard}>
              <h3>Contenido del Portafolio</h3>
              <p>Aquí iría la información de tus inversiones...</p>
              {/* Agrega más contenido del portafolio aquí */}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;