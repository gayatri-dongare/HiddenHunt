import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });

      toast.success("Email verified successfully");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "OTP verification failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Verify Email
        </h2>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 rounded text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>

        </form>

      </div>

    </div>

  );
}

export default VerifyOtp;