import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-red-600 hover:text-red-500 transition-colors">
            M
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-300 hover:text-white transition-colors text-sm font-medium ${
                location.pathname === '/' ? 'text-white' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`text-gray-300 hover:text-white transition-colors text-sm font-medium ${
                location.pathname === '/movies' ? 'text-white' : ''
              }`}
            >
              Movies
            </Link>
            <Link
              to="/series"
              className={`text-gray-300 hover:text-white transition-colors text-sm font-medium ${
                location.pathname === '/series' ? 'text-white' : ''
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/search"
              className={`text-gray-300 hover:text-white transition-colors text-sm font-medium ${
                location.pathname === '/search' ? 'text-white' : ''
              }`}
            >
              Search
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
            <button className="text-gray-300 hover:text-white transition-colors">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;