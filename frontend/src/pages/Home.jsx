import React from 'react';
import Header from '../components/header.jsx'; // Importa el componente Header
import '../components/sass/app.scss'; // Importa el archivo Sass
import Footer from '../components/footer.jsx';
import Slider from '../components/slider.jsx';
import Body from '../components/body.jsx';
const App = () => {
  return (
    <>
      <Slider />
      <Body   />
    </>
  );
};

export default App;
