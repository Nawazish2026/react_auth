import { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [language, setLanguage] = useState("en");

  const navigate = useNavigate();
  const handleLogout = () => {
    // Logic to handle logout
    console.log("User logged out");
     toast.success('Logged out successfully!');
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    console.log("Language changed to:", event.target.value);
  };

  return (
    <div>
    <nav className={styles.navbar}>
      <ul>
      <br></br>
        <li>Home</li>
        <li>Series</li>
        
        <h3 className={styles.logo}>playN</h3>
        <li>Movies</li>
        <li>Settings</li>
      
      </ul>

      {/* Language Dropdown */}
      <div className={styles.right}>
  
      <div className={styles.languageSelector}>
        <label htmlFor="language"></label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
        <button className={styles.signin} onClick={handleLogout}>Logout</button>
      </div>
      
    </nav>
    </div>
    

  );
}
