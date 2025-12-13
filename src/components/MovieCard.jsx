import { useRef, useState, useEffect } from "react";
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';

const API_KEY = "176cd0c397c163de88f2723e9d571bb9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

// --- Sub-Component for regular sections ---
const MovieSection = ({ title, fetchUrl, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        if (data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const filteredMovies = movies?.filter(movie => 
    movie?.title?.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
    movie?.name?.toLowerCase().includes((searchQuery || "").toLowerCase())
  ) || [];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 lg:px-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 ml-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
        >
          <ArrowBack size={24} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 group/card">
                <div className="relative w-44 h-64 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 cursor-pointer border border-gray-700/50 hover:border-pink-500/50">
                  {movie.poster_path ? (
                    <>
                      <img
                        src={`${POSTER_BASE}${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-bold text-sm line-clamp-3">
                          {movie.title || movie.name}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        {movie.vote_average?.toFixed(1) || 'N/A'} ⭐
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 text-center px-4">No Image Available</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-gray-400 text-lg">No movies found</p>
            </div>
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
        >
          <ArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

// --- Search Results Component ---
const SearchResults = ({ searchQuery, onClearSearch }) => {
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);
      try {
        const urls = [
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
          `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
          `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataArray = await Promise.all(responses.map(res => res.json()));
        
        let combined = [];
        dataArray.forEach(data => {
          if (data.results) {
            combined = [...combined, ...data.results];
          }
        });

        const unique = Array.from(new Map(combined.map(m => [m.id, m])).values());
        setAllResults(unique);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResults();
  }, []);

  const filtered = allResults.filter(movie =>
    movie?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-700/50">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Search Results
            </h2>
            <p className="text-pink-400 text-lg mt-2">
              "{searchQuery}"
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button 
            onClick={onClearSearch}
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
          >
            ← Back to Browse
          </button>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin">
              <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">No movies found matching your search</p>
            <p className="text-gray-500">Try searching for different keywords</p>
          </div>
        ) : (
          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
              <ArrowBack size={24} />
            </button>

            {/* Scroll Container */}
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-6 px-2"
            >
              {filtered.map((movie) => (
                <div key={movie.id} className="flex-shrink-0 group/card">
                  <div className="relative w-44 h-64 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 cursor-pointer border border-gray-700/50 hover:border-pink-500/50">
                    {movie.poster_path ? (
                      <>
                        <img
                          src={`${POSTER_BASE}${movie.poster_path}`}
                          alt={movie.title || movie.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <p className="text-white font-bold text-sm line-clamp-3">
                            {movie.title || movie.name}
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                          {movie.vote_average?.toFixed(1) || 'N/A'} ⭐
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <span className="text-gray-400 text-center px-4">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
            >
              <ArrowForward size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
export default function MovieCard({ searchQuery = "", isSearchActive, onClearSearch }) {
  const [ind, setInd] = useState(0);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();
        if (data.results) {
          setTrending(data.results.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };
    fetchTrending();
  }, []);

  const handleForward = () => {
    setInd((prevInd) => (prevInd + 1) % trending.length);
  };

  const handleBack = () => {
    setInd((prevInd) => (prevInd - 1 + trending.length) % trending.length);
  };

  const rows = [
    { title: "Trending This Week", url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}` },
    { title: "Popular Movies", url: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1` },
    { title: "Web Series", url: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US` },
    { title: "Action Movies", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28` },
    { title: "Latest Movies", url: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` },
    { title: "Classic Movies", url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US` },
  ];

  if (isSearchActive) {
    return <SearchResults searchQuery={searchQuery} onClearSearch={onClearSearch} />;
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
      {/* --- TRENDING SLIDER SECTION --- */}
      {trending.length > 0 && (
        <div className="relative h-96 md:h-[500px] lg:h-screen overflow-hidden group">
          
          {/* Left Arrow */}
          <button 
            onClick={handleBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-pink-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowBack size={28} />
          </button>

          {/* Hero Image */}
          <div key={trending[ind].id} className="relative w-full h-full">
            <img
              src={`${IMAGE_BASE}${trending[ind].backdrop_path || trending[ind].poster_path}`}
              alt={trending[ind].title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {trending[ind].title || trending[ind].name}
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-4 drop-shadow-md">
                {trending[ind].release_date || trending[ind].first_air_date} • Trending #{ind + 1}
              </p>
              <p className="text-gray-400 text-sm md:text-base line-clamp-3 mb-6 max-w-xl drop-shadow-md">
                {trending[ind].overview || "No description available"}
              </p>
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
                  ▶ Watch Now
                </button>
                <button className="bg-gray-700/50 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition border border-gray-600">
                  ℹ More Info
                </button>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleForward}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-pink-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowForward size={28} />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {trending.map((_, i) => (
              <button
                key={i}
                onClick={() => setInd(i)}
                className={`h-2 rounded-full transition-all ${i === ind ? 'w-8 bg-pink-500' : 'w-2 bg-gray-500'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- MOVIE LISTS SECTION --- */}
      <div className="pb-12">
        {rows.map((row, index) => (
          <MovieSection key={index} title={row.title} fetchUrl={row.url} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
}
