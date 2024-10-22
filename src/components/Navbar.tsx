import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string): string => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-600';
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl">Boarding House</span>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/rooms" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/rooms')}`}>
              Rooms
            </Link>
            <Link to="/bills" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/bills')}`}>
              Bills
            </Link>
            <Link to="/inventory" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/inventory')}`}>
              Inventory
            </Link>
            <Link to="/penalties" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/penalties')}`}>
              Penalties
            </Link>
          </div>
        </div>
      </div>
    </nav>
  ); // Ensure this closing parenthesis is correctly placed
};

export default Navbar;
