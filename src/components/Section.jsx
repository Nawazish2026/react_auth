import styles from './Section.module.css'

export default function Section(){
  return(
    <nav className={styles.navbar}>
          <ul>
            <li>Home</li>
            <li>Series</li>
            <h3 className={styles.logo}>playN</h3>
            <li>Movies</li>
            <li>Settings</li>
          </ul>
          </nav>
  );
}