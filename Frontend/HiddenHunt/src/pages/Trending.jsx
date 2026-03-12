import { useEffect, useState } from "react";
import { getTrendingGems } from "../api/gems";
import Navbar from "../components/Navbar";
import GemCard from "../components/GemCard";

function Trending() {

  const [gems, setGems] = useState([]);

  useEffect(() => {

    const fetchTrending = async () => {
      try {
        const res = await getTrendingGems();
        setGems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrending();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 px-4">

        <h2 className="text-2xl font-bold mb-6">
          🔥 Trending Gems
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {gems.map((gem) => (
            <GemCard key={gem._id} gem={gem} />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Trending;