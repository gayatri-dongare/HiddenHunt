import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });
  console.log(motion);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // ... (Validation logic remains the same)
    try {
      setLoading(true);
      await registerUser({
  username: form.username,
  name: form.name,
  email: form.email,
  password: form.password,
  bio: form.bio,
});;
      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4a7045] p-4 overflow-hidden relative selection:bg-[#F2AB27] selection:text-[#738C5A]">
      {/* === BACKGROUND GHOST TEXT === */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-5 select-none">
        <h1 className="font-seekuw text-[25vw] leading-none text-[#F2E1C2] whitespace-nowrap -ml-20">
          HIDDEN HUNT
        </h1>
        <h1
          style={{ fontFamily: "Luckiest Guy" }}
          className=" text-[25vw] leading-none text-[#F2E1C2] whitespace-nowrap ml-20"
        >
          HIDDEN HUNT
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-[#F2AB27] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] w-full max-w-xl overflow-hidden"
      >
        <div className="bg-[#F2E1C2] p-8 md:p-12 rounded-[2.3rem] flex flex-col">
          <header className="text-center mb-8">
            <h2
              style={{ fontFamily: "Luckiest Guy" }}
              className=" text-6xl text-[#738C5A] mb-1"
            >
              Signup
            </h2>
            <p className="font-seekuw text-[#375932] uppercase tracking-[0.3em] text-[10px] font-bold">
              Join the elite explorers
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Username"
                className="font-nourd bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              <input
                placeholder="Name"
                className="font-nourd bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="font-nourd w-full bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="font-nourd w-full bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-neue text-[10px] font-bold text-[#738C5A] hover:text-[#375932]"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="font-nourd w-full bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Explorer Bio..."
              className="font-nourd w-full bg-[#f2ab27b4] text-[#738C5A] placeholder:text-[#738C5A]/60 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#375932] transition-all min-h-20 resize-none"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              className="font-seekuw w-full bg-[#375932] text-[#F2E1C2] py-5 rounded-2xl text-xl font-bold uppercase tracking-widest mx-auto hover:bg-[#738C5A] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Discovering..." : "Start Hunting"}
            </button>
          </form>

          <p className="font-nourd text-[#738C5A] text-center mt-6 text-sm">
            Part of the pack?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#375932] font-black cursor-pointer underline decoration-[#F2AB27] underline-offset-4"
            >
              Login here
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
