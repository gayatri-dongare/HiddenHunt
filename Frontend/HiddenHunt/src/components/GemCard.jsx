import { useNavigate } from "react-router-dom";

function GemCard({ gem }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/gem/${gem._id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
    >

      <img
        src={gem.images?.[0] || "https://picsum.photos/400"}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {gem.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {gem.location}
        </p>

        <span className="text-sm text-gray-600">
          ❤️ {gem.likes?.length || 0} Likes
        </span>

      </div>

    </div>
  );
}

export default GemCard;