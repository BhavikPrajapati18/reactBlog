import React, { useEffect, useState } from "react";
import { Container, PostCards } from "../components";
import AppwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaLock, FaUsers } from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AppwriteService.getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      {/* 🔥 Hero Section */}
      <div className="bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#141E30] text-white py-16 text-center">
        <Container>
          <h1 className="text-4xl font-bold">
            Share Your Thoughts with the World 🌍
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Write, read, and explore amazing posts from people around the world.
          </p>
          <Link
            to="/add-post"
            className="mt-6 inline-block bg-[#FF6B6B] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#FF4757] transition-all duration-300"
          >
            Create Your First Post 🚀
          </Link>
        </Container>
      </div>
      {/* 🏆 Why Choose Us? */}
      <Container>
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700 text-center">
          Why Choose Us? 🚀
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <FaCheckCircle className="text-4xl text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Easy to Use</h3>
            <p className="text-gray-600">
              A simple and user-friendly experience.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <FaLock className="text-4xl text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is safe with us.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
            <FaUsers className="text-4xl text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Engaging Community</h3>
            <p className="text-gray-600">Connect with like-minded people.</p>
          </div>
        </div>
      </Container>
      {/* 💬 Testimonials Section */}
      <Container>
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700 text-center">
          What Our Users Say 💬
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg border">
            <p className="text-gray-600 italic">
              "This platform helped me express my thoughts!"
            </p>
            <p className="text-gray-900 font-semibold mt-3">- Rahul Sharma</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg border">
            <p className="text-gray-600 italic">
              "A great place to read and write amazing content."
            </p>
            <p className="text-gray-900 font-semibold mt-3">- Priya Patel</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg border">
            <p className="text-gray-600 italic">
              "I discovered so many interesting topics here!"
            </p>
            <p className="text-gray-900 font-semibold mt-3">- Aman Verma</p>
          </div>
        </div>
      </Container>
      {/* 📝 All Posts Section */}
      <Container className="mb-16">
        {" "}
        {/* Added margin-bottom to avoid footer overlap */}
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700">
          Latest Posts
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-300 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            <p>No posts available yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCards key={post.$id} {...post} date={post.$createdAt} />
            ))}
          </div>
        )}
      </Container>
      {/* 🔽 Extra Space Before Footer */}
      <div className="h-16"></div>{" "}
      {/* Maintains spacing between posts and footer */}
    </div>
  );
}

export default Home;
