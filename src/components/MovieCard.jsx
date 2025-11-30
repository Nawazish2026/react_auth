import styles from "./MovieCard.module.css";
import { useRef, useState, useEffect } from "react";
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';

// --- Constants ---
const API_KEY = "176cd0c397c163de88f2723e9d571bb9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original"; // High res for Hero slider
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";   // Standard res for Cards

// --- Sub-Component (Defined outside to prevent re-render bugs) ---
const MovieSection = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        // Check if results exist before setting
        if (data.results) {
          setMovies(data.results);
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  return (
    <div className={styles.section1}>
      <div className={styles.heading1}>
        <p>{title}</p>
      </div>
      <div ref={scrollRef} className={styles.container}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.mcard}>
            {movie.poster_path ? (
              <img
                src={`${POSTER_BASE}${movie.poster_path}`}
                alt={movie.title || movie.name}
                className={styles.poster}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
export default function MovieCard() {
  const [ind, setInd] = useState(0);
  const [trending, setTrending] = useState([]);

  // 1. Fetch Trending Movies for the Hero Slider
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();
        if (data.results) {
          setTrending(data.results.slice(0, 5)); // Keep top 5 for slider
        }
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };
    fetchTrending();
  }, []);

  // Slider Logic
  const handleForward = () => {
    setInd((prevInd) => (prevInd + 1) % trending.length);
  };

  const handleBack = () => {
    setInd((prevInd) => (prevInd - 1 + trending.length) % trending.length);
  };

  // 2. Define Categories and their API Endpoints
  const rows = [
    { title: "Latest Movies", url: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` },
    { title: "Web Series", url: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US` },
    { title: "Popular Movies", url: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1` },
    { title: "Trending This Week", url: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}` },
    { title: "Action Movies", url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28` },
    { title: "Classic Movies", url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US` },
  ];

  return (
    <div className={styles.body}>
      {/* --- TRENDING SLIDER SECTION --- */}
      <div className={styles.trend}>
        <button className={styles.shift} onClick={handleBack}>
          <ArrowBack />
        </button>

        {trending.length > 0 && (
          <img
            key={trending[ind].id}
            // Prefer backdrop (horizontal) for slider, fall back to poster
            src={`${IMAGE_BASE}${trending[ind].backdrop_path || trending[ind].poster_path}`}
            alt={trending[ind].title}
            className={styles.newPost}
          />
        )}

        <button className={styles.shift} onClick={handleForward}>
          <ArrowForward />
        </button>
      </div>

      {/* --- MOVIE LISTS SECTION --- */}
      <div className={styles.movieCard}>
        {rows.map((row, index) => (
          <MovieSection key={index} title={row.title} fetchUrl={row.url} />
        ))}
      </div>
    </div>
  );
}
