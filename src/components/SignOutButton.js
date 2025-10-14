import { deleteSessionCookie } from '@/lib/auth';

export default function SignOutButton() {
  async function action() {
    'use server';
    deleteSessionCookie();
  }

  return (
    <form action={action}>
      <button type="submit"
        className="text-white hover:underline">
        Sign out
      </button>
    </form>
  );
}