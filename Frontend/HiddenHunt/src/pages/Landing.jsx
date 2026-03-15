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
import cafe from "../assets/cafe.png";
import mall from "../assets/mall.jpg";
import pizzaShop from "../assets/pizza-shop.png";
import temple from "../assets/temple.jpg";
import waterfall from "../assets/waterfall.png";
import fort from "../assets/fort.png";
import mountains from "../assets/mountains.png";
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

  // const stats = [
  //   { number: 10000, label: "Explorers" },
  //   { number: 3000, label: "Hidden Gems" },
  //   { number: 50, label: "Cities" },
  // ];

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
              className="text-5xl md:text-[9rem] leading-none tracking-tight text-[#F2AB27] font-medium drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              HIDDEN{" "}
              <span className="text-[#ffffff] drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                HUNT
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl font-light  tracking-[0.2em] text-[#F2E1C2]"
              style={{ fontFamily: "Ruslan Display" }}
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
              className="text-4xl md:text-7xl text-[#F2E1C2] mb-16 tracking-tight"
              style={{ fontFamily: "Ruslan Display" }}
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

        {/* === SHUTTER 2: EXPLORE. DISCOVER. SHARE. === */}
        <motion.section
          style={{ x: shutter3X }}
          className="absolute inset-0 z-20 bg-[#F2AB27] flex flex-col justify-center items-center px-10 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] overflow-hidden will-change-transform"
        >
          <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center">
            {/* CENTRAL TAGLINE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 text-center select-none"
            >
              <h2
                className="text-4xl md:text-7xl text-[#375932] leading-tight drop-shadow-sm tracking-tight"
                style={{ fontFamily: "Ruslan Display" }}
              >
                Explore. <br /> Discover. <br /> Share.
              </h2>
            </motion.div>

            {/* SPREAD OUT ICONS */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {[
                {
                  src: cafe,
                  pos: "top-[10%] left-[10%]",
                  delay: 0.1,
                  x: -60,
                  y: -60,
                },
                {
                  src: mall,
                  pos: "top-[10%] right-[10%]",
                  delay: 0.2,
                  x: 60,
                  y: -60,
                },
                {
                  src: pizzaShop,
                  pos: "bottom-[10%] left-[10%]",
                  delay: 0.3,
                  x: -60,
                  y: 60,
                },
                {
                  src: temple,
                  pos: "bottom-[10%] right-[10%]",
                  delay: 0.4,
                  x: 60,
                  y: 60,
                },
                {
                  src: waterfall,
                  pos: "top-[20%] left-[40%]",
                  delay: 0.5,
                  x: 0,
                  y: -40,
                },
                {
                  src: fort,
                  pos: "bottom-[25%] right-[35%]",
                  delay: 0.6,
                  x: 40,
                  y: 40,
                },
                {
                  src: mountains,
                  pos: "top-[50%] left-[5%]",
                  delay: 0.7,
                  x: -50,
                  y: 0,
                },
                {
                  src: cafe,
                  pos: "top-[50%] right-[5%]",
                  delay: 0.8,
                  x: 50,
                  y: 0,
                },
              ].map((icon, idx) => (
                <motion.div
                  key={idx}
                  className={`absolute pointer-events-auto ${icon.pos}`}
                  initial={{
                    opacity: 0,
                    x: icon.x || 0,
                    y: icon.y || 0,
                    scale: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: [0, idx % 2 === 0 ? 10 : -10, 0],
                  }}
                  viewport={{ once: false }}
                  transition={{
                    delay: icon.delay,
                    duration: 0.9,
                    type: "spring",
                    stiffness: 70,
                  }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      filter:
                        "brightness(1.1) drop-shadow(0 0 20px rgba(255,255,255,0.4))",
                    }}
                    className="bg-[#F2E1C2] p-3 md:p-5 rounded-full shadow-2xl group border-2 border-[#375932]/10"
                  >
                    <img
                      src={icon.src}
                      alt="icon"
                      className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full transition-transform group-hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* === SHUTTER 3: ADVENTURE === */}
        <motion.section
          style={{ x: shutter4X }}
          className="absolute inset-0 z-30 bg-[#F2E1C2] flex flex-col items-center justify-center px-10 shadow-[-40px_0_80px_rgba(0,0,0,0.5)] text-[#375932] will-change-transform"
        >
          <h2
            className="text-5xl md:text-8xl text-center leading-[0.85] text-[#F2AB27]"
            style={{ fontFamily: "Ruslan Display" }}
          >
            READY TO <br /> <span className="text-[#375932]">GET LOST?</span>
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="group relative overflow-hidden bg-[#F2AB27] text-[#738C5A] px-16 py-6 rounded-full text-xl font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
            style={{ fontFamily: "seekuw" }}
          >
            Join the Hunt
          </button>
          <footer
            className="absolute bottom-10 w-full text-center font-bold text-[#738C5A] text-sm tracking-widest uppercase"
            style={{ fontFamily: "nourd" }}
          >
            © {new Date().getFullYear()} Hidden Hunt — Designed for explorers
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
