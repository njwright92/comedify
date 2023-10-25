import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Image from 'next/image'
import Head from 'next/head'
import Navbar from '../components/navbar';
import comicBot from '../Img/Comic.png'
import jokes from '../Img/jokes.png'
import Footer from '../components/footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    AOS.init({
      duration: 2000,
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRedirect = (link) => {
    if (!isAuthenticated) {
      alert("Please Sign In or Sign Up.");
    } else {
      window.location.href = link;
    }
  };

  return (
    <main className="flex flex-col" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
      <Head>
        <title>Comedify!</title>
      </Head>
      <Navbar />
      <div className="text-2xl text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block p-2 shadow-lg mb-5 mt-1 mx-auto"
        style={{ borderRadius: '3em' }}
        data-aos="zoom-in">
        Sign In or Sign Up for full access to all this app&apos;s features!
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            if (isAuthenticated) {
              alert('You are already signed in.');
            } else {
              window.location.href = "/signIn"
            }
          }}

          className="glow px-6 py-3 rounded-md text-lg font-medium mr-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200">
          Sign In
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) {
              alert('You are already signed up.');
            } else {
              window.location.href = "/signUp"
            }
          }}
          className="glow px-6 py-3 rounded-md text-lg font-medium bg-green-500 text-white hover:bg-green-600 transition duration-200">
          Sign Up
        </button>
      </div>
      <h1 className="text-5xl text-white glow m-10 mx-auto" data-aos="flip-up">
        Comedify!
      </h1>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] m-10 mx-auto"
        src={comicBot}
        alt="Comic Logo"
        width={350}
        height='auto'
        priority
        data-aos="flip-up"
      />
      <div className="flex flex-col gap-4 p-1 mt-10">
        <div className='comicBotCard text-black m-1 flex flex-col' data-aos="fade-left">
          <button onClick={() => handleRedirect('/ComicBot')}
            className="text-3xl mb-3 p-1 bg-black glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200">
            ComicBot
          </button>
          <div className="flex flex-row flex-wrap sm:flex-nowrap">
            <div className="flex-1 mr-0 sm:mr-2">
              <p>
                Your personal comedy bit creation assistant fine-tuned from a llm on comedy scripts. Utilizing cutting-edge GPT technology, ComicBot engages you in a conversational interface to help you craft the funniest bits. It&apos;s like having a writing partner who&apos;s always in a funny mood. Sign up to get access!
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button onClick={() => handleRedirect('/ComicBot')}>
                <Image
                  className="self-end mb-1"
                  src={comicBot}
                  alt="comicbot"
                  width='auto'
                  height='350'
                  priority
                />
              </button>
            </div>
          </div>

        </div>
        <div className='jokeLibraryCard text-black m-1 flex flex-col' data-aos="fade-right">
          <button onClick={() => handleRedirect('/jokes')}
            className="text-3xl mb-3 p-1 bg-black glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200">
            JokePad
          </button>
          <div className="flex flex-row flex-wrap-reverse sm:flex-nowrap">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button onClick={() => handleRedirect('/jokes')}>
                <Image
                  className="self-end mb-1"
                  src={jokes}
                  alt="Jokes"
                  width='350'
                  height='auto'
                  priority
                />
              </button>
            </div>
            <div className="flex-1 ml-0 sm:ml-2">
              <p>
                With Comedify, you can unleash your comedy genius by writing and working on jokes and bits. Our platform provides a creative space to refine your material and take your comedy to the next level! Sign up to get access!
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  )
}
