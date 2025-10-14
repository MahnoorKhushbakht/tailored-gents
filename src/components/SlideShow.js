"use client";
import { useEffect, useState } from "react";

const images = [
  "/images/bg-img1.jpg",
  "/images/bg-img2.jpg",
  "/images/bg-img3.jpg",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images for smoother transitions
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // smoother, slower transitions
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity ease-in-out duration-[2000ms] will-change-transform ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
            style={{
              transform: "scale(1.05)",
              transition: "transform 6s ease-in-out",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
