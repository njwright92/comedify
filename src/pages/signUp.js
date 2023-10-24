import { auth, provider } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from "../components/navbar";
import Image from 'next/image';
import Link from 'next/link';

const SignUp = () => {
    const router = useRouter(); // Initialize useRouter hook

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                alert('Successfully signed up with Google!'); // Pop-up message
                router.push('/'); // Navigate to homepage
            })
            .catch((error) => {
                alert(`Sign-up failed: ${error.message}`); // Pop-up message
            });
    };

    const handleEmailPasswordSignUp = (e) => {
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.'); // Pop-up message
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert('Successfully signed up!'); // Pop-up message
                router.push('/'); // Navigate to homepage
            })
            .catch((error) => {
                alert(`Sign-up failed: ${error.message}`); // Pop-up message
            });
    };

    return (
        <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
            <Navbar />
            <h1 className="text-4xl text-white text-center mb-10 glow">Sign Up</h1>
            <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleEmailPasswordSignUp(e);
                }}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="p-2 w-full border rounded text-black" required />
                    </div>
                    <div className="text-center">
                        <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded glow">Sign Up</button>
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
                    <p>Already have an account?
                        <Link href="/signIn" className="underline glow"> Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </main>
    );
};

export default SignUp;
