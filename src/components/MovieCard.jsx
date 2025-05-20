import styles from "./MovieCard.module.css";
import { useRef } from "react";

export default function MovieCard() {
  const moviePosters = [
    "/Poster2.jpg",
    "/Poster6.jpg",
    "/Poster8.jpg",
    "/Poster9.jpg",
    "/Poster10.jpg",
    "/Poster11.jpg",
    "/Poster1.jpg",
    "/Poster2.jpg",
    "/Poster6.jpg",
    "/Poster7.jpg",
    "/Poster6.jpg",
    "/Poster8.jpg",
    "/Poster9.jpg",
    "/Poster10.jpg",
    "/Poster11.jpg",
    "/Poster1.jpg",
    "/Poster2.jpg",
    "/Poster6.jpg",
    "/Poster7.jpg",
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
              <img src={location} alt={`Movie Poster ${i}`} className={styles.poster} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.body}>
      {categories.map((category, index) => (
        <MovieSection key={index} title={category} posters={moviePosters} />
      ))}
    </div>
  );
}
