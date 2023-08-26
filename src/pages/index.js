import Image from 'next/image'
import Head from 'next/head'
import comicLogo from '../Img/comicLogo.jpeg';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col p-24 font-sans"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <Head>
        <title>Comedify!</title>
      </Head>
      <Navbar />
      <div className="relative flex flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">

        <h1 className="text-5xl text-white glow m-10">Comedify!</h1>

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] m-5"
          src={comicLogo}
          alt="Comic Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  )
}

