import { useState } from "react";
import Navbar from "../components/Navbar";
import GemCard from "../components/GemCard";
import { searchGems } from "../api/gems";


function Search() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return setResults([]);

    try {

      const res = await searchGems(value);
      setResults(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 px-4">

        <h2 className="text-2xl font-bold mb-6">
          Search Hidden Gems
        </h2>

        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search by location, title or category..."
          className="w-full border p-3 rounded mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {results.map((gem) => (
            <GemCard key={gem._id} gem={gem} />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Search;