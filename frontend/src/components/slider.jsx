import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './sass/CustomSlider.scss'; // Importa tus estilos Sass personalizados


const CustomSlider = () => {
  const images = [
    'https://assets.weforum.org/article/image/responsive_big_webp_zvvMJyBNYzsiZ4bv7gzjnGvumaXuYAGEAhymtcLAjWQ.webp', // Nueva imagen,
    ' https://www.makatimed.net.ph/wp-content/uploads/2020/09/1000-10.png',
    ' https://cdn.cigdigital.net/images/cache/b596362c56273bd6c804c8848caf3f48_encodejpg_quality75.jpg', // Nueva imagen' // Imagen roja
  ]; // URLs de las imágenes

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="custom-slider">
      <div className="slider-container" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={handleClickPrev}>
      🡠 
      </button>
      <button className="next-button" onClick={handleClickNext}>
      🡢
      </button>
    </div>
  );
};

export default CustomSlider;
