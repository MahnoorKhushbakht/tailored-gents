
import Layout from '@/components/Layout';
import SignUpForm from '@/components/SignUpForm';
import Link from 'next/link';

export const metadata = {
  title: 'Sign Up',
};

export default function SignInPage() {
  return (
  <Layout>
         <div className='flex bg-transparent justify-center text-2xl md:text-4xl py-2'>
  <h1>Sign Up</h1>
</div>
      <div className='w-full flex justify-center align-center'>
      <SignUpForm/>
      </div>
      <div className="py-3">
        Registered?{' '}
        <Link href="/sign-in" className="text-gray-400 hover:underline">
          Sign In
        </Link> instead
      </div>
      </Layout>
  );
}