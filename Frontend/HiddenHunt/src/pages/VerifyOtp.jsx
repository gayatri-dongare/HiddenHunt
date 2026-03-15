import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
console.log(motion);
function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });
      toast.success("Access Granted: Identity Verified");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Access Code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#738C5A] p-6 selection:bg-[#F2AB27] selection:text-[#375932]">
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#375932] rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F2AB27] rounded-full blur-[120px] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#F2E1C2] p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-md relative z-10 border-b-[12px] border-[#375932]"
      >
        <header className="text-center mb-10">
          <div className="inline-block bg-[#375932] text-[#F2AB27] p-4 rounded-2xl mb-6 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <h2
            className="text-4xl text-[#375932] mb-2"
            style={{ fontFamily: "Ruslan Display" }}
          >
            Final <span className="text-[#F2AB27]">Clearance</span>
          </h2>
          <p className="font-neue text-[10px] text-[#738C5A] uppercase tracking-[0.3em] font-black">
            Verifying: {email || "Agent"}
          </p>
        </header>

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="0 0 0 0 0 0"
              maxLength="6"
              className="w-full bg-[#375932]/5 border-3 border-transparent focus:border-[#F2AB27] p-6 rounded-2xl text-center text-4xl font-black tracking-[0.5em] text-[#375932] outline-none transition-all placeholder:text-[#375932]/10"
              style={{ fontFamily: "nourd" }}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              required
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#375932]/10 rounded-full" />
          </div>

          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden bg-[#375932] text-[#F2E1C2] py-5 rounded-2xl font-neue font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(55,89,50,0.4)] active:scale-95"
          >
            <span className="relative z-10">Verify Passcode</span>
            <motion.div
              className="absolute inset-0 bg-[#F2AB27]"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
            />
            <style jsx>{`
              button:hover span {
                color: #375932;
                transition: color 0.3s;
              }
            `}</style>
          </button>
        </form>

        <p className="mt-8 text-center font-neue text-[10px] text-[#738C5A] uppercase tracking-widest leading-loose">
          Secure Transmission System <br />
          <span className="opacity-40">Do not share this code with anyone</span>
        </p>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;
