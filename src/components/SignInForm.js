'use client';

import { signInAction } from '@/app/sign-in/actions';
import { useFormState } from '@/lib/hooks';

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <div className="flex flex-col ml-2 mr-2 items-center">
      <form onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-5 bg-gray-900
                   w-full max-w-md px-6 py-8 rounded">
        <div className="flex flex-col">
          <label htmlFor="emailField" className="mb-1 text-gray-400">
            Email
          </label>
          <input id="emailField" name="email" type="email" placeholder='user@example.com'
            className="border px-3 py-2 text-gray-900 bg-gray-300 rounded w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordField" className="mb-1 text-gray-400">
            Password
          </label>
          <input id="passwordField" name="password" type="password" placeholder='Password'
            className="border px-3 py-2 text-gray-900 bg-gray-300 rounded w-full"
          />
        </div>
        {Boolean(state.error) && (
          <p className="text-red-700">{state.error.message}</p>
        )}
        <button type="submit" disabled={state.loading}
          className="bg-gray-400 rounded px-4 py-2 text-gray-800
                     hover:bg-gray-200 disabled:bg-slate-500 disabled:cursor-not-allowed">
          {state.loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
