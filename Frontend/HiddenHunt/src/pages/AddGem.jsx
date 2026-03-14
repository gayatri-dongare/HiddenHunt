import { useState } from "react";
import Navbar from "../components/Navbar";
import { createGem } from "../api/gems";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddGem() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    mapLink: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("mapLink", form.mapLink);

      if (image) {
        formData.append("image", image);
      }

      await createGem(formData);

      toast.success("Gem added successfully 🎉");

      setForm({
        title: "",
        description: "",
        location: "",
        category: "",
        mapLink: ""
      });

      setImage(null);
      setPreview(null);

      navigate("/explore");

    } catch (error) {

      console.log(error);
      toast.error("Failed to add gem");

    }
  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
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
              value={form.title}
              onChange={(e)=>setForm({...form,title:e.target.value})}
              required
            />

            <input
              placeholder="Location (City / Area)"
              className="border p-2 rounded"
              value={form.location}
              onChange={(e)=>setForm({...form,location:e.target.value})}
              required
            />

            <input
              placeholder="Google Maps Link (optional)"
              className="border p-2 rounded"
              value={form.mapLink}
              onChange={(e)=>setForm({...form,mapLink:e.target.value})}
            />

            <input
              placeholder="Category (Cafe / Viewpoint / Nature / etc)"
              className="border p-2 rounded"
              value={form.category}
              onChange={(e)=>setForm({...form,category:e.target.value})}
            />

            <textarea
              placeholder="Description"
              className="border p-2 rounded"
              value={form.description}
              onChange={(e)=>setForm({...form,description:e.target.value})}
              required
            />

            <input
              type="file"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-48 object-cover rounded"
              />
            )}

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