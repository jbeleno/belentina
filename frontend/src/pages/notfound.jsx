import React from 'react';
import '../components/sass/app.scss'; // Importa el archivo CSS para estilos personalizados

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  );
}

export default NotFound;
