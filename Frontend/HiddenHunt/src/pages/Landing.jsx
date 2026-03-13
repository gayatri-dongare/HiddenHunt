import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#242834] px-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-125 h-125 bg-[#B6FF00] opacity-5 blur-[120px] rounded-full -z-10"></div>

      {/* Heading Container */}
      <div className="flex flex-col items-center mb-6">
        {/* HIDDEN - From Top Left */}
        <h1 className="animate-hidden text-8xl md:text-[12rem] font-bold font-['seekuw'] text-[#8EFF01] leading-[0.8]">
          Hidden
        </h1>

        {/* HUNT - From Bottom Right */}
        <h1 className="animate-hunt text-8xl md:text-[12rem] font-bold font-['seekuw'] text-[#8EFF01] leading-[0.9] shadow-black">
          Hunt
        </h1>
      </div>

      {/* Tagline - Delayed fade in */}
      <p className="fade-in-up text-xl md:text-2xl text-[#B6FF00] font-['Neue_Einstellung'] max-w-lg mb-12">
        Discover the hidden gems of your city.
      </p>

      {/* Explore Button */}
      <button
        onClick={() => navigate("/Signup")}
        className="fade-in-up px-14 py-5 bg-[#8EFF01] text-[#1D2331] rounded-full text-2xl font-bold font-['nourd'] shadow-xl transition-all duration-300 hover:bg-[#7D53FF] hover:text-white hover:scale-105 active:scale-95"
        style={{ animationDelay: "1.8s" }}
      >
        Explore
      </button>

      {/* Bottom bar detail (Optional) */}
      <div className="absolute bottom-10 w-32 h-1 bg-[#7D53FF] rounded-full opacity-20"></div>
    </div>
  );
}

export default Landing;
