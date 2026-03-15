// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import { getUserGems, deleteGem, updateGem } from "../api/gems";
// import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Profile() {

//   const navigate = useNavigate();

//   const [gems, setGems] = useState([]);
//   const [editingGem, setEditingGem] = useState(null);

//   const [editForm, setEditForm] = useState({
//     title: "",
//     location: "",
//     category: "",
//     description: ""
//   });

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {

//     const fetchGems = async () => {
//       try {

//         const res = await getUserGems(user._id);
//         setGems(res.data);

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (user?._id) {
//       fetchGems();
//     }

//   }, [user?._id]);

//   const handleDelete = async (id) => {

//     try {

//       await deleteGem(id);

//       setGems((prev) => prev.filter((g) => g._id !== id));

//       toast.success("Gem deleted successfully");

//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to delete gem");
//     }

//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {

//       await updateGem(editingGem._id, editForm);

//       setGems((prev) =>
//         prev.map((g) =>
//           g._id === editingGem._id
//             ? { ...g, ...editForm, updatedAt: new Date() }
//             : g
//         )
//       );

//       toast.success("Gem updated successfully");

//       setEditingGem(null);

//     } catch (error) {
//       console.log(error);
//       toast.error("Update failed");
//     }
//   };

//  const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");

//   window.location.replace("/");
// };

//   return (
//     <div className="min-h-screen bg-gray-100">

//       <Navbar />

//       <div className="max-w-6xl mx-auto mt-8 px-4">

//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">

//           <h2 className="text-2xl font-bold text-green-700">
//             {user?.username}
//           </h2>

//           <p className="text-gray-600">
//             {user?.bio || "Hidden Hunt Explorer"}
//           </p>

//         </div>

//         <h3 className="text-xl font-semibold mb-4">
//           My Gems
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {gems.map((gem) => (

//             <div
//               key={gem._id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >

//               <img
//                 src={gem.images?.[0] || "https://picsum.photos/400"}
//                 className="w-full h-48 object-cover cursor-pointer"
//                 onClick={() => navigate(`/gem/${gem._id}`)}
//               />

//               <div className="p-4">

//                 <h3 className="font-semibold">
//                   {gem.title}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   {gem.location}
//                 </p>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Published: {new Date(gem.createdAt).toLocaleDateString()}
//                 </p>

//                 {gem.updatedAt !== gem.createdAt && (
//                   <p className="text-xs text-gray-400">
//                     Edited: {new Date(gem.updatedAt).toLocaleDateString()}
//                   </p>
//                 )}

//                 <div className="flex justify-between items-center mt-2">

//                   <span className="text-sm">
//                     ❤️ {gem.likes?.length || 0}
//                   </span>

//                   <div className="flex gap-4">

//                     <FaEye
//                       className="cursor-pointer text-green-600"
//                       onClick={() => navigate(`/gem/${gem._id}`)}
//                     />

//                     <FaEdit
//                       className="cursor-pointer text-blue-600"
//                       onClick={() => {
//                         setEditingGem(gem);
//                         setEditForm({
//                           title: gem.title,
//                           location: gem.location,
//                           category: gem.category,
//                           description: gem.description
//                         });
//                       }}
//                     />

//                     <FaTrash
//                       className="cursor-pointer text-red-600"
//                       onClick={() => handleDelete(gem._id)}
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//         <div className="mt-10 flex justify-center">

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>

//         </div>

//       </div>

//       {editingGem && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-lg w-100">

//             <h2 className="text-xl font-bold mb-4">
//               Edit Gem
//             </h2>

//             <form onSubmit={handleUpdate} className="flex flex-col gap-3">

//               <input
//                 value={editForm.title}
//                 onChange={(e)=>setEditForm({...editForm,title:e.target.value})}
//                 className="border p-2 rounded"
//               />

//               <input
//                 value={editForm.location}
//                 onChange={(e)=>setEditForm({...editForm,location:e.target.value})}
//                 className="border p-2 rounded"
//               />

//               <input
//                 value={editForm.category}
//                 onChange={(e)=>setEditForm({...editForm,category:e.target.value})}
//                 className="border p-2 rounded"
//               />

//               <textarea
//                 value={editForm.description}
//                 onChange={(e)=>setEditForm({...editForm,description:e.target.value})}
//                 className="border p-2 rounded"
//               />

//               <div className="flex gap-3 mt-3">

//                 <button className="bg-green-600 text-white px-4 py-2 rounded">
//                   Update
//                 </button>

//                 <button
//                   type="button"
//                   onClick={()=>setEditingGem(null)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default Profile;
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import like from "../assets/like.png";
import { getUserGems, deleteGem, updateGem } from "../api/gems";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaTimes,
  FaCertificate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
console.log(motion);
function Profile() {
  const navigate = useNavigate();
  const [gems, setGems] = useState([]);
  const [editingGem, setEditingGem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const res = await getUserGems(user._id);
        setGems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?._id) fetchGems();
  }, [user?._id]);

  // --- REAL DATA CALCULATIONS ---
  const totalLikes = gems.reduce(
    (acc, gem) => acc + (gem.likes?.length || 0),
    0,
  );

  // Real Impact: 10 points per gem posted + 1 point per like received
  const impactValue = gems.length * 10 + totalLikes;

  const getRank = (score) => {
    if (score === 0) return "Newcomer";
    if (score < 50) return "Scout";
    if (score < 150) return "Explorer";
    if (score < 500) return "Pathfinder";
    return "Elite Hunter";
  };

  const formatImpact = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Abandon this discovery?")) return;
    try {
      await deleteGem(id);
      setGems((prev) => prev.filter((g) => g._id !== id));
      toast.success("Discovery purged.");
    } catch (error) {
      toast.error("Failed to delete.");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateGem(editingGem._id, editForm);
      setGems((prev) =>
        prev.map((g) =>
          g._id === editingGem._id
            ? { ...g, ...editForm, updatedAt: new Date() }
            : g,
        ),
      );
      toast.success("Intel Updated.");
      setEditingGem(null);
    } catch (error) {
      toast.error("Update failed.");
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className="min-h-screen bg-[#375932] text-[#F2E1C2] pb-20">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-64 bg-[#738C5A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute -bottom-1 w-full h-24 bg-linear-to-t from-[#375932] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
          {/* AVATAR */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-40 h-40 rounded-[3rem] bg-[#F2AB27] border-8 border-[#375932] shadow-2xl flex items-center justify-center text-6xl font-black text-[#375932]"
            style={{ fontFamily: "Ruslan Display" }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </motion.div>

          {/* USER INFO */}
          <div className="flex-1 text-center md:text-left mb-4">
            <h2
              className="text-4xl font-black tracking-tight font-light "
              style={{ fontFamily: "Luckiest Guy" }}
            >
              {user?.username}
            </h2>
            <p className="font-neue text-[#F2AB27] uppercase tracking-widest text-sm font-bold flex items-center justify-center md:justify-start gap-2">
              <FaCertificate className="text-xs" /> {getRank(impactValue)}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#F2AB27] text-[#375932] px-6 py-3 rounded-2xl font-black hover:bg-white transition-all shadow-lg text-xs tracking-widest"
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>

        {/* REAL STATS BAR */}
        <div className="grid grid-cols-3 bg-[#F2E1C2]/10 backdrop-blur-md rounded-3xl p-6 mb-12 border border-white/10 text-center">
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase opacity-50 font-black tracking-tighter">
              Current Rank
            </p>
            <p className="text-xl font-black uppercase tracking-tighter">
              {getRank(impactValue)}
            </p>
          </div>
          <div className="border-x border-white/10 flex flex-col justify-center">
            <p className="text-[10px] uppercase opacity-50 font-black tracking-tighter">
              Gems Found
            </p>
            <p className="text-3xl font-black">{gems.length}</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase opacity-50 font-black tracking-tighter">
              Real Impact
            </p>
            <p className="text-3xl font-black">{formatImpact(impactValue)}</p>
          </div>
        </div>

        {/* FEED GRID */}
        <h3
          className="text-2xl font-black uppercase tracking-tighter mb-8 border-l-4 border-[#F2AB27] pl-4"
          style={{ fontFamily: "Ruslan Display" }}
        >
          Collection Log
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gems.map((gem) => (
            <motion.div
              key={gem._id}
              layout
              whileHover={{ y: -10 }}
              className="group bg-[#F2E1C2] rounded-4xl overflow-hidden shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={gem.images?.[0] || "https://picsum.photos/400"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={gem.title}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <FaEye
                    className="text-3xl cursor-pointer hover:text-[#F2AB27]"
                    onClick={() => navigate(`/gem/${gem._id}`)}
                  />
                  <FaEdit
                    className="text-3xl cursor-pointer hover:text-blue-400"
                    onClick={() => {
                      setEditingGem(gem);
                      setEditForm({ ...gem });
                    }}
                  />
                  <FaTrash
                    className="text-3xl cursor-pointer hover:text-red-500"
                    onClick={() => handleDelete(gem._id)}
                  />
                </div>
              </div>
              <div className="p-6 text-[#375932]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-black leading-tight uppercase tracking-tighter">
                    {gem.title}
                  </h4>
                  <span className="text-[10px] font-black bg-[#375932] text-white px-2 py-1 rounded-lg uppercase">
                    {gem.category}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-sm opacity-70 font-bold mb-4">
                  <FaMapMarkerAlt /> {gem.location}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-lg font-black">
                    <img src={like} alt="like" className="w-5 h-5" />
                    {gem.likes?.length || 0}
                  </span>
                  <p className="text-[10px] uppercase font-black opacity-40">
                    {new Date(gem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingGem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#375932]/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#F2E1C2] p-8 rounded-[3rem] w-full max-w-lg shadow-2xl relative border-b-12 border-[#F2AB27]"
            >
              <button
                onClick={() => setEditingGem(null)}
                className="absolute top-6 right-6 text-[#375932] text-2xl hover:rotate-90 transition-transform"
              >
                <FaTimes />
              </button>
              <h2
                className="text-3xl text-[#375932] mb-6 font-black"
                style={{ fontFamily: "Ruslan Display" }}
              >
                Update Intel
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full bg-black/5 p-4 rounded-2xl outline-none focus:ring-2 ring-[#F2AB27] text-[#375932] font-bold"
                  placeholder="Title"
                />
                <input
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className="w-full bg-black/5 p-4 rounded-2xl outline-none focus:ring-2 ring-[#F2AB27] text-[#375932] font-bold"
                  placeholder="Location"
                />
                <textarea
                  rows="4"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full bg-black/5 p-4 rounded-2xl outline-none focus:ring-2 ring-[#F2AB27] text-[#375932] font-bold resize-none"
                  placeholder="Description"
                />
                <button className="w-full bg-[#375932] text-[#F2E1C2] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#F2AB27] hover:text-[#375932] transition-colors">
                  Apply Changes
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;
