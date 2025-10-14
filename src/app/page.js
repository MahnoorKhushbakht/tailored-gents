'use client';
import Buttons from '@/components/Buttons';
import Catalog from '@/components/Catalog';
import Layout from '@/components/Layout';
import Slideshow from '@/components/SlideShow';

export default function HomePage() {

  return (
    <div className="h-screen">
      <div className="relative w-full
       h-full">
        <Slideshow />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h3 className="bg-clip-text text-transparent hover:bg-gradient-to-l bg-gradient-to-r from-gray-800 to-gray-900 text-3xl md:text-5xl font-extrabold">
            Tailored Gents
          </h3>
          <div className="w-80 mt-4">
            <p className="text-center text-gray-900 bg-clip-text text-wrap antialiased text-lg md:text-xl">
              Discover timeless elegance and modern style with our <strong className="underline decoration-4 decoration-red-900/[.33]">meticulously</strong> curated collection of men clothing, <strong className="underline decoration-4 decoration-red-900/[.33]">tailored</strong> to elevate your everyday <strong className="underline decoration-4 decoration-red-900/[.33]">wardrobe</strong>.
            </p>
          </div>
          <Catalog />
          <Buttons />
        </div>
      </div>
    </div>
  );
}
