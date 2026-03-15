import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import GemCard from "../components/GemCard";
import { searchGems } from "../api/gems";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(motion);
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchGems(value);
      setResults(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#375932] selection:bg-[#F2AB27] selection:text-[#375932]">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-7xl text-[#F2E1C2] mb-4"
            style={{ fontFamily: "Ruslan Display" }}
          >
            Explore <span className="text-[#F2AB27]">Discoveries</span>
          </h2>
          <p className="font-neue text-[#F2E1C2]/60 uppercase tracking-[0.3em] text-xs">
            Every place has a story. Find the ones waiting to be discovered.
          </p>
        </motion.div>

        {/* STYLIZED SEARCH INPUT */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Search by city, landmark, or vibe..."
            className="w-full bg-[#F2E1C2]/10 border-2 border-[#F2AB27]/30 focus:border-[#F2AB27] p-6 rounded-3xl outline-none text-[#F2E1C2] text-xl placeholder:text-[#F2E1C2]/30 transition-all backdrop-blur-sm shadow-2xl"
            style={{ fontFamily: "nourd" }}
          />
          {loading && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-[#F2AB27] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* RESULTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              results.map((gem, index) => (
                <motion.div
                  key={gem._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GemCard gem={gem} />
                </motion.div>
              ))
            ) : query && !loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-[#F2E1C2]/40 text-xl font-neue uppercase tracking-widest">
                  No signals found for "{query}"
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE DECORATION */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="flex flex-col items-center justify-center py-20 opacity-10"
          >
            <h3 className="text-9xl font-black text-[#F2E1C2]">HUNT</h3>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Search;
