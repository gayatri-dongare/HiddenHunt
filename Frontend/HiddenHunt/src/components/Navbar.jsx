import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
console.log(motion);

// Asset Import
import diamondIcon from "../assets/foodbar.png"; // Ensure this path is correct

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Explore", path: "/explore" },
    { name: "Search", path: "/search" },
    { name: "Add Gem", path: "/add" },
    { name: "Trending", path: "/trending" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* === TOP NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#375932]/10 border-b border-[#F2E1C2]/10">
        {/* Left: Diamond Trigger */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 flex items-center justify-center bg-[#F2AB27] rounded-2xl shadow-lg cursor-pointer"
          >
            <img
              src={diamondIcon}
              alt="menu"
              className="w-8 h-8 object-contain"
            />
          </motion.button>

          <h1
            onClick={() => navigate("/explore")}
            className="font-seekuw text-3xl text-[#F2E1C2] cursor-pointer tracking-tight hidden md:block"
            style={{ fontFamily: "Luckiest Guy" }}
          >
            HIDDEN HUNT
          </h1>
        </div>

        {/* Right: Quick Action (Optional) */}
        <button
          onClick={() => navigate("/add")}
          className="font-neue bg-[#F2AB27] text-[#738C5A] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F2E1C2] hover:text-[#375932] transition-all shadow-md"
        >
          Add Gem
        </button>
      </nav>

      {/* === SIDEBAR OVERLAY === */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] md:w-[400px] bg-[#F2AB27] z-[120] shadow-2xl flex flex-col p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end font-neue text-[#738C5A] font-black text-xl hover:scale-125 transition-transform"
              >
                ✕
              </button>

              {/* Sidebar Header */}
              <div className="mt-8 mb-12">
                <h2
                  className="font-seekuw text-5xl text-[#738C5A] leading-none"
                  style={{ fontFamily: "seekuw" }}
                >
                  Treasure
                  <br />
                  box
                </h2>
                <div className="w-12 h-1 bg-[#375932] mt-4" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className="group flex items-center gap-4 cursor-pointer"
                  >
                    <span className="font-neue text-[10px] text-[#375932] opacity-50 font-bold">
                      0{index + 1}
                    </span>
                    <h4
                      className=" text-4xl md:text-3xl text-[#738C5A] group-hover:text-[#F2E1C2] group-hover:translate-x-3 transition-all"
                      style={{ fontFamily: "seekuw" }}
                    >
                      {item.name}
                      <div className="w-40 h-0.5 bg-[#f0f5ef] mt-4" />
                    </h4>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="mt-auto pt-10 border-t border-[#375932]/10">
                <p className="font-neue text-[10px] text-[#375932] uppercase tracking-[0.3em] font-bold">
                  Hidden Hunt — Discovery Awaits
                </p>
                <div className="font-nourd text-xs text-[#738C5A] mt-2 italic opacity-70">
                  Join the elite explorers.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
