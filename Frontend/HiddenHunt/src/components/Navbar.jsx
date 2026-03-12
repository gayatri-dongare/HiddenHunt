// import videoBg from "../assets/streets.mp4";

// function Navbar() {
//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       <video
//         autoPlay
//         loop
//         muted
//         className="absolute w-full h-full object-cover blur-[2px]"
//       >
//         <source src={videoBg} type="video/mp4" />
//       </video>

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Navbar */}
//       <nav className="relative flex justify-between items-center px-10 py-6 z-10">
//         <h1 className="text-xl font-bold text-white font-cursive">
//           Hidden Hunt
//         </h1>

//         {/* <div className="flex gap-8 text-white text-sm font-cursive">
//           <a href="#">Home</a>
//           <a href="#">Explore</a>
//           <a href="#">About</a>
//           <a href="#">Login</a>
//           <a href="#">Signup</a>
//         </div> */}
//       </nav>

//       {/* Hero Text */}
//       <div className="relative flex flex-col font-cursive items-center justify-center h-full text-white">
//         <h2 className="text-lg tracking-widest mb-2">
//           FIND THE GEMS YOUR CITY HIDES
//         </h2>
//         <h1 className="text-8xl font-bold tracking-wider ">HIDDEN HUNT</h1>
//         <button className="mt-10 px-8 py-2 border-2 border-white text-white font-bold rounded-full transition duration-300 ease-in-out hover:bg-white hover:text-black">
//           Get Started button
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <h1
        onClick={() => navigate("/explore")}
        className="text-xl font-bold text-green-700 cursor-pointer"
      >
        Hidden Hunt
      </h1>

      <div className="flex gap-4">
        <button
        onClick={() => navigate("/search")}
        className="text-gray-700 hover:text-green-700"
        >
        Search
        </button>
        <button
          onClick={() => navigate("/explore")}
          className="text-gray-700 hover:text-green-700"
        >
          Explore
        </button>

        <button
          onClick={() => navigate("/add")}
          className="text-gray-700 hover:text-green-700"
        >
          Add Gem
        </button>

        <button
          onClick={() => navigate("/trending")}
          className="text-gray-700 hover:text-green-700"
        >
          Trending
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-gray-700 hover:text-green-700"
        >
          Profile
        </button>

      </div>

    </div>
  );
}

export default Navbar;