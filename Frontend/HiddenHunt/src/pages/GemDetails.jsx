import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleGem, likeGem, getComments, addComment } from "../api/gems";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

import heart from "../assets/like.png";
import location from "../assets/visit.png";

function GemDetails() {
  const { id } = useParams();

  const [gem, setGem] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // ✅ FIXED MAP FUNCTION
  const getEmbedMap = (url) => {
    if (!url) return "";

    try {
      // Case 1: coordinates
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return `https://maps.google.com/maps?q=${match[1]},${match[2]}&output=embed`;
      }

      // Case 2: place link
      if (url.includes("/place/")) {
        const place = url.split("/place/")[1].split("/")[0];
        return `https://maps.google.com/maps?q=${place}&output=embed`;
      }

      // Case 3: maps.app.goo.gl (cannot embed)
      if (url.includes("maps.app.goo.gl")) {
        return null;
      }

      return null;
    } catch {
      return null;
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

  const embedUrl = getEmbedMap(gem.mapLink);

  return (
    <div className="min-h-screen bg-[#375932] pb-20">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pt-28 px-4"
      >
        <div className="bg-[#F2E1C2] rounded-[3rem] overflow-hidden shadow-2xl border-b-12 border-[#F2AB27]">

          {/* IMAGE */}
          <div className="relative h-100 md:h-137.5">
            <img
              src={gem.images?.[0]}
              className="w-full h-full object-cover"
              alt={gem.title}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#375932]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-[#F2E1C2]">
              <h1 className="text-5xl md:text-7xl uppercase">
                {gem.title}
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-widest mt-2">
                {gem.location}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 md:p-12 space-y-8">

            <p className="text-[#375932] text-lg">
              {gem.description}
            </p>

            <div className="flex gap-4">

              <button
                onClick={handleLike}
                className="bg-[#F2AB27] px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <img src={heart} className="w-6" />
                {gem.likes?.length || 0}
              </button>

              {gem.mapLink && (
                <button
                  onClick={() => setShowMap(true)}
                  className="bg-[#738C5A] text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <img src={location} className="w-6" />
                  View Map
                </button>
              )}

            </div>

            {/* COMMENTS */}
            <div>
              <form onSubmit={handleComment} className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setShowComments(true)}
                  placeholder="Add comment..."
                  className="flex-1 border p-3 rounded"
                />
                <button className="bg-green-600 text-white px-4 rounded">
                  Post
                </button>
              </form>

              {showComments && (
                <div className="mt-4 space-y-2">
                  {comments.map((c) => (
                    <div key={c._id}>
                      <b>{c.user?.username}</b>: {c.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </motion.div>

      {/* MAP MODAL */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-black/60"
            />

            <div className="bg-white p-4 rounded-xl w-[90%] max-w-3xl relative">

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="400"
                  className="rounded"
                />
              ) : (
                <div className="text-center p-10">
                  <p className="mb-4">Map preview not available</p>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <button onClick={() => setShowMap(false)}>
                  Close
                </button>

                <a
                  href={gem.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Open GPS
                </a>
              </div>

            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default GemDetails;