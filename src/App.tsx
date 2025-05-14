import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PagPrincipal from './Pages/PagPrincipal';
import Login from './Pages/Login'; 
import Registro from './Pages/Registro';
import OrdenInverCompra from './Pages/OrdenInverCompra';
import OrdenVenta from './Pages/OrdenVenta';
import StockChart from './Pages/grafica';
import Dashboard from './Pages/Dashboard';
import Portafolio from './Pages/Portafolio';


import styles from './Style/styles.module.css';


function App() {
  return (
    <div className={styles.container}>
      <Routes>
      <Route path="/" element={<PagPrincipal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/ordeninvercompra" element={<OrdenInverCompra />} />
      <Route path="/ordenventa" element={<OrdenVenta />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/portafolio" element={<Portafolio />} />
      <Route path="/grafica" element={<StockChart symbol="TSLA" apiKey="d0e1adhr01qv1dmkdp50d0e1adhr01qv1dmkdp5g" />} />

      
        
        
      </Routes>
    </div>
  );
}

export default App;


//

