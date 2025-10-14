'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ children, href, prefetch }) {
  const pathname = usePathname();
  if (href === pathname) {
    return (
      <span className="text-gray-400 no-underline subpixel-antialiased">
        {children}
      </span>
    );
  }
  return (
    <Link href={href} prefetch={prefetch}
      className="text-gray-400 hover:text-white no-underline subpixel-antialiased">
      {children}
    </Link>
  );
}