import { getUserFromSession } from '@/lib/auth';
import NavLink from './NavLink';
import SignOutButton from './SignOutButton';





export default async function NavBar() {
  const user = await getUserFromSession();

  return (
    <nav className=" bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center p-2 ">
      <ul className="font-bold text-lg md:text-xl text-white flex flex-row space-x-4 m-2">
          <li>
          <NavLink href="/"  >
            {/* <span className="hidden md:inline">TAILORED GENTS</span> */}
            <svg xmlns="http://www.w3.org/2000/svg"   fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-6 inline  size-8 hover:text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
          </NavLink>
          </li>
          <li>
          <NavLink href="/cart" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-6 inline  size-8 hover:text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

          </NavLink>
          </li>
        </ul>
        <ul className="flex gap-3 bg-transparent  text-base md:text-lg m-2">
        <li>
          <NavLink href="/about" >
          About

          </NavLink>
          </li>
          {user ? (
            <li className='text-white'>
              {/* {user.email} */}
              <SignOutButton />
            </li>
          ) : (
            <li>
              <NavLink href="/sign-in">
                Sign in
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
