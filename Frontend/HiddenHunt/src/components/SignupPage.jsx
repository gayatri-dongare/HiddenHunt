import React from "react";
import treeWind from "../assets/window.png";
import bottomMov from "../assets/wind2.gif";

const SignupPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans relative">
      <style>
        {`
          @keyframes windSway {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-10px, -3px) rotate(-0.5deg); }
            50% { transform: translate(-15px, 0px) rotate(0.2deg); }
            75% { transform: translate(-8px, 3px) rotate(-0.2deg); }
          }
          .floating-card {
            animation: windSway 8s ease-in-out infinite;
          }
        `}
      </style>

      {/* HORIZONTAL "THE HUNT BEGINS" TEXT ON THE SEAM */}
      <div className="absolute top-[25%] left-10 z-20 pointer-events-none">
        <h4 className="text-4xl font-bold text-blue-300 opacity-60 select-none tracking-[0.3em] uppercase">
          The Hunt Begins Here.
        </h4>
      </div>

      {/* TOP SECTION: Narrow "Atmosphere" (25% Height) */}
      <div className="h-[25%] w-full bg-[#d6b5df] relative overflow-hidden border-b border-white/20">
        <img
          src={treeWind}
          alt="Windy Tree"
          className="absolute -top-5 right-10 w-40 h-auto opacity-60"
        />
        <div className="absolute top-10 left-10">
          <span className="text-white/40 font-black text-8xl uppercase leading-none">
            01
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION: Deep "Canvas" (75% Height) */}
      <div className="flex-1 bg-gray-50 relative flex justify-center items-center">
        {/* THE WIDER FLOATING CARD */}
        <div className="z-10 floating-card bg-white p-12 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.08)] w-full max-w-2xl border border-gray-100 flex flex-col md:flex-row gap-10">
          {/* Form Side */}
          <div className="flex-1">
            <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-400 mb-8 text-sm font-medium">
              Join the hunt. Fill in your details.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner"
                  placeholder="hunter@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 mt-4"
              >
                Start Your Journey
              </button>
            </form>
          </div>

          {/* Decorative/Info Side inside the Card */}
          <div className="hidden md:flex w-1/3 bg-blue-50 rounded-3xl p-6 flex-col justify-between items-start border border-blue-100/50">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-blue-900/60 text-xs font-semibold leading-relaxed">
              "Create your account and discover hidden places around the world."
            </p>
          </div>
        </div>

        {/* The gif moving container (pinned to the very bottom) */}
        <div className="bg-[#F1E2E0] h-40 w-64 absolute bottom-0 right-10 rounded-t-full flex justify-center overflow-hidden border-t border-x border-gray-200/50">
          <img
            src={bottomMov}
            alt="Decoration"
            className="w-32 h-auto object-contain opacity-70 mt-4"
          />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
      </div>
    </div>
  );
};

export default SignupPage;
