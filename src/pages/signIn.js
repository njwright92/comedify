
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import Navbar from "./components/navbar";

const SignIn = () => {

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">Sign In </h1>
            <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">

                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold mb-2">Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold mb-2">Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        type="button"
                        className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-5 border border-gray-400 rounded shadow mt-2"
                        onClick={handleGoogleSignIn}
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google Logo"
                            className="inline-block h-5 w-5 mr-2 align-middle"
                        />
                        Sign In with Google
                    </button>

                </div>
                <div className="text-center mt-4">
                    <p>Need to
                        <a href="/signUp" className="underline glow"> Sign Up?</a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignIn;