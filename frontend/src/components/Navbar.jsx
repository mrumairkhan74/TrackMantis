import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GiPrayingMantis } from 'react-icons/gi';
import { AuthContext } from './Context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout() // uses AuthContext logout
    navigate('/login')
  };


  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/bug', label: 'Bug' },
    { to: '/reportbug', label: 'Report Bug' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ to: '/dashboard', label: 'Dashboard' });
  } else if (user?.role === 'user' || 'tester' || 'developer') {
    navLinks.push({ to: '/mybugs', label: 'My Bugs' });
  }

  return (
    <header className="bg-gradient-to-r from-slate-600 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-[Poppins] flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <GiPrayingMantis className="text-3xl" />
          TrackMantis
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center font-[Poppins]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:top-7 
              after:h-[5px] after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                title='login'
                to="/login"
                className="bg-white text-slate-700 px-4 py-2 rounded-md hover:bg-transparent hover:text-white border transition-all duration-300"
              >
                Login
              </Link>
              <Link
                title='signup'
                to="/signup"
                className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-slate-700 transition-all duration-300"
              >
                Signup
              </Link>
            </>
          ) : (

            <div className="flex items-center gap-2">
              <Link to={`/editProfile/${user.id}`}><img
                src={user.image?.url || '/fallback.jpg'}
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px]  border-2 object-cover"
                alt="Profile"
                title={user.name}
              /></Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                title='logout'
                className="bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Logout
              </button>
            </div>

          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button title='menu' className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-white"
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-white text-slate-700 px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="border border-white px-4 py-2 rounded-md"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <img src={user.image?.url} width={"50px"} height={"50px"} alt="" />
              <button
              title='Logout'
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
