import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import PagPrincipal from './Pages/PagPrincipal';
//import Login from './Pages/Login'; 
//import Registro from './Pages/Registro';
import OrdenInverCompra from './Pages/OrdenInverCompra';
import styles from './Style/styles.module.css';


function App() {
  return (
    <div className={styles.container}>
      <Routes>
      <Route path="/" element={<OrdenInverCompra />} />
        
        
      </Routes>
    </div>
  );
}

export default App;


//

//<Route path="/" element={<PagPrincipal />} />
  //      <Route path="/login" element={<Login />} />
    //    <Route path="/registro" element={<Registro />} />