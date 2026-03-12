import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    bio: ""
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Signup
        </h2>

        <form className="flex flex-col gap-4">

          <input
            placeholder="Username"
            className="border p-2 rounded"
            onChange={(e) => setForm({...form, username:e.target.value})}
          />

          <input
            placeholder="Name"
            className="border p-2 rounded"
            onChange={(e) => setForm({...form, name:e.target.value})}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            onChange={(e) => setForm({...form, email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={(e) => setForm({...form, password:e.target.value})}
          />

          <input
            placeholder="Bio"
            className="border p-2 rounded"
            onChange={(e) => setForm({...form, bio:e.target.value})}
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Signup
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;