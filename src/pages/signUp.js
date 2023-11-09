import { auth, provider } from "../../firebase";
import { useRouter } from "next/router";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../components/navbar";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(
        userRef,
        {
          uid: result.user.uid,
          email: result.user.email,
        },
        { merge: true }
      );
      alert("Successfully signed in with Google!");
      router.push("/");
    } catch (error) {
      alert(`Sign-in failed: ${error.message}`);
    }
  };

  const handleEmailPasswordSignUp = async (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });

      alert("Successfully signed up!");
      router.push("/");
    } catch (error) {
      alert(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
      <Navbar />
      <h1 className="text-4xl text-white text-center mb-10 glow">Sign Up</h1>
      <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailPasswordSignUp(e);
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="current-email"
              className="p-2 w-full border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              className="p-2 w-full border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              className="p-2 w-full border rounded text-black"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-2 ">
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-5 border border-gray-400 rounded shadow mt-2"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="inline-block h-5 w-5 mr-2 align-middle"
              width={20}
              height={20}
            />
            Sign Up with Google
          </button>
        </div>
        <div className="text-center mt-2 ">
          <p>
            Already have an account?
            <Link href="/signIn" className="underline glow">
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
