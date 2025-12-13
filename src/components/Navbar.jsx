import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

export default function Navbar({ searchQuery, setSearchQuery, onSearch, activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-pink-600/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer">
              playN
            </h1>
            <ul className="hidden md:flex gap-6">
              <li 
                onClick={() => handleNavClick('home')}
                className={`cursor-pointer font-medium transition ${activeTab === 'home' ? 'text-pink-500' : 'text-gray-300 hover:text-pink-500'}`}
              >
                Home
              </li>
              <li 
                onClick={() => handleNavClick('movies')}
                className={`cursor-pointer font-medium transition ${activeTab === 'movies' ? 'text-pink-500' : 'text-gray-300 hover:text-pink-500'}`}
              >
                Movies
              </li>
              <li 
                onClick={() => handleNavClick('series')}
                className={`cursor-pointer font-medium transition ${activeTab === 'series' ? 'text-pink-500' : 'text-gray-300 hover:text-pink-500'}`}
              >
                Series
              </li>
            </ul>
          </div>

          {/* Search Input */}
          <div className="flex items-center bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700 hover:border-pink-500 transition w-64">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              className="bg-transparent text-white placeholder-gray-400 outline-none flex-grow text-sm"
            />
            <button
              type="button"
              onClick={onSearch}
              className="text-pink-500 hover:text-pink-400 transition ml-2"
            >
              <FaSearch size={18} />
            </button>
          </div>

          {/* Right Section */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
