import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-gradient-to-r from-[#141E30] via-[#243B55] to-[#141E30] shadow-md relative z-50">
      <Container>
        <nav className="flex justify-between items-center py-3 relative">
          {/* Logo */}
          <Link to="/">
            <Logo className="w-24 transition-transform duration-300 hover:scale-110" />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Items - Desktop */}
          <ul className="hidden md:flex gap-6 items-center">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="px-6 py-2 text-white font-medium rounded-lg transition-all duration-300 hover:bg-white hover:text-[#243B55] hover:shadow-lg"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu (Smooth Animation + Overlapping) */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } z-40`}
          onClick={() => setIsOpen(false)}
        ></div>

        <ul
          className={`fixed top-0 left-0 w-3/4 h-full bg-[#243B55] text-white p-6 shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } z-50`}
        >
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>

          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name} className="mt-6">
                  <button
                    className="w-full text-left text-lg font-medium py-3 px-4 rounded-md hover:bg-[#1E2A38] transition-all duration-300"
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li className="mt-6">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
}

export default Header;
