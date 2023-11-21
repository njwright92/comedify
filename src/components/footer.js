import { useRouter } from "next/router";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Successfully signed out.");
      router.push("/");
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <footer className="bg-black text-white py-4 mt-10">
      <div className="container mx-auto text-center glow">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:underline glow mb-4 mr-6"
          style={{
            backgroundColor: `rgba(var(--accent-color), 0.2)`,
            padding: "0.5em 1em",
            borderRadius: "0.625em",
            boxShadow: "var(--neumorphism-shadow)",
          }}
        >
          Back to Top ↑
        </button>
        {isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="hover:underline glow px-1 py-1 rounded-md text-sm font-small text-white absolute"
            style={{
              backgroundColor: `rgba(var(--deep-red), 0.8)`,
            }}
          >
            Sign Out
          </button>
        )}
        <p className="text-sm" style={{ fontWeight: "bold" }}>
          &copy; {new Date().getFullYear()} Comedify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
