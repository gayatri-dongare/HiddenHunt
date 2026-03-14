import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";

function Signup() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    // USERNAME VALIDATION
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(form.username)) {
      toast.error(
        "Username must be 3–20 characters and contain only letters, numbers or _"
      );
      return;
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      toast.error(
        "Password must contain 8+ characters, uppercase, lowercase, number and special character"
      );
      return;
    }

    // CONFIRM PASSWORD CHECK
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      await registerUser({
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio
      });

      toast.success("OTP sent to your email");

      navigate("/verify-otp", {
        state: { email: form.email }
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup failed"
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            placeholder="Username"
            className="border p-2 rounded"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* PASSWORD FIELD */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

          </div>

          {/* CONFIRM PASSWORD */}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="border p-2 rounded"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <input
            placeholder="Bio"
            className="border p-2 rounded"
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Signup"}
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