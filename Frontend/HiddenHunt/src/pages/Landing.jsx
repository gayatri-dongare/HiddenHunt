import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  // const doorRotateY = useTransform(scrollYProgress, [0, 0.3], [0, -135]);
  // const interiorZoom = useTransform(scrollYProgress, [0.3, 0.85], [1, 20]);
  // const interiorY = useTransform(scrollYProgress, [0.3, 0.85], [0, -150]);
  // const toBlackOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  // const buttonOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <div className="bg-[#242834] text-white selection:bg-[#7D53FF] overflow-x-hidden">
      {/* ====================== HERO ====================== */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center mb-6 text-center">
          <motion.h1
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
            className="text-8xl md:text-[12rem] font-bold font-['seekuw'] text-[#8EFF01] leading-[0.8] [text-shadow:4px_4px_0px_#000000]"
          >
            Hidden
          </motion.h1>
          <motion.h1
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 2.5,
              delay: 0.2,
              bounce: 0.3,
            }}
            className="text-8xl md:text-[12rem] font-bold font-['seekuw'] text-[#7D53FF] leading-[0.9] [text-shadow:4px_4px_0px_#000000]"
          >
            Hunt
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[#B6FF00] font-['Neue Einstellung'] tracking-[0.4em] uppercase text-xs"
        >
          Discover the hidden gems of your city
        </motion.p>
      </section>

      {/* ====================== FEATURED GEMS ====================== */}
      <section className="py-24 bg-[#1D2331]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-['Neue Einstellung'] text-center mb-16 text-[#7D53FF]"
          >
            Hidden Gems This Week
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Secret Rooftop Café",
                city: "Pune",
                img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34b4?q=80&w=800",
              },
              {
                title: "Forgotten Temple Alley",
                city: "Mumbai",
                img: "https://images.unsplash.com/photo-1558618047-3c8c76ca5d0c?q=80&w=800",
              },
              {
                title: "Midnight Street Art Lane",
                city: "Bangalore",
                img: "https://images.unsplash.com/photo-1484591974057-265bb767ef71?q=80&w=800",
              },
            ].map((gem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-3xl h-96"
              >
                <img
                  src={gem.img}
                  alt={gem.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-['nourd'] text-[#8EFF01] text-sm tracking-widest">
                    {gem.city}
                  </p>
                  <h3 className="text-3xl font-['nourd'] text-white">
                    {gem.title}
                  </h3>
                </div>
                <div className="absolute top-6 right-6 text-4xl opacity-30">
                  🔑
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== HOW IT WORKS ====================== */}
      <section className="min-h-screen py-24 flex items-center bg-[#242834]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-['Neue Einstellung'] text-center mb-20 text-[#B6FF00]"
          >
            Hunt in 3 Steps
          </motion.h2>
          <div className="space-y-24">
            {[
              {
                num: "01",
                title: "Spot Something Underrated",
                desc: "Walk your city. Click a photo. Post it.",
              },
              {
                num: "02",
                title: "Community Votes & Stories",
                desc: "Others discover it. Add tips. Rate it.",
              },
              {
                num: "03",
                title: "Earn Badges & Unlock Cities",
                desc: "Hunt more → level up → explore globally.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex gap-10 items-center"
              >
                <div className="font-['Neue Einstellung'] text-[120px] leading-none text-[#7D53FF] opacity-20">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-4xl font-['nourd'] mb-3">{step.title}</h3>
                  <p className="font-['nourd'] text-lg text-[#B6FF00]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA (door now sits right above this) ====================== */}
      <section className="h-50 flex flex-col items-center justify-center bg-black relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-6xl font-['Neue Einstellung'] mb-6 text-[#B6FF00]">
            Ready to Hunt?
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="px-20 py-8 bg-[#8EFF01] text-[#1D2331] rounded-full text-5xl font-['nourd'] font-bold hover:scale-105 transition-transform"
          >
            START YOUR JOURNEY
          </button>
        </motion.div>
        <div className="absolute top-12 left-12 text-8xl opacity-10">🏙️</div>
        <div className="absolute bottom-20 right-12 text-9xl opacity-10 rotate-12">
          🗝️
        </div>
      </section>

      {/* FOOTER */}
      <footer className="h-40 bg-black flex items-center justify-center">
        <p className="text-[#B6FF00] font-['nourd'] text-[10px] tracking-[0.5em] uppercase">
          Hidden Hunt • 2026 • Post Underrated Places in Your City
        </p>
      </footer>
    </div>
  );
}

export default Landing;
