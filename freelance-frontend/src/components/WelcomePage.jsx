import React from 'react';
import useSlideshow from './hooks/useSlideshow'; 
import slide1 from '../slike/slide1.jpg';
import slide2 from '../slike/slide2.jpg';
import slide3 from '../slike/slide3.png';
import slide4 from '../slike/slide4.webp';
import '../CSS/WelcomePage.css';
import NavBar from './NavBar';

const WelcomePage = () => {
  //koriscenje custom kuke
  const { currentSlide, slides, goToNextSlide, goToPrevSlide } = useSlideshow([slide1, slide2, slide3, slide4]);

  return (
    
    <div>
      <div className="home-container">
        <div className="slideshow">
          <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide-image" />
          <div className="slide-content">
          <h1>Dobrodošli na Freelance Platformu</h1>
          <p>Pronađite stručnjake za realizaciju vaših projekata ili 
            postanite deo naše freelance zajednice.</p>
          </div>
          <button className="slide-button prev" onClick={goToPrevSlide}>&#8249;</button>
          <button className="slide-button next" onClick={goToNextSlide}>&#8250;</button>
        </div>
      </div>
    </div>
    
  );

};

export default WelcomePage;