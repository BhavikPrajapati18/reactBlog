import React, { useEffect, useState } from "react";
import { Container, PostCards } from "../components";
import authService from "../appwrite/auth"; // Adjust path if needed
import AppwriteService from "../appwrite/config"; // Make sure this path is correct
import { Link } from "react-router-dom";
import { FaCheckCircle, FaLock, FaUsers } from "react-icons/fa";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user session
    authService
      .userAcitve()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => setUser(null));

    // Fetch posts
    AppwriteService.getPosts([])
      .then((res) => {
        setPosts(res?.documents || []);
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

      {/* 🏆 Why Choose Us */}
      <Container>
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700 text-center">
          Why Choose Us? 🚀
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<FaCheckCircle />}
            title="Easy to Use"
            text="A simple and user-friendly experience."
            color="text-blue-500"
          />
          <InfoCard
            icon={<FaLock />}
            title="Secure & Reliable"
            text="Your data is safe with us."
            color="text-green-500"
          />
          <InfoCard
            icon={<FaUsers />}
            title="Engaging Community"
            text="Connect with like-minded people."
            color="text-purple-500"
          />
        </div>
      </Container>

      {/* 💬 Testimonials */}
      <Container>
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700 text-center">
          What Our Users Say 💬
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Rahul Sharma", "Priya Patel", "Aman Verma"].map((name, i) => (
            <div key={i} className="p-6 bg-white rounded-lg shadow-lg border">
              <p className="text-gray-600 italic">
                {i === 0
                  ? `"This platform helped me express my thoughts!"`
                  : i === 1
                  ? `"A great place to read and write amazing content."`
                  : `"I discovered so many interesting topics here!"`}
              </p>
              <p className="text-gray-900 font-semibold mt-3">- {name}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 📝 All Posts */}
      <Container className="mb-16">
        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-700">
          Latest Posts
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-300 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 mt-6">
            {user ? (
              <p>No posts available yet. Be the first to write one!</p>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-blue-500 underline">
                  log in
                </Link>{" "}
                to see or create posts.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCards key={post.$id} {...post} date={post.$createdAt} />
            ))}
          </div>
        )}
      </Container>

      <div className="h-16" />
    </div>
  );
}

function InfoCard({ icon, title, text, color }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <div className={`text-4xl ${color} mx-auto mb-3`}>{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

export default Home;
