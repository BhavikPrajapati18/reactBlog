import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="w-full py-8 mt-6 bg-gray-100">
      <Container>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105">
          {/* Image Section */}
          <div className="relative w-full h-96 overflow-hidden group">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            <p className="text-gray-600 text-lg italic mb-4">
              {post.description}
            </p>
            <div className="text-gray-800 leading-relaxed browser-css">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
