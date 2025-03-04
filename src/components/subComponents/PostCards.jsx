import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";

function PostCards({ featuredImage, $id, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-[#002D3D] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 relative">
        <div className="w-full h-60">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4">
          <h1 className="text-lg font-bold text-white truncate">{title}</h1>
        </div>
      </div>
    </Link>
  );
}

export default PostCards;
