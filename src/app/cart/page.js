import Layout from '@/components/Layout';
import CartTable from '@/components/CartTable';
import { getUserFromSession } from '@/lib/auth';
import Link from 'next/link'; 


export const metadata = {
  title: 'Cart',
};

export default async function SignInPage() {
    const user = await getUserFromSession()
   
  return (
  <Layout>
    
      {user ? (

      <CartTable userId={user.id}/>
  
      ):(
        <div className="border bg-transparent mt-3 px-3 py-3 rounded">
        <Link href="/sign-in" className="text-gray-200 hover:underline">
          Sign in
        </Link> to view your Cart
      </div>
    )}
      </Layout>
  );
}