import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { createGem } from "../api/gems";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
console.log(motion);
function AddGem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    mapLink: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (image) formData.append("image", image);

      await createGem(formData);
      toast.success("Intel Logged: New Gem Discovered! 💎");
      navigate("/explore");
    } catch (error) {
      console.log(error);
      toast.error("Transmission failed. Check your coordinates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-[#375932] pb-20 selection:bg-[#F2AB27] selection:text-[#375932]">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto pt-32 px-6"
      >
        <div className="bg-[#F2E1C2] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-b-10 border-[#F2AB27]">
          <header className="mb-10">
            <h2
              className="text-4xl md:text-5xl text-[#375932] mb-2"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              Log a <span className="text-[#F2AB27]">Discovery</span>
            </h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                  Gem Name
                </label>
                <input
                  placeholder="The Secret Waterfall"
                  className="w-full bg-[#375932]/5 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] font-nourd transition-all"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                  Location
                </label>
                <input
                  placeholder="City, Region"
                  className="w-full bg-[#375932]/5 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] font-nourd transition-all"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                Category
              </label>
              <input
                placeholder="Cafe, Nature, Viewpoint..."
                className="w-full bg-[#375932]/5 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] font-nourd transition-all"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                Maps URL
              </label>
              <input
                placeholder="https://goo.gl/maps/..."
                className="w-full bg-[#375932]/5 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] font-nourd transition-all text-sm"
                value={form.mapLink}
                onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                The Story
              </label>
              <textarea
                rows="4"
                placeholder="What makes this place special?"
                className="w-full bg-[#375932]/5 border-2 border-transparent focus:border-[#738C5A] p-4 rounded-2xl outline-none text-[#375932] font-nourd transition-all resize-none"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* CUSTOM IMAGE UPLOAD */}
            <div className="space-y-2">
              <label className="font-neue text-[10px] text-[#375932] font-black uppercase ml-2">
                Visuals of gem
              </label>
              <div className="relative group">
                <input
                  type="file"
                  id="gem-image"
                  onChange={handleImage}
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="gem-image"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#738C5A]/30 rounded-4xl cursor-pointer hover:border-[#F2AB27] hover:bg-[#F2AB27]/5 transition-all overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-3xl">📸</span>
                      <p className="font-neue text-[10px] text-[#738C5A] mt-2 font-black uppercase tracking-widest">
                        Upload Snapshot
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ fontFamily: "seekuw" }}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] transition-all shadow-xl ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#375932] text-[#F2E1C2] hover:bg-[#F2AB27] hover:text-[#375932]"
              }`}
            >
              {isSubmitting ? "Uploading Intel..." : "Deploy Gem to Map"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddGem;
