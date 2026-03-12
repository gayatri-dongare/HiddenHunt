import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-green-100 to-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold text-green-700 mb-4">
        Hidden Hunt
      </h1>

      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Discover the hidden gems of your city. Explore secret cafés,
        peaceful viewpoints, and amazing places shared by locals.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition"
        >
          Signup
        </button>
      </div>

    </div>
  );
}

export default Landing;