'use client'
import React, { useState } from 'react';

export default function SpecsBtn({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='text-white font-bold mb-2 mt-2 '>
        SPECIFICATION
      <button
        onClick={toggleVisibility}
        className="self-center outline-gray-300 
                   text-gray-300 ml-2
                "
      >
        {isVisible ? '-' : '+'}
      </button>
      {isVisible && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}
