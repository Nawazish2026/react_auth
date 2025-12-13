import styles from "./MovieCard.module.css";
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

  return (
    <div className="py-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-white mb-6 ml-2">{title}</h2>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 group cursor-pointer">
            <div className="relative w-40 h-60 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
              {movie.poster_path ? (
                <>
                  <img
                    src={`${POSTER_BASE}${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold text-sm line-clamp-2">
                      {movie.title || movie.name}
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
        ))}
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

        // Remove duplicates
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
      if (direction === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Search Results for <span className="text-pink-500">"{searchQuery}"</span>
          </h2>
          <button 
            onClick={onClearSearch} 
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ✕ Back to Browse
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-12">Loading results...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-lg">No movies found matching "{searchQuery}"</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
            {filtered.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 group cursor-pointer">
                <div className="relative w-40 h-60 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                  {movie.poster_path ? (
                    <>
                      <img
                        src={`${POSTER_BASE}${movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white font-semibold text-sm line-clamp-2">
                          {movie.title || movie.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

  // Show search results when search is active
  if (isSearchActive) {
    return <SearchResults searchQuery={searchQuery} onClearSearch={onClearSearch} />;
  }

  return (
    <div className="bg-black">
      {/* --- TRENDING SLIDER SECTION --- */}
      <div className={styles.trend}>
        
        <button className={`${styles.shift} ${styles.left}`} onClick={handleBack}>
          <ArrowBack />
        </button>

        {trending.length > 0 && (
          <div className={styles.heroContainer}>
            <img
              key={trending[ind].id}
              src={`${IMAGE_BASE}${trending[ind].backdrop_path || trending[ind].poster_path}`}
              alt={trending[ind].title}
              className={styles.newPost}
            />
            
            <div className={styles.heroOverlay}></div>

            <div className={styles.heroInfo}>
              <h1 className={styles.heroTitle}>
                {trending[ind].title || trending[ind].name}
              </h1>
              <p className={styles.heroDate}>
                {trending[ind].release_date || trending[ind].first_air_date} • Trending #{ind + 1}
              </p>
              <p className={styles.heroOverview}>
                {trending[ind].overview ? trending[ind].overview.slice(0, 150) + "..." : ""}
              </p>
            </div>
          </div>
        )}

        <button className={`${styles.shift} ${styles.right}`} onClick={handleForward}>
          <ArrowForward />
        </button>
      </div>

      {/* --- MOVIE LISTS SECTION --- */}
      <div className={styles.movieCard}>
        {rows.map((row, index) => (
          <MovieSection key={index} title={row.title} fetchUrl={row.url} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
}
