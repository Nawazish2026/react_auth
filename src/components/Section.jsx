import styles from './Navbar.module.css'; // Make sure you import Navbar.module.css, NOT Section.module.css if you want the good styling

export default function Section() {
  return (
    <nav className={styles.navbar}>
      
      {/* Left Side Links */}
      <ul>
        <li>Home</li>
        <li>Series</li>
      </ul>

      {/* Center Logo */}
      <div className={styles.logo}>playN</div>

      {/* Right Side Links */}
      <ul>
        <li>Movies</li>
        <li>Settings</li>
      </ul>
      
      {/* Search/Profile would go here if you add the .right div back */}
    </nav>
  );
}
