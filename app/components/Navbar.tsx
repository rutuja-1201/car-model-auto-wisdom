"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();


  const checkAuthentication = () => {
    const token = Cookies.get("authToken");
    setIsAuthenticated(!!token);  
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken"); 
    checkAuthentication(); 
    router.push("/"); 
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-teal-700 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:justify-start">
            <Link href="/" className="text-white text-3xl font-bold">
              Car Models
            </Link>
          </div>
         
          <div className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              {isAuthenticated ? (
                <>
                  <li className="mt-1">
                    <Link
                      href="/car"
                      className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-600 hover:text-white transition"
                    >
                      Car
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-600 hover:text-white transition"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-600 hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
