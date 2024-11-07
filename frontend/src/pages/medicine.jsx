
import React, { useState } from 'react';
import '../components/sass/Medicine.scss'; // Importa el archivo CSS para estilos personalizados
import Aceta from '../assets/img/Aceta.png';
import MedicineInfo from './MedicineInfo'; // Importa el componente MedicineInfo

const App = () => {
  const [cantidad, setCantidad] = useState(1);
  const [showMedicineInfo, setShowMedicineInfo] = useState(false); // Estado para controlar la visibilidad de MedicineInfo
  const [productName, setProductName] = useState("ACETAMINOPHEN"); // Estado para almacenar el nombre del producto
//ADVIL - ACETAMINOPHEN - loratadine 
  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleCompra = () => {
    console.log(`Se compraron ${cantidad} unidades de ${productName}`);
  };

  const toggleMedicineInfo = () => {
    setShowMedicineInfo(!showMedicineInfo); // Cambia el estado de showMedicineInfo al hacer clic en el botón
  };

  return (
    <div className="page-container">
      <div className="Medicine">
        <div className="medicine-details">
          <img src={Aceta} alt="Acetaminofen" className="medicine-image" />
          <div className="medicine-info">
            <h1 className="centered-header">{productName}</h1>
            <p className="centered-paragraph">{productName}</p>
            <p className="centered-paragraph">Referencia: 116566</p>
            <p className="centered-paragraph">Incluye 0% de impuestos</p>
            <p className="centered-paragraph">Registro Sanitario: 2021M-0009447-R1</p>
            <p className="centered-paragraph">100 unidades</p>
            <p className="centered-paragraph orange-text">$2.000</p>
            <p className="centered-paragraph">
              Cantidad: 
              <button className='button12' onClick={aumentarCantidad}>+</button> 
              <span>{cantidad}</span> 
              <button className="button12" onClick={disminuirCantidad}>-</button>
              <button className="buy-button" onClick={handleCompra}>Comprar</button>
            </p>
            <button className="ver-mas" onClick={toggleMedicineInfo}>Ver más</button>
          </div>
        </div>
      </div>
      {showMedicineInfo && (
        <div className="medicine-info-bottom">
          <MedicineInfo productName={productName} />
        </div>
      )}
    </div>
  );
}

export default App;
