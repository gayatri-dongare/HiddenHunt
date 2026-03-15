import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function GemCard({ gem }) {
  const navigate = useNavigate();
  console.log(motion);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/gem/${gem._id}`)}
      className="group relative bg-[#F2E1C2] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl border-b-4 border-[#738C5A] transition-all"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={gem.images?.[0] || "https://picsum.photos/400"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={gem.title}
        />
        {/* LIKES BADGE */}
        <div className="absolute top-4 right-4 bg-[#F2AB27] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <span className="text-[#738C5A] text-xs font-bold font-neue">
            {gem.likes?.length || 0} LIKES
          </span>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 relative">
        {/* DECORATIVE GHOST TEXT (Subtle background initial) */}
        <span className="absolute right-2 bottom-0 font-seekuw text-6xl opacity-5 text-[#375932] pointer-events-none uppercase">
          {gem.title.charAt(0)}
        </span>

        <h3 className="font-seekuw text-3xl text-[#375932] leading-none mb-2">
          {gem.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#F2AB27]" />
          <p className="font-neue text-[10px] text-[#738C5A] uppercase tracking-[0.2em] font-bold">
            {gem.location}
          </p>
        </div>

        <button className="font-neue w-full bg-[#738C5A] text-[#F2AB27] py-3 rounded-xl text-xs font-bold uppercase tracking-widest group-hover:bg-[#375932] group-hover:text-[#F2E1C2] transition-colors">
          Explore Detail
        </button>
      </div>
    </motion.div>
  );
}

export default GemCard;
