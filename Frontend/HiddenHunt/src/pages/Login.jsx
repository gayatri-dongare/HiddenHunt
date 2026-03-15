import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(motion);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome back, Explorer!");
      navigate("/explore");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#375932] p-4 overflow-hidden relative selection:bg-[#F2AB27] selection:text-[#738C5A]">
      {/* === BACKGROUND GHOST TEXT === */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-5 select-none">
        <h1 className="font-seekuw text-[25vw] leading-none text-[#F2E1C2] whitespace-nowrap -ml-20">
          HIDDEN HUNT
        </h1>
        <h1 className="font-seekuw text-[25vw] leading-none text-[#F2E1C2] whitespace-nowrap ml-20">
          HIDDEN HUNT
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-[#F2AB27] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] w-full max-w-md overflow-hidden"
      >
        <div className="bg-[#F2E1C2] p-8 md:p-12 rounded-[2.3rem] flex flex-col">
          <header className="text-center mb-10">
            <h2 className="font-seekuw text-6xl text-[#738C5A] mb-1">Login</h2>
            <p className="font-neue text-[#375932] uppercase tracking-[0.3em] text-[10px] font-bold">
              Access the secret map
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="font-neue text-[10px] text-[#738C5A] uppercase tracking-widest ml-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="explorer@hiddenhunt.com"
                className="font-nourd w-full bg-[#F2AB27] text-[#738C5A] placeholder:text-[#738C5A]/40 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-neue text-[10px] text-[#738C5A] uppercase tracking-widest ml-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="font-nourd w-full bg-[#F2AB27] text-[#738C5A] placeholder:text-[#738C5A]/40 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="font-neue w-full bg-[#375932] text-[#F2E1C2] py-5 mt-4 rounded-2xl text-xl font-bold uppercase tracking-widest hover:bg-[#738C5A] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Enter the Hunt"}
            </button>
          </form>

          <p className="font-nourd text-[#738C5A] text-center mt-8 text-sm">
            Lost your way?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#375932] font-black cursor-pointer underline decoration-[#F2AB27] underline-offset-4"
            >
              Signup here
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
