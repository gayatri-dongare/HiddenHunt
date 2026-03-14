import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

import mapVideo from "../assets/map.mp4";

import compass from "../assets/compass.png";
import compassWest from "../assets/compass-west.png";
import adventure from "../assets/adventure.png";
import diamond from "../assets/daimond.png";

import coffee from "../assets/coffee.png";
import chat from "../assets/chatbubble.png";
import like from "../assets/like.png";
import location from "../assets/location.png";
import foodbar from "../assets/foodbar.png";
import visit from "../assets/visit.png";

import tree from "../assets/tree-wind.gif";

function Landing() {

  const navigate = useNavigate();

  const features = [
    {
      icon: coffee,
      title: "Hidden Cafés",
      text: "Discover secret cafés shared by explorers."
    },
    {
      icon: foodbar,
      title: "Food Places",
      text: "Find underrated restaurants and street food spots."
    },
    {
      icon: location,
      title: "Hidden Locations",
      text: "Explore hidden nature spots and scenic places."
    }
  ];

  const stats = [
    { number: 10000, label: "Explorers" },
    { number: 3000, label: "Hidden Gems" },
    { number: 50, label: "Cities" }
  ];

  return (

    <div className="relative min-h-screen overflow-x-hidden text-white">

      {/* VIDEO BACKGROUND */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-3]"
      >
        <source src={mapVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 z-[-2]" />

      {/* DECORATION PNGS */}

      <img src={compassWest} className="absolute top-10 left-10 w-40 opacity-20 pointer-events-none" />
      <img src={diamond} className="absolute bottom-20 left-20 w-28 opacity-20 pointer-events-none" />
      <img src={adventure} className="absolute top-40 right-10 w-32 opacity-20 pointer-events-none" />
      <img src={visit} className="absolute bottom-20 right-10 w-24 opacity-20 pointer-events-none" />
      <img src={tree} className="absolute bottom-0 right-1/3 w-40 opacity-40 pointer-events-none" />

      {/* HERO */}

      <div className="max-w-7xl mx-auto px-6 py-32 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="title-font text-6xl md:text-7xl bg-linear-to-r from-yellow-200 via-yellow-400 to-orange-400 bg-clip-text text-transparent"
        >
          HIDDEN HUNT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="tagline-font text-2xl md:text-3xl mt-6 text-gray-200"
        >
          Discover Hidden Gems Around You
        </motion.p>

        <div className="mt-10 flex justify-center gap-6">

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold shadow-lg"
          >
            Start Exploring
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-400 hover:bg-gray-700 px-8 py-3 rounded-lg"
          >
            Login
          </button>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="title-font text-4xl text-center mb-14">
          Explore Amazing Places
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {features.map((f, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:scale-105 transition"
            >

              <img src={f.icon} className="w-14 mb-4" />

              <h3 className="text-xl font-semibold mb-3">
                {f.title}
              </h3>

              <p className="text-gray-300 text-sm">
                {f.text}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* STATS */}

      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h2 className="title-font text-4xl mb-14">
          Our Growing Community
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {stats.map((s, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/50 backdrop-blur-md p-10 rounded-xl border border-white/10"
            >

              <h3 className="text-4xl font-bold text-green-400">
                <CountUp end={s.number} duration={2} separator="," />+
              </h3>

              <p className="text-gray-300 mt-2">
                {s.label}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* TRENDING PREVIEW */}

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="title-font text-4xl text-center mb-12">
          🔥 Trending Hidden Gems
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => navigate("/signup")}
              className="cursor-pointer bg-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition"
            >

              <img
                src={`https://picsum.photos/400?random=${i}`}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold flex items-center gap-2">
                  <img src={location} className="w-5" />
                  Hidden Location
                </h3>

                <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
                  <img src={like} className="w-4" />
                  Join to discover this place
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* CTA */}

      <div className="text-center py-24">

        <h2 className="title-font text-4xl mb-6">
          Ready for the Adventure?
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-yellow-400 text-black px-10 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Create Free Account
        </button>

      </div>

      {/* FOOTER */}

      <footer className="text-center text-gray-400 pb-10">

        <h3 className="title-font text-xl text-white">
          Hidden Hunt
        </h3>

        <p className="text-sm mt-2">
          Discover secret places shared by explorers.
        </p>

        <p className="text-xs mt-4">
          © {new Date().getFullYear()} Hidden Hunt
        </p>

      </footer>

    </div>
  );
}

export default Landing;