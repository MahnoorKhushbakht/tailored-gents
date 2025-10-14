"use client";
import Catalog from "@/components/Catalog";
import { useEffect, useState } from "react";

const images = [
  "/images/bg-img1.jpg",
  "/images/bg-img2.jpg",
  "/images/bg-img3.jpg",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Change slides smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
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
            className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-in-out"
          />
        </div>
      ))}

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
        <h1 className="text-4xl md:text-6xl font-semibold drop-shadow-lg tracking-wide animate-fadeIn">
          Tailored Gents
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-gray-200 max-w-xl animate-fadeIn delay-300">
          Discover elegance crafted to perfection — where style meets confidence.
        </p>
        <Catalog/>
      </div>

      {/* Optional gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
    </div>
  );
};

export default Slideshow;
