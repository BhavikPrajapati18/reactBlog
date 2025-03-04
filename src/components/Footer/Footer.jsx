import React from "react";
import { Link } from "react-router-dom";
import Logo from "../subComponents/Logo";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#002D3D] to-[#004F5D] py-12 text-[#F7F3F3] border-t border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-start">
            <Logo width="60px" />
            <p className="mt-4 text-sm opacity-80">
              &copy; 2023 Bhavik. All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 border-b pb-2 border-gray-500">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 border-b pb-2 border-gray-500">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 border-b pb-2 border-gray-500">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-[#FFC107] transition" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
