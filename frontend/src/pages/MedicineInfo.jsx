
import React, { useState, useEffect } from 'react';
import '../components/sass/MedicineInfo.scss'; // Importa el archivo Sass para los estilos

const MedicineInfo = ({ productName }) => {
  const [info, setInfo] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`https://api.fda.gov/drug/label.json?search=${encodeURIComponent(productName)}`);
        const data = await response.json();
        setInfo(data.results[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!info) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="MedicineInfo"> {/* Asigna la clase .MedicineInfo al contenedor principal */}
      <hr className="info-divider" /> {/* Línea gris */}
      <h2>Información sobre {productName} </h2>
      <p><strong>Nombre genérico:</strong> {info.openfda.generic_name ? info.openfda.generic_name[0] : 'No disponible'}</p>
      <p><strong>Nombre de marca:</strong> {info.openfda.brand_name ? info.openfda.brand_name[0] : 'No disponible'}</p>
      <p><strong>Indicaciones de uso:</strong> {info.indications_and_usage ? info.indications_and_usage[0] : 'No disponible'}</p>
      <p><strong>Contraindicaciones:</strong> {info.contraindications ? info.contraindications[0] : 'No disponible'}</p>
      <p><strong>Efectos secundarios:</strong> {info.adverse_reactions ? info.adverse_reactions[0] : 'No disponible'}</p>
      <p><strong>Instrucciones de dosificación:</strong> {info.dosage_and_administration ? info.dosage_and_administration[0] : 'No disponible'}</p>
      <p><strong>Información de etiquetado:</strong> {info.label ? info.label[0] : 'No disponible'}</p>
      {/* Puedes agregar más detalles según sea necesario */}
    </div>
  );
  
}
export default MedicineInfo;
