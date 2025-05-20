import styles from "./Home.module.css";
import Login from "./Login";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";




export default function Home(){
  return(
    
    <div className={styles.landingPage}>
        <div className={styles.nav}>
        <Navbar />
        </div>
        <MovieCard />
       </div>
      );
}