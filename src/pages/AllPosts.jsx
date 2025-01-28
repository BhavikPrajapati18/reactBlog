import React, { useEffect, useState } from "react";
import { Container, PostCards } from "../components";
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
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCards {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
