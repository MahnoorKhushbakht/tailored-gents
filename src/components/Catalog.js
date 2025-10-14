import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Layout from '@/components/Layout';

export default function Catalog() {
  const category = [
    { slug: 'formal-wear', name: 'Formal Wear' },
    { slug: 'casual-wear', name: 'Casual Wear' },
    { slug: 'accessories', name: 'Accessories' },
  ];

  return (
<>

      <p className="text-center text-gray-800 text-lg italic mb-6 w-80 md:w-full font-bold">
      Explore now to elevate your wardrobe!
      </p>
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
        {category.map((categoryItem,index) => (
          <li key={index}>
            <Link href={`/category/${categoryItem.slug}`} style={{ textDecoration: 'none' }}>
              <Paper 
                className=' drop-shadow-sm w-32 h-24 flex items-center justify-center bg-gray-800 text-gray-200 hover:bg-gray-900 disabled:bg-slate-500' 
                elevation={3} 
              >
                {categoryItem.name}
              </Paper>
            </Link>
          </li>
        ))}
      </ul>
      </>
  );
}
