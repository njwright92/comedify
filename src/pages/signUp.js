import Navbar from "./components/navbar";

const signUp = () => (
    <main className="bg-gradient-to-b from-rgb(var(--background-start-rgb)) to-rgb(var(--background-end-rgb)) min-h-screen p-8">
        <Navbar />
        <h1 className="text-4xl text-white text-center mb-10 glow">Sign Up Page</h1>
        <div className="max-w-md mx-auto bg-gradient-to-b from-transparent to-rgb(var(--background-end-rgb)) p-8 shadow-md rounded-md text-white">
            <form>
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
            <div className="text-center mt-4">
                <p>Already have an account?
                    <a href="/signIn" className="underline glow">Sign In
                    </a>
                </p>
            </div>
        </div>
    </main>
);

export default signUp;
