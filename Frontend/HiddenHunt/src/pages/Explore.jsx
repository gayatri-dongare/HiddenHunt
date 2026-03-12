import { useEffect, useState } from "react";
import { getGems } from "../api/gems";
import GemCard from "../components/GemCard";
import Navbar from "../components/Navbar";

function Explore() {

  const [gems, setGems] = useState([]);

  useEffect(() => {

    const fetchGems = async () => {
      try {
        const res = await getGems();
        setGems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGems();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 px-4">

        <h2 className="text-2xl font-bold mb-6">
          Explore Hidden Gems
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

export default Explore;