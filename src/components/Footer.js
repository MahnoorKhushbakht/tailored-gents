import Searchbox from './SearchBox';
import SocialNav from './SocialNav';
import NavLink from './NavLink';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-950 text-white py-8">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        <SocialNav />
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Looking for Something?</h2>
          <p className="mb-4 text-sm">Search for your favorite products in our store!</p>
          <div className='flex justify-center'>
            <Searchbox />
          </div>
        </div>
        <p className="text-white text-sm">© {new Date().getFullYear()} TailorGents. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
