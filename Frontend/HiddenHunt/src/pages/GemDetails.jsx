import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleGem, likeGem, getComments, addComment } from "../api/gems";
import { toast } from "react-toastify";

function GemDetails() {

  const { id } = useParams();

  const [gem, setGem] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [showMap, setShowMap] = useState(false);

  // convert google maps link → embeddable map
  const getEmbedMap = (url) => {
    if (!url) return "";

    try {

      // try extracting coordinates
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

      if (match) {
        const lat = match[1];
        const lng = match[2];
        return `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
      }

      // fallback
      return `${url}&output=embed`;

    } catch {
      return url;
    }
  };

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

      toast.success("Gem liked");

    } catch {

      toast.error("Like failed");

    }
  };

  const handleComment = async (e) => {

    e.preventDefault();

    try {

      await addComment(id, text);

      const res = await getComments(id);
      setComments(res.data);

      setText("");

      toast.success("Comment added");

    } catch {

      toast.error("Comment failed");

    }

  };

  if (!gem) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-8">

        <div className="bg-white w-175 rounded-lg shadow-md overflow-hidden">

          <img
            src={gem.images?.[0]}
            className="w-full h-87.5 object-cover"
          />

          <div className="p-6">

            <h2 className="text-2xl font-bold mb-2">
              {gem.title}
            </h2>

            <p className="text-gray-500">
              {gem.location}
            </p>

            <p className="text-xs text-gray-400">
              Published: {new Date(gem.createdAt).toLocaleDateString()}
            </p>

            {gem.updatedAt && gem.updatedAt !== gem.createdAt && (
              <p className="text-xs text-gray-400">
                Edited: {new Date(gem.updatedAt).toLocaleDateString()}
              </p>
            )}

            <p className="mt-3 mb-4">
              {gem.description}
            </p>

            <div className="flex items-center gap-6 mb-6">

              <button
                onClick={handleLike}
                className="text-red-500"
              >
                ❤️ {gem.likes?.length || 0}
              </button>

              <span>
                💬 {comments.length} comments
              </span>

              {gem.mapLink && (
                <button
                  onClick={() => setShowMap(true)}
                  className="text-blue-600 font-semibold"
                >
                  📍 View Location
                </button>
              )}

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

      {showMap && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-150">

            <h2 className="text-xl font-bold mb-4">
              Location
            </h2>

            <iframe
              src={getEmbedMap(gem.mapLink)}
              width="100%"
              height="350"
              className="rounded"
              loading="lazy"
            />

            <div className="flex justify-between mt-4">

              <button
                onClick={() => setShowMap(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Close
              </button>

              <a
                href={gem.mapLink}
                target="_blank"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Open in Google Maps
              </a>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default GemDetails;