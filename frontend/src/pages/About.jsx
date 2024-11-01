import React from 'react';
import Header from '../components/header.jsx'; // Importa el componente Header
import '../components/sass/About.scss'; // Importa los estilos del scss del body  
import imagen6 from '../assets/img/imagen6.jpg';
import imagen5 from '../assets/img/imagen5.jpg';

const App = () => {
  return (
         <div className="body-about">
            <h1>¿Quiénes somos?</h1>
            <p>
                Contribuimos en la prevención y el cuidado de la salud en todas las etapas de tu vida y de tu familia, brindándote lo que<br/>
                necesitas en el momento que lo necesitas. Desde la etapa de concepción hasta la adultez somos tu aliado en salud, para<br/>
                los momentos vulnerables y también de vitalidad. Y para estar cerca de ti, disponemos de una pagina web, canales de<br/>
                telefonia, atencion mediante whatsapp y punto fisico en la ciudad de Neiva para la dispensación de medicamentos y<br/>
                productos para el cuidado de la salud, bienestar y belleza.
            </p>
            <img src={imagen6} alt="Imagen 3" />
            <img src={imagen5} alt="Imagen 4" />
        </div>
  );
};

export default App;
