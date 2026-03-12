import { useState } from "react";
import Navbar from "../components/Navbar";
import { createGem } from "../api/gems";
import { useNavigate } from "react-router-dom";

function AddGem() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: ""
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("category", form.category);

      if (image) {
        formData.append("image", image);
      }

      await createGem(formData);

      navigate("/explore");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-8">

        <div className="bg-white p-8 rounded-lg shadow-md w-125">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Add Hidden Gem
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              placeholder="Title"
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,title:e.target.value})}
            />

            <input
              placeholder="Location"
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,location:e.target.value})}
            />

            <input
              placeholder="Category"
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,category:e.target.value})}
            />

            <textarea
              placeholder="Description"
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,description:e.target.value})}
            />

            <input
              type="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Post Gem
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddGem;