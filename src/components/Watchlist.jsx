import { useState, useEffect } from 'react';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function Watchlist({ isOpen, onClose }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(saved);
  }, [isOpen]);

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-700/50">
            <button
              onClick={onClose}
              className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg transition"
            >
              <FaArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
              <p className="text-gray-400 text-sm mt-1">{watchlist.length} movie{watchlist.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Content */}
          {watchlist.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl mb-4">Your watchlist is empty</p>
              <p className="text-gray-500">Add movies to watch later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {watchlist.map((movie) => (
                <div key={movie.id} className="group relative">
                  <div className="relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {movie.poster_path ? (
                      <img
                        src={`${POSTER_BASE}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-white font-bold text-sm mb-2">{movie.title}</p>
                        <button
                          onClick={() => removeFromWatchlist(movie.id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
                        >
                          <FaTrash size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
