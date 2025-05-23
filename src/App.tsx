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
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
   <div className={styles.container}>
      <Routes>
      <Route path="/" element={<PagPrincipal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
        
      </Routes>
    </div>
  );
}

export default App;


//

