import React, { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
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
      duration: 2000,
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
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        fontWeight: "bold",
      }}
    >
      <Head>
        <title>Comedify!</title>
      </Head>
      <Navbar />
      <div
        className="text-2xl text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-600 inline-block p-2 shadow-lg mb-5 mt-1 mx-auto"
        style={{ borderRadius: "3em", boxShadow: "var(--neumorphism-shadow)" }}
        data-aos="zoom-in"
      >
        Sign In or Sign Up for full access to all this app&apos;s features!
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            if (isAuthenticated) {
              handleAlert("You're already signed in.");
            } else {
              router.push("/signIn");
            }
          }}
          className="glow px-6 py-3 rounded-md text-lg font-medium mr-4 bg-gray-700 text-white hover:bg-gray-800 transition duration-200"
        >
          Sign In
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) {
              handleAlert("You're already signed up.");
            } else {
              router.push("/signUp");
            }
          }}
          className="glow px-6 py-3 rounded-md text-lg font-medium bg-magenta-500 text-white hover:bg-magenta-600 transition duration-200"
          style={{ backgroundColor: `rgba(var(--accent-color), 0.8)` }}
        >
          Sign Up
        </button>
      </div>
      <h1 className="text-5xl text-white glow m-10 mx-auto" data-aos="flip-up">
        Comedify!
      </h1>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] m-10 mx-auto"
        src={comic}
        alt="Comic Logo"
        width={350}
        height="auto"
        priority
        data-aos="flip-up"
      />
      <div className="flex flex-col gap-4 p-1 mt-10">
        <div
          className="comicBotCard text-white m-1 flex flex-col"
          data-aos="fade-left"
        >
          <button
            onClick={() => handleNavigation("/ComicBot", true)}
            className="text-3xl mb-3 p-1 glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"
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
                className="text-3xl mb-3 p-1 glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"
              >
                <Image
                  className="self-end mb-1"
                  src={comicBot}
                  alt="comicbot"
                  width="auto"
                  height="350"
                  priority
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className="jokeLibraryCard text-white m-1 flex flex-col"
          data-aos="fade-right"
        >
          <button
            onClick={() => handleNavigation("/jokes", true)}
            className="text-3xl mb-3 p-1 glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"
          >
            JokePad
          </button>

          <div className="flex flex-row flex-wrap-reverse sm:flex-nowrap">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleNavigation("/jokes", true)}
                className="text-3xl mb-3 p-1 glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"
              >
                <Image
                  className="self-end mb-1"
                  src={jokes}
                  alt="Jokes"
                  width="350"
                  height="auto"
                  priority
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
