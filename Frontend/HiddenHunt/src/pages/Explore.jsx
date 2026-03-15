// import { useEffect, useState } from "react";
// import { getGems } from "../api/gems";
// import GemCard from "../components/GemCard";
// import Navbar from "../components/Navbar";

// function Explore() {

//   const [gems, setGems] = useState([]);

//   useEffect(() => {

//     const fetchGems = async () => {
//       try {
//         const res = await getGems();
//         setGems(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchGems();

//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">

//       <Navbar />

//       <div className="max-w-6xl mx-auto mt-8 px-4">

//         <h2 className="text-2xl font-bold mb-6">
//           Explore Hidden Gems
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {gems.map((gem) => (
//             <GemCard key={gem._id} gem={gem} />
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Explore;
import { useEffect, useState } from "react";
import { getGems } from "../api/gems";
import GemCard from "../components/GemCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
console.log(motion);

function Explore() {
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const res = await getGems();
        setGems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGems();
  }, []);

  return (
    <div className="min-h-screen bg-[#375932] relative overflow-hidden selection:bg-[#F2AB27] selection:text-[#375932]">
      <Navbar />

      {/* === BACKGROUND GHOST TEXT === */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
        <h1 className="font-seekuw text-[30vw] leading-none text-[#F2E1C2] whitespace-nowrap">
          DISCOVER
        </h1>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6">
        {/* HEADER SECTION */}
        <header className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-seekuw text-6xl md:text-8xl text-[#F2E1C2] tracking-tighter"
          >
            Hidden <span className="text-[#F2AB27]">Gems</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-neue text-[#738C5A] uppercase tracking-[0.4em] text-xs font-bold mt-2"
          >
            Unearthing the secrets of the concrete jungle
          </motion.p>
        </header>

        {/* GEMS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#F2AB27] border-t-transparent rounded-full"
            />
            <p className="font-neue text-[#F2AB27] mt-4 tracking-widest text-xs uppercase">
              Loading Map...
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gems.length > 0 ? (
              gems.map((gem) => (
                <motion.div
                  key={gem._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <GemCard gem={gem} />
                </motion.div>
              ))
            ) : (
              <p className="font-nourd text-[#F2E1C2] opacity-50 italic">
                No gems found in this sector yet...
              </p>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Explore;
