import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrendingGems } from "../api/gems";
import Navbar from "../components/Navbar";
import GemCard from "../components/GemCard";
console.log(motion);
function Trending() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrendingGems();
        setGems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2E1C2] selection:bg-[#375932] selection:text-[#F2E1C2]">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* TRENDING HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#375932] text-[#F2E1C2] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                Live Heatmap
              </span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <h2
              className="text-5xl md:text-8xl text-[#375932] leading-none"
              style={{ fontFamily: "Ruslan Display" }}
            >
              Trending <span className="text-[#F2AB27]">Gems</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="font-neue text-[#375932] uppercase tracking-widest text-xs md:max-w-xs md:text-right"
          >
            The most popular hidden gems explorers are discovering right now.
          </motion.p>
        </header>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#375932] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {gems.map((gem, index) => (
              <motion.div
                key={gem._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Custom wrapper to add a "Hot" badge to trending cards */}
                <div className="relative group">
                  <div className="absolute -top-4 -right-4 z-10 bg-[#F2AB27] text-[#375932] w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform border-4 border-[#F2E1C2]">
                    🔥
                  </div>
                  <GemCard gem={gem} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* BACKGROUND DECORATION */}
        <div className="fixed bottom-0 right-0 p-10 pointer-events-none opacity-5">
          <h3
            className="text-[20rem] font-black text-[#375932] leading-none"
            style={{ fontFamily: "Luckiest Guy" }}
          >
            TRENDS
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Trending;
