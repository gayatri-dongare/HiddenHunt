import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Explore from "./pages/Explore";
import AddGem from "./pages/AddGem";
import GemDetails from "./pages/GemDetails";
import Profile from "./pages/Profile";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />


        <Route path="/explore" element={<Explore />} />

        <Route path="/add" element={<AddGem />} />

        <Route path="/gem/:id" element={<GemDetails />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/trending" element={<Trending />} />

        <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;