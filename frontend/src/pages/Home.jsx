import React from 'react';// Importa el componente Header
import '../components/sass/app.scss'; // Importa el archivo Sass
import Slider from '../components/slider.jsx';
import Body from '../components/body.jsx';
const Home = () => {
  return (
    <>
      <Slider />
      <Body   />
    </>
  );
};

export default Home;
