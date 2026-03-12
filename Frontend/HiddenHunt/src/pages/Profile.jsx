import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getUserGems, deleteGem } from "../api/gems";
import { FaTrash, FaEdit } from "react-icons/fa";

function Profile() {

  const [gems, setGems] = useState([]);

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

    } catch (error) {
      console.log(error);
    }

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
            {user?.bio}
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
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  {gem.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {gem.location}
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-sm">
                    ❤️ {gem.likes?.length || 0}
                  </span>

                  <div className="flex gap-3">

                    <FaEdit
                      className="cursor-pointer text-blue-600"
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

      </div>

    </div>
  );
}

export default Profile;