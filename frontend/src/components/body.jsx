import React from 'react';
import './sass/body.scss'; // Importa los estilos del scss del body  
import imagen1 from '../assets/img/imagen1.jpg';
import Aceta from "../assets/img/Aceta.png";    
import imagen2 from '../assets/img/imagen2.jpg';
import advil from "../assets/img/advil.png";
import loratadina from "../assets/img/loratadina.png";
import ibuprofeno from "../assets/img/ibuprofeno.png";
import naproxeno from "../assets/img/naproxeno.png";
import loperamida from "../assets/img/loperamida.png";
import acnestil from "../assets/img/acnestil.png";
import serumhidratante from "../assets/img/serum.png";
import pañales from "../assets/img/pañales.png";
import tetero from "../assets/img/tetero.png";



const Body = () => {
    return (
        <div className="body">
            <div className="center-group">
                <div className="center">
                    <div className="fila1">
                        <img src={Aceta} alt="imagen del body 1" className="imagen" />
                        <h1>Acetaminofen</h1>
                        <p>Disponible</p>
                        <p>$2.000</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={advil} alt="imagen del body 1" className="imagen" />
                        <h1>Advil</h1>
                        <p>Disponible</p>
                        <p>$8.000</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={loratadina} alt="imagen del body 1" className="imagen" />
                        <h1>Loratadina</h1>
                        <p>Disponible</p>
                        <p>$3.500</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={ibuprofeno} alt="imagen del body 1" className="imagen" />
                        <h1>Ibuprofeno</h1>
                        <p>Disponible</p>
                        <p>$4.300</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={naproxeno} alt="imagen del body 1" className="imagen" />
                        <h1>Naproxeno</h1>
                        <p>Disponible</p>
                        <p>$3.900</p>
                    </div>
                </div>
            </div>
            <div className="center-group">
                <div className="center">
                    <div className="fila1">
                        <img src={loperamida} alt="imagen del body 2" className="imagen" />
                        <h1>Loperamida</h1>
                        <p>Disponible</p>
                        <p>$8.600</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={acnestil} alt="imagen del body 2" className="imagen" />
                        <h1>Acnestil</h1>
                        <p>Disponible</p>
                        <p>$55.700</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={serumhidratante} alt="imagen del body 2" className="imagen" />
                        <h1>Sérum hidratante</h1>
                        <p>Disponible</p>
                        <p>$53.700</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={pañales} alt="imagen del body 2" className="imagen" />
                        <h1>Pañales</h1>
                        <p>Disponible</p>
                        <p>$34.000</p>
                    </div>
                </div>
                <div className="center">
                    <div className="fila1">
                        <img src={tetero} alt="imagen del body 2" className="imagen" />
                        <h1>Tetero</h1>
                        <p>Disponible</p>
                        <p>$32.500</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
