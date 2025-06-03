import styles from "./MovieCard.module.css";
import { useRef, useState } from "react";
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
export default function MovieCard() {
   const [ind, setInd] = useState(0);
  function handleForward() {
    return setInd((prevInd) => (prevInd + 1) % trendPosters.length);
  }
  function handleBack() {
    return setInd((prevInd) => (prevInd - 1 + trendPosters.length) % trendPosters.length);
  }
  const moviePosters = [
  
    "/Poster6.jpg",
    "/Poster8.jpg",
    "/Poster9.jpg",
    "/Poster11.jpg",
    "/Poster6.jpg",
    "/Poster7.jpg",
    "/Poster6.jpg",
    "/Poster8.jpg",
    "/Poster9.jpg",
    "/Poster11.jpg",
    "/Poster6.jpg",
    "/Poster7.jpg",
  ];

  const trendPosters = [
    "Poster10.jpg",
    "Poster11.jpg",
    "Poster6.jpg",
    "Poster7.jpg",
  ];

  const categories = [
    "Latest Movies",
    "Web Series",
    "Popular Movies",
    "Trending This Week",
    "Action Movies",
    "Classic Movies",
  ];
  
  // Reusable movie section
  const MovieSection = ({ title, posters }) => {
    const scrollRef = useRef(null);

    return (
      <div className={styles.section1}>
        <div className={styles.heading1}>
          <p>{title}</p>
        </div>
        <div ref={scrollRef} className={styles.container}>
          {posters.map((location, i) => (
            <div key={i} className={styles.mcard}>
              <img src={location} alt={`${i}`} className={styles.poster} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.body}>
      <div className={styles.trend}>
        <button className={styles.shift} onClick={handleBack}>
      <ArrowBack />
    </button>

          <img key={ind} src={`/${trendPosters[ind]}`} alt={`trendPosters${ind}`} className={styles.newPost} />

        
        <button className={styles.shift} onClick={handleForward}>
      <ArrowForward />
    </button>
        </div>
      <div className={styles.movieCard}>
       {categories.map((category, index) => (
        <MovieSection key={index} title={category} posters={moviePosters} />
      ))}

     </div> 
      
    </div>
  );
}
