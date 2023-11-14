import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAlert = (message) => {
    alert(message);
  };

  const handleNavigation = (path, isAuthRequired = false) => {
    if (isAuthRequired && isAuthenticated) {
      router.push(path);
    } else if (!isAuthenticated) {
      handleAlert("Please Sign In or Sign Up!");
    } else {
      router.push(path);
    }
  };

  return (
    <nav
      className="text-white mt-5 sticky top-5 px-3"
      style={{ borderRadius: ".675em" }}
    >
      <div className="flex items-center glow">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glow text-5xl ml-1 py-1 text-white lg:hidden"
        >
          ≡
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4`}
        >
          <Link href="/">
            <button className="glow px-1 py-2 rounded-md font-medium">
              Home
            </button>
          </Link>
          <button
            onClick={() => {
              if (isAuthenticated) {
                handleAlert("You're already signed in.");
              } else {
                router.push("/signIn");
              }
            }}
            className="glow px-1 py-2 rounded-md font-medium"
          >
            SignIn
          </button>
          <button
            onClick={() => {
              if (isAuthenticated) {
                handleAlert("You're already signed up.");
              } else {
                router.push("/signUp");
              }
            }}
            className="glow px-1 py-2 rounded-md font-medium"
          >
            SignUp
          </button>
          <button
            onClick={() => handleNavigation("/ComicBot", true)}
            className="glow px-1 py-2 rounded-md font-medium"
          >
            ComicBot
          </button>
          <button
            onClick={() => handleNavigation("/jokes", true)}
            className="glow px-1 py-2 rounded-md font-medium"
          >
            JokePad
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
