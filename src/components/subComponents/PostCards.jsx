import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";

function PostCards({ featuredImage, $id, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-full bg-[#002D3D] rounded-md p-4 my-4 relative">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-auto"
          />
        </div>
        <h1 className="absolute bottom-4 left-4 text-xl font-bold text-[#F7F3F3]">
          {title}
        </h1>
      </div>
    </Link>
  );
}

export default PostCards;
