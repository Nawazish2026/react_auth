import { useState, useEffect } from 'react';
import { FaTimes, FaPlay, FaStar, FaCalendar } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail({ movie, isOpen, onClose }) {
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !movie) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const movieType = movie.media_type || (movie.title ? 'movie' : 'tv');
        const movieId = movie.id;

        // Fetch movie/tv details
        const detailsRes = await fetch(
          `${BASE_URL}/${movieType}/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        const detailsData = await detailsRes.json();
        setDetails(detailsData);

        // Fetch videos
        const videosRes = await fetch(
          `${BASE_URL}/${movieType}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videosData = await videosRes.json();
        setVideos(videosData.results || []);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, movie]);

  if (!isOpen) return null;

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition"
        >
          <FaTimes size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin">
              <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : details ? (
          <>
            {/* Poster and Trailer Section */}
            <div className="relative">
              {trailer ? (
                <div className="relative h-96 md:h-[500px] bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title={trailer.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
              ) : (
                <div className="h-96 md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <FaPlay size={48} className="text-pink-500 mx-auto mb-4" />
                    <p className="text-gray-400">No trailer available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10">
              {/* Title and Rating */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {details.title || details.name}
                </h1>
                
                <div className="flex flex-wrap gap-4 items-center mb-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2 bg-pink-600/20 px-4 py-2 rounded-lg border border-pink-600/50">
                    <FaStar className="text-pink-500" size={20} />
                    <span className="text-white font-semibold text-lg">
                      {details.vote_average?.toFixed(1)} / 10
                    </span>
                  </div>

                  {/* Release Date */}
                  <div className="flex items-center gap-2 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-600/50">
                    <FaCalendar className="text-purple-400" size={18} />
                    <span className="text-gray-300">
                      {details.release_date || details.first_air_date || 'N/A'}
                    </span>
                  </div>

                  {/* Runtime/Episodes */}
                  {details.runtime && (
                    <div className="bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-600/50 text-gray-300">
                      {details.runtime} min
                    </div>
                  )}
                </div>

                {/* Genres */}
                {details.genres && details.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {details.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 text-pink-400 rounded-full text-sm border border-gray-700"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {details.overview || 'No description available'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {details.budget && details.budget > 0 && (
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Budget</h3>
                    <p className="text-white text-lg font-semibold">
                      ${(details.budget / 1000000).toFixed(0)}M
                    </p>
                  </div>
                )}

                {details.revenue && details.revenue > 0 && (
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Revenue</h3>
                    <p className="text-white text-lg font-semibold">
                      ${(details.revenue / 1000000).toFixed(0)}M
                    </p>
                  </div>
                )}

                {details.status && (
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Status</h3>
                    <p className="text-white text-lg font-semibold">{details.status}</p>
                  </div>
                )}

                {details.original_language && (
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 text-sm mb-2">Language</h3>
                    <p className="text-white text-lg font-semibold uppercase">
                      {details.original_language}
                    </p>
                  </div>
                )}
              </div>

              {/* Production Companies */}
              {details.production_companies && details.production_companies.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Production Companies</h2>
                  <div className="flex flex-wrap gap-4">
                    {details.production_companies.map(company => (
                      <div
                        key={company.id}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-3"
                      >
                        {company.logo_path && (
                          <img
                            src={`${POSTER_BASE}${company.logo_path}`}
                            alt={company.name}
                            className="h-12 w-auto"
                          />
                        )}
                        <span className="text-gray-300">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-700">
                <button className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2">
                  <FaPlay size={18} />
                  Watch Now
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-700/50 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition border border-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-400 text-lg">Failed to load movie details</p>
          </div>
        )}
      </div>
    </div>
  );
}
