import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

// Asset Imports
import pixelsBg from "../assets/bus.gif";
import compassWest from "../assets/compass-west.png";
import tree from "../assets/tree-wind.gif";
import coffee from "../assets/coffee.png";
import foodbar from "../assets/foodbar.png";
import location from "../assets/location.png";
console.log(motion);

function Landing() {
  const navigate = useNavigate();
  const targetRef = useRef(null);

  // Use 'target' and 'offset' to ensure tracking is 1:1 with the 400vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Precise shutter timing to prevent "overlapping" or "floating" sensations
  // Section 2 covers Section 1 (0% -> 33% of total scroll)
  const shutter2X = useTransform(scrollYProgress, [0, 0.33], ["100%", "0%"]);
  // Section 3 covers Section 2 (33% -> 66% of total scroll)
  const shutter3X = useTransform(scrollYProgress, [0.33, 0.66], ["100%", "0%"]);
  // Section 4 covers Section 3 (66% -> 100% of total scroll)
  const shutter4X = useTransform(scrollYProgress, [0.66, 1], ["100%", "0%"]);

  // Parallax for Hero Title
  const titleX = useTransform(scrollYProgress, [0, 0.25], [0, -150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const features = [
    {
      icon: coffee,
      title: "Hidden Cafés",
      text: "Discover secret artisanal spots.",
    },
    {
      icon: foodbar,
      title: "Food Places",
      text: "Find underrated local flavors.",
    },
    {
      icon: location,
      title: "Hidden Locations",
      text: "Explore untouched nature spots.",
    },
  ];

  const stats = [
    { number: 10000, label: "Explorers" },
    { number: 3000, label: "Hidden Gems" },
    { number: 50, label: "Cities" },
  ];

  return (
    // 'overflow-visible' on the parent allows the sticky child to track correctly
    <div
      ref={targetRef}
      className="relative h-[400vh] bg-[#375932] overflow-visible"
    >
      {/* Sticky container stays pinned to the viewport while you scroll the 400vh parent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* === BASE LAYER: HERO (Stays put, Title moves) === */}
        <section className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-6">
          <img
            src={pixelsBg}
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-[-1]"
            alt="bg"
          />
          <motion.div
            style={{ x: titleX, opacity: titleOpacity }}
            className="space-y-4"
          >
            <h1
              className="text-8xl md:text-[12rem] leading-none tracking-tight text-[#F2AB27]"
              style={{ fontFamily: "seekuw" }}
            >
              HIDDEN <span className="text-[#F2E1C2]">HUNT</span>
            </h1>
            <p
              className="text-xl md:text-3xl font-light uppercase tracking-[0.4em] text-[#F2E1C2]"
              style={{ fontFamily: "Neue Einstellung" }}
            >
              Discover Gems Around You
            </p>
          </motion.div>
        </section>

        {/* === SHUTTER 1: EXPLORE === */}
        <motion.section
          style={{ x: shutter2X }}
          className="absolute inset-0 z-10 bg-[#738C5A] flex items-center px-10 md:px-32 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] will-change-transform"
        >
          <div className="w-full max-w-7xl mx-auto">
            <h2
              className="text-6xl md:text-8xl text-[#F2E1C2] mb-16 tracking-tight"
              style={{ fontFamily: "seekuw" }}
            >
              The Hunt is On
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((f, i) => (
                <div key={i} className="group space-y-4">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#F2AB27] rounded-2xl rotate-3 group-hover:rotate-0 transition-transform">
                    <img
                      src={f.icon}
                      className="w-12 h-12 object-contain"
                      alt="icon"
                    />
                  </div>
                  <h3
                    className="text-3xl text-[#F2AB27]"
                    style={{ fontFamily: "seekuw" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed text-[#F2E1C2]"
                    style={{ fontFamily: "nourd" }}
                  >
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* === SHUTTER 2: STATS === */}
        <motion.section
          style={{ x: shutter3X }}
          className="absolute inset-0 z-20 bg-[#F2AB27] flex flex-col justify-center items-center px-10 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] will-change-transform"
        >
          <h2
            className="text-6xl md:text-8xl text-[#738C5A] mb-24"
            style={{ fontFamily: "seekuw" }}
          >
            Our Community
          </h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 w-full max-w-6xl">
            {stats.map((s, i) => (
              <div key={i} className="text-center space-y-2">
                <h3
                  className="text-7xl md:text-9xl font-black text-[#738C5A]"
                  style={{ fontFamily: "nourd" }}
                >
                  <CountUp end={s.number} duration={1.5} enableScrollSpy />+
                </h3>
                <p
                  className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#375932]"
                  style={{ fontFamily: "Neue Einstellung" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* === SHUTTER 3: ADVENTURE === */}
        <motion.section
          style={{ x: shutter4X }}
          className="absolute inset-0 z-30 bg-[#F2E1C2] flex flex-col items-center justify-center px-10 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] text-[#375932] will-change-transform"
        >
          <h2
            className="text-7xl md:text-[10rem] mb-12 text-center leading-[0.85] text-[#F2AB27]"
            style={{ fontFamily: "seekuw" }}
          >
            READY TO <br /> <span className="text-[#375932]">GET LOST?</span>
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="group relative overflow-hidden bg-[#F2AB27] text-[#738C5A] px-16 py-6 rounded-full text-2xl font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
            style={{ fontFamily: "Neue Einstellung" }}
          >
            Join the Hunt
          </button>
          <footer
            className="absolute bottom-10 w-full text-center font-bold text-[#738C5A] text-sm tracking-widest uppercase"
            style={{ fontFamily: "nourd" }}
          >
            © {new Date().getFullYear()} Hidden Hunt — Designed for the Brave
          </footer>
        </motion.section>
      </div>

      {/* DECORATIONS - Put inside the 400vh container but keep them 'fixed' */}
      <img
        src={compassWest}
        className="fixed top-8 left-8 w-24 md:w-32 opacity-30 pointer-events-none z-50 invert"
      />
      <img
        src={tree}
        className="fixed bottom-0 right-4 w-40 md:w-64 opacity-40 pointer-events-none z-50"
      />
    </div>
  );
}

export default Landing;
