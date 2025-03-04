import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";

function stripHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function PostCardAllPost({ featuredImage, $id, title, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] relative border border-gray-200">
        {/* Image Section */}
        <div className="w-full h-60 overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 bg-white">
          <h1 className="text-xl font-semibold text-gray-900 mb-2 truncate">
            {title}
          </h1>
          <p className="text-gray-600 text-sm line-clamp-2">
            {stripHtml(content)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCardAllPost;
