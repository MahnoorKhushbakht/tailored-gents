import { useEffect, useState } from 'react';

const images = [
  '/images/bg-img1.jpg',
  '/images/bg-img2.jpg',
  '/images/bg-img3.jpg',
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
