import React from 'react';
import Image from 'next/image'
import Head from 'next/head'
import comicLogo from '../Img/comicLogo.jpeg';
import Navbar from './components/navbar';
import comicBot from '../Img/comicBot.png'
import jokes from '../Img/jokes.png'

export default function Home() {


  return (
    <main
      className="flex flex-col"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <Head>
        <title>Comedify!</title>
      </Head>
      <Navbar />
      <div className="text-2xl text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block p-2 shadow-lg mb-5 mt-5 mx-auto"
        style={{ borderRadius: '3em' }}>
        Sign up for full access to all this app's features!
      </div>

      <h1 className="text-5xl text-white glow m-10 mx-auto">Comedify!</h1>
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] m-10 mx-auto"
        src={comicLogo}
        alt="Comic Logo"
        width={280}
        height='auto'
        priority
      />
      <div className="flex flex-col gap-4 p-1 mt-10">
        <div className='comicBotCard text-black m-1 flex flex-col'>
          <a href="/ComicBot"
            className="text-3xl mb-3 p-1 bg-black glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"> ComicBot
          </a>
          <div
            className="flex flex-row">
            <p
              className="mr-4">Your personal comedy bit creation assistant. Utilizing cutting-edge GPT technology, ComicBot engages you in a conversational interface to help you craft the funniest bits. It's like having a writing partner who's always in a funny mood. Sign up to get access!
            </p>
            <Image
              className="self-end mb-2"
              src={comicBot}
              alt="comicbot"
              width='auto'
              height='250'
              priority
            />

          </div>
        </div>

        <div className='jokeLibraryCard text-black m-1 flex flex-col'>
          <a href="/jokes"
            className="text-3xl mb-3 p-1 bg-black glow rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white transition duration-200"> JokePad
          </a>
          <div className="flex flex-row">
            <Image
              className="self-end mb-2"
              src={jokes}
              alt="Jokes"
              width={250}
              height='auto'
              priority
            />
            <p
              className="ml-4">Write and store your comedy bits securely. An organized comedian is a successful comedian!
            </p>
          </div>
        </div>
      </div>

    </main >
  )
}

