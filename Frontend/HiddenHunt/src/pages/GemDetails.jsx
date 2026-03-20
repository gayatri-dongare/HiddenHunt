import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleGem, likeGem, getComments, addComment } from "../api/gems";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import heart from "../assets/like.png";
import location from "../assets/visit.png";
console.log(motion);

function GemDetails() {
  const { id } = useParams();
  const [gem, setGem] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showMap, setShowMap] = useState(false);
  // NEW STATE: Controls visibility of the comment list
  const [showComments, setShowComments] = useState(false);

  const getEmbedMap = (url) => {
    if (!url) return "";

    try {
      // 1. Extract Lat/Lng (e.g., from @40.712,-74.006)
      const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&z=14&output=embed`;
      }

      // 2. Extract Place Name (e.g., from /place/Central+Park/)
      const placeMatch = url.match(/\/place\/([^/@]+)/);
      if (placeMatch) {
        return `https://maps.google.com/maps?q=${placeMatch[1]}&z=14&output=embed`;
      }

      // 3. Fallback: Clean the URL and ensure it has output=embed
      // Important: replace 'www.google.com/maps' with 'maps.google.com/maps' for better compatibility
      let cleanUrl = url.replace("www.google.com/maps", "maps.google.com/maps");
      if (!cleanUrl.includes("output=embed")) {
        cleanUrl += cleanUrl.includes("?") ? "&output=embed" : "?output=embed";
      }
      return cleanUrl;
    } catch (err) {
      console.error("Map parsing error", err);
      return "";
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [gemRes, commentRes] = await Promise.all([
          getSingleGem(id),
          getComments(id),
        ]);
        setGem(gemRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, [id]);

  const handleLike = async () => {
    try {
      await likeGem(id);
      const res = await getSingleGem(id);
      setGem(res.data);
      toast.success("Gem captured in your favorites!");
    } catch {
      toast.error("Capture failed");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await addComment(id, text);
      const res = await getComments(id);
      setComments(res.data);
      setText("");
      toast.success("Intel shared!");
    } catch {
      toast.error("Transmission failed");
    }
  };

  if (!gem)
    return (
      <div className="min-h-screen bg-[#375932] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#F2AB27] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#375932] pb-20 selection:bg-[#F2AB27] selection:text-[#375932]">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pt-28 px-4"
      >
        <div className="bg-[#F2E1C2] rounded-[3rem] overflow-hidden shadow-2xl border-b-12 border-[#F2AB27]">
          {/* IMAGE HERO */}
          <div className="relative h-100 md:h-137.5">
            <img
              src={gem.images?.[0]}
              className="w-full h-full object-cover"
              alt={gem.title}
            />
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F2AB27] border-2 border-[#F2E1C2] flex items-center justify-center shadow-2xl">
                <span className="font-seekuw text-[#375932] text-2xl font-black uppercase">
                  {gem.user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="font-neue text-[10px] text-white/60 uppercase tracking-widest font-bold leading-none">
                  Posted By
                </p>
                <p className="font-nourd text-[#F2E1C2] text-sm font-bold uppercase">
                  {gem.user?.name || "Unknown"}
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-[#375932]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-[#F2E1C2]">
              <h1
                className=" text-5xl md:text-7xl leading-none uppercase"
                style={{ fontFamily: "seekuw" }}
              >
                {gem.title}
              </h1>
              <p className="font-neue text-xs md:text-sm uppercase tracking-[0.4em] font-bold mt-2 opacity-90">
                {gem.location}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-seekuw text-[#738C5A] uppercase tracking-widest text-xs font-black mb-4">
                  The Discovery
                </h3>
                <p className="font-seekuw text-[#375932] text-xl leading-relaxed">
                  {gem.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleLike}
                  className="font-seekuw bg-[#F2AB27] text-[#738C5A] px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#375932] hover:text-[#F2E1C2] transition-all"
                >
                  <img src={heart} alt="heart" className="w-7 h-7" />
                  {gem.likes?.length || 0} APPRECIATIONS
                </button>
                {gem.mapLink && (
                  <button
                    onClick={() => setShowMap(true)}
                    className="font-seekuw bg-[#738C5A] text-[#F2E1C2] px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-[#F2AB27] hover:text-[#738C5A] transition-all"
                  >
                    <img src={location} alt="location" className="w-7 h-7" />
                    VIEW ON MAP
                  </button>
                )}
              </div>

              {/* COMMENTS SECTION */}
              <div className="pt-8 border-t border-[#738C5A]/20">
                <h3 className="font-seekuw text-4xl text-[#375932] mb-6">
                  comments ({comments.length})
                </h3>

                <form onSubmit={handleComment} className="flex gap-3 mb-4">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    // TRIGGER: Opens comments on click/focus
                    onFocus={() => setShowComments(true)}
                    placeholder="Add your note..."
                    className="font-nourd flex-1 bg-[#F2AB27]/20 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] placeholder:text-[#738C5A]/60"
                  />
                  <button className="font-neue bg-[#375932] text-[#F2E1C2] px-8 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#F2AB27] hover:text-[#738C5A] transition-all">
                    POST
                  </button>
                </form>

                {/* ANIMATED COMMENT LIST */}
                <AnimatePresence>
                  {showComments && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-4">
                        {comments.length > 0 ? (
                          comments.map((c) => (
                            <div
                              key={c._id}
                              className="bg-[#738C5A]/5 p-4 rounded-2xl border-l-4 border-[#F2AB27]"
                            >
                              {/* Only the Username is displayed now */}
                              <p className="font-neue text-[10px] text-[#738C5A] font-black uppercase tracking-tighter mb-1">
                                {c.user?.username}
                              </p>

                              <p className="font-nourd text-[#375932]">
                                {c.text}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="font-neue text-xs text-[#738C5A] text-center py-4">
                            No comment yet. Be the first!
                          </p>
                        )}
                        <button
                          onClick={() => setShowComments(false)}
                          className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-[#738C5A] hover:text-[#375932]"
                        >
                          ↑ Close Comments
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* SIDEBAR INFO */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#375932] text-[#F2E1C2] p-8 rounded-4xl space-y-4 shadow-xl">
                <h4 className="font-seekuw text-3xl">Info</h4>
                <div>
                  <p className="font-neue text-[10px] opacity-50 uppercase tracking-widest">
                    Published
                  </p>
                  <p className="font-nourd">
                    {new Date(gem.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F2E1C2]/10">
                  <p className="font-neue text-[10px] opacity-50 uppercase tracking-widest">
                    Status
                  </p>
                  <p className="font-nourd">Verified Hidden Gem</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MODAL MAP (Kept original logic) */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-[#375932]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#F2E1C2] p-2 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={getEmbedMap(gem.mapLink)}
                width="100%"
                height="450"
                className="rounded-4xl"
                loading="lazy"
                title="map"
              />
              <div className="p-6 flex justify-between items-center">
                <button
                  onClick={() => setShowMap(false)}
                  className="font-neue text-[#738C5A] font-bold underline underline-offset-4 uppercase text-xs"
                >
                  Close map preview
                </button>
                <a
                  href={gem.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-neue bg-[#375932] text-[#F2E1C2] px-6 py-3 rounded-xl font-bold uppercase text-xs"
                >
                  Open GPS
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GemDetails;