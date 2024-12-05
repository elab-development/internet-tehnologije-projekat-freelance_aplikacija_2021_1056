import { useState } from 'react';

const useSlideshow = (initialSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // idi napred
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % initialSlides.length);
  };

  // idi nazad
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + initialSlides.length) % initialSlides.length);
  };

  return {
    currentSlide,
    slides: initialSlides,
    goToNextSlide,
    goToPrevSlide,
  };
};

export default useSlideshow;
