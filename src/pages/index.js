import React, { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/navbar";
import comic from "../Img/Comics.jpg";
import comicBot from "../Img/comicLogo.jpeg";
import jokes from "../Img/jokes.png";
import Footer from "../components/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const initAOS = () => {
    AOS.init({
      duration: 1000,
    });
  };
  useEffect(() => {
    initAOS();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleAlert = useCallback((message) => {
    alert(message);
  }, []);

  const handleNavigation = useCallback(
    (path, isAuthRequired = false) => {
      if (isAuthRequired && isAuthenticated) {
        router.push(path);
      } else if (!isAuthenticated) {
        handleAlert("Please Sign In or Sign Up!");
      } else {
        router.push(path);
      }
    },
    [handleAlert, isAuthenticated, router]
  );

  return (
    <main
      className="flex flex-col"
      style={{
        fontFamily: "'Comic Sans MS', sans-serif",
        fontWeight: "bold",
        backgroundColor: "rgb(var(--background-rgb))",
        color: "rgb(var(--foreground-rgb))",
      }}
    >
      <Navbar />
      <Head>
        <title>Comedify!</title>
      </Head>
      <div
        className="text-xl inline-block p-2 shadow-lg mb-5 mt-1 mx-auto glow"
        style={{
          backgroundColor: "black",
          borderRadius: "3em",
          boxShadow: "var(--neumorphism-shadow)",
          color: "white",
        }}
        data-aos="zoom-in"
      >
        {isAuthenticated
          ? "Welcome to Comedify! Write a joke!"
          : "Sign In or Sign Up for full access to all this app's features!"}
      </div>
      <div className="flex justify-center mt-4">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => router.push("/signIn")}
              className="glow px-6 py-3 rounded-md text-lg font-medium mr-4"
              style={{
                backgroundColor: `rgba(var(--neon-blue), 0.8)`,
                color: "white",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/signUp")}
              className="glow px-6 py-3 rounded-md text-lg font-medium"
              style={{
                backgroundColor: `rgba(var(--neon-blue), 0.8)`,
                color: "white",
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      <h1
        className="text-5xl glow m-10 mx-auto bg-black p-2.5"
        data-aos="zoom-in"
      >
        Comedify!
      </h1>

      <Image
        className="relative m-10 mx-auto"
        src={comic}
        alt="Comic Logo"
        width={350}
        height="auto"
        data-aos="flip-up"
        priority
      />
      <div className="flex flex-col gap-4 p-1 mt-10">
        <div
          className="comicBotCard glow text-white m-1 flex flex-col"
          data-aos="fade-up"
        >
          <button
            onClick={() => handleNavigation("/ComicBot", true)}
            className="text-4xl mb-3 p-1 glow rounded-md text-lg font-medium bg-gray-700 text-white transition duration-200 hover:bg-gray-600 hover:text-light-gray"
          >
            ComicBot
          </button>

          <div className="flex flex-row flex-wrap sm:flex-nowrap">
            <div className="flex-1 mr-0 sm:mr-2">
              <p>
                Your personal comedy bit creation assistant fine-tuned from a
                llm on comedy scripts. Utilizing cutting-edge GPT technology,
                ComicBot engages you in a conversational interface to help you
                craft the funniest bits. It&apos;s like having a writing partner
                who&apos;s always in a funny mood. Sign up to get access!
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleNavigation("/ComicBot", true)}
                className="text-4xl mb-3 p-1 glow rounded-md text-lg font-medium bg-gray-700 text-white transition duration-200 hover:bg-gray-600 hover:text-light-gray"
              >
                <Image
                  className="self-end mb-1"
                  src={comicBot}
                  alt="comicbot"
                  width="auto"
                  height="350"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className="jokeLibraryCard glow text-white m-1 flex flex-col"
          data-aos="fade-up"
        >
          <button
            onClick={() => handleNavigation("/jokes", true)}
            className="text-4xl mb-3 p-1 glow rounded-md text-lg font-medium bg-gray-700 text-white transition duration-200 hover:bg-gray-600 hover:text-light-gray"
          >
            JokePad
          </button>

          <div className="flex flex-row flex-wrap-reverse sm:flex-nowrap">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleNavigation("/jokes", true)}
                className="text-4xl mb-3 p-1 glow rounded-md text-lg font-medium bg-gray-700 text-white transition duration-200 hover:bg-gray-600 hover:text-light-gray"
              >
                <Image
                  className="self-end mb-1"
                  src={jokes}
                  alt="Jokes"
                  width="350"
                  height="auto"
                />
              </button>
            </div>
            <div className="flex-1 ml-0 sm:ml-2">
              <p>
                With Comedify, you can unleash your comedy genius by writing and
                working on jokes and bits. Our platform provides a creative
                space to refine your material and take your comedy to the next
                level! Sign up to get access!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
