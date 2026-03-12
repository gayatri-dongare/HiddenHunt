import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getSingleGem, likeGem, getComments, addComment } from "../api/gems";

function GemDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [gem, setGem] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {

    const fetchGem = async () => {
      try {
        const res = await getSingleGem(id);
        setGem(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await getComments(id);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGem();
    fetchComments();

  }, [id]);

  const handleLike = async () => {
    try {

      await likeGem(id);

      const res = await getSingleGem(id);
      setGem(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {

      await addComment(id, text);

      const res = await getComments(id);
      setComments(res.data);

      setText("");

    } catch (error) {
      console.log(error);
    }
  };

  if (!gem) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-8">

        <div className="bg-white w-175 rounded-lg shadow-md overflow-hidden">

          <img
            src={gem.images?.[0] || "https://picsum.photos/700/400"}
            className="w-full h-87.5 object-cover"
          />

          <div className="p-6">

            <h2 className="text-2xl font-bold mb-2">
              {gem.title}
            </h2>

            <p className="text-gray-500 mb-1">
              {gem.location}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              Posted on {new Date(gem.createdAt).toLocaleDateString()}
            </p>

            <p className="mb-4">
              {gem.description}
            </p>

            <div className="flex gap-6 text-gray-700 mb-6">

              <button
                onClick={handleLike}
                className="text-red-500"
              >
                ❤️ {gem.likes?.length || 0} Likes
              </button>

              <span>💬 {comments.length} Comments</span>

            </div>

            <div className="border-t pt-4">

              <h3 className="font-semibold mb-2">
                Comments
              </h3>

              <form onSubmit={handleComment} className="flex gap-2 mb-4">

                <input
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  placeholder="Write a comment..."
                  className="border p-2 rounded w-full"
                />

                <button className="bg-green-600 text-white px-4 rounded">
                  Post
                </button>

              </form>

              {comments.map((c) => (
                <div key={c._id} className="text-sm text-gray-700 mb-2">
                  <strong>{c.user?.username}:</strong> {c.text}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default GemDetails;