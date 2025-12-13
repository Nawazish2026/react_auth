import { useState } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

export default function Home(){
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearchActive(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  return(
    <div className="bg-black min-h-screen">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        isSearchActive={isSearchActive}
      />
      <MovieCard 
        searchQuery={searchQuery} 
        isSearchActive={isSearchActive}
        onClearSearch={handleClearSearch}
      />
    </div>
  );
}