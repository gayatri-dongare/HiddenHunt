import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getUserGems, deleteGem, updateGem } from "../api/gems";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {

  const navigate = useNavigate();

  const [gems, setGems] = useState([]);
  const [editingGem, setEditingGem] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    category: "",
    description: ""
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

    if (user?._id) {
      fetchGems();
    }

  }, [user?._id]);

  const handleDelete = async (id) => {

    try {

      await deleteGem(id);

      setGems((prev) => prev.filter((g) => g._id !== id));

      toast.success("Gem deleted successfully");

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete gem");
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
            : g
        )
      );

      toast.success("Gem updated successfully");

      setEditingGem(null);

    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.replace("/");
};

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 px-4">

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">

          <h2 className="text-2xl font-bold text-green-700">
            {user?.username}
          </h2>

          <p className="text-gray-600">
            {user?.bio || "Hidden Hunt Explorer"}
          </p>

        </div>

        <h3 className="text-xl font-semibold mb-4">
          My Gems
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {gems.map((gem) => (

            <div
              key={gem._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >

              <img
                src={gem.images?.[0] || "https://picsum.photos/400"}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/gem/${gem._id}`)}
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  {gem.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {gem.location}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Published: {new Date(gem.createdAt).toLocaleDateString()}
                </p>

                {gem.updatedAt !== gem.createdAt && (
                  <p className="text-xs text-gray-400">
                    Edited: {new Date(gem.updatedAt).toLocaleDateString()}
                  </p>
                )}

                <div className="flex justify-between items-center mt-2">

                  <span className="text-sm">
                    ❤️ {gem.likes?.length || 0}
                  </span>

                  <div className="flex gap-4">

                    <FaEye
                      className="cursor-pointer text-green-600"
                      onClick={() => navigate(`/gem/${gem._id}`)}
                    />

                    <FaEdit
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        setEditingGem(gem);
                        setEditForm({
                          title: gem.title,
                          location: gem.location,
                          category: gem.category,
                          description: gem.description
                        });
                      }}
                    />

                    <FaTrash
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(gem._id)}
                    />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-10 flex justify-center">

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

      {editingGem && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-100">

            <h2 className="text-xl font-bold mb-4">
              Edit Gem
            </h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">

              <input
                value={editForm.title}
                onChange={(e)=>setEditForm({...editForm,title:e.target.value})}
                className="border p-2 rounded"
              />

              <input
                value={editForm.location}
                onChange={(e)=>setEditForm({...editForm,location:e.target.value})}
                className="border p-2 rounded"
              />

              <input
                value={editForm.category}
                onChange={(e)=>setEditForm({...editForm,category:e.target.value})}
                className="border p-2 rounded"
              />

              <textarea
                value={editForm.description}
                onChange={(e)=>setEditForm({...editForm,description:e.target.value})}
                className="border p-2 rounded"
              />

              <div className="flex gap-3 mt-3">

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  Update
                </button>

                <button
                  type="button"
                  onClick={()=>setEditingGem(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Profile;