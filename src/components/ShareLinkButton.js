'use client';

import { LinkIcon } from '@heroicons/react/solid';
import { useState } from 'react';

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  return (
    <button onClick={handleClick}
      className=" flex gap-1 items-center px-2 py-1 
                 text-slate-300 text-sm
                 hover:text-gray-800">
      <LinkIcon className="h-4 w-4" />
      {clicked ? 'Link copied!' : 'Share link'}
    </button>
  );
}