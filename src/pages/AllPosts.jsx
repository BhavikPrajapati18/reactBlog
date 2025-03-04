import React, { useEffect, useState } from "react";
import { Container, PostCardAllPost } from "../components";
import AppwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setAllPosts] = useState([]);

  useEffect(() => {
    AppwriteService.getPosts([])
      .then((posts) => {
        if (posts) {
          setAllPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.log("AllPosts -> error", error);
      });
  }, []);

  return (
    <div className="w-full py-8 mt-6 bg-gray-100">
      <Container>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          All Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCardAllPost key={post.$id} {...post} date={post.$createdAt} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
