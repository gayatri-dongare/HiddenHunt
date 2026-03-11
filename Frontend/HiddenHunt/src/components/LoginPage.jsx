import React from "react";
import treeWind from "../assets/window.png";
import bottomMov from "../assets/wind2.gif";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans relative">
      <style>
        {`
          @keyframes windSway {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-12px, -5px) rotate(-1deg); }
            50% { transform: translate(-20px, 0px) rotate(0.5deg); }
            75% { transform: translate(-10px, 5px) rotate(-0.5deg); }
          }
          .floating-card {
            animation: windSway 7s ease-in-out infinite;
          }
        `}
      </style>

      {/* THE VERTICAL "WELCOME" TEXT ON THE SEAM */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <h4
          className="text-4xl font-blue-500 text-blue-300 font-bold family-cursive select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          The Hunt Begins Here.
        </h4>
      </div>

      {/* LEFT HALF */}
      <div className="relative flex-1 bg-[#d6b5df]">
        <img
          src={treeWind}
          alt="Windy Tree"
          className="absolute top-10 left-4 w-59 h-auto opacity-80"
        />

        <div className="bg-[#F1E2E0] h-60 w-full absolute bottom-0 right-0">
          <img
            src={bottomMov}
            alt="Windy Tree"
            className="absolute bottom-8 right-8 w-48 h-auto opacity-80"
          />
        </div>
      </div>

      {/* RIGHT HALF */}
      <div className="flex-1 flex justify-center items-center bg-gray-50 relative">
        {/* Removed min-h-screen here to prevent overflow/scrolling */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* THE FLOATING CARD */}
          <div className="z-10 floating-card bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Login
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              Please enter your details.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Background Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
