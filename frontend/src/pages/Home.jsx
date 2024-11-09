import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import '../components/sass/app.scss'; // Importa el archivo Sass
import Slider from '../components/slider.jsx';
import Body from '../components/body.jsx';

const Home = () => {
  useEffect(() => {
    // Recupera los datos del localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Puedes agregar lógica para manejar estos valores (ej. validación, redirección, etc.)
    if (token && role) {
      console.log(`Token: ${token}, Role: ${role}`);
    }
  }, []); // [] asegura que se ejecute solo una vez al montar el componente

  return (
    <>
      <Slider />
      <Body />
    </>
  );
};

export default Home;
