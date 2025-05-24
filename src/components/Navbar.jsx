import { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

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
      <div className="flex items-center w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72">
  <input
    type="text"
    placeholder="Search..."
    className="flex-grow bg-black text-white border border-gray-500 placeholder-gray-400 px-3 rounded-l-md
               focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md h-[35px] mr-2"
  />
  <button
    type="submit"
    className="bg-pink-600 hover:bg-pink-700 text-white rounded-r-md px-3 flex items-center justify-center h-[35px]"
  >
    <FaSearch />
  </button>
</div>


              
      <div className={styles.right}>
        <label htmlFor="language"></label>
        <select
       id="language"
       className={styles.languageDropdown}
       value={language}
      onChange={handleLanguageChange}
      >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
     </select>

        <button className={styles.btn} onClick={handleLogout}>Logout</button>
      </div>
     
    </nav>
    </div>
    

  );
}
