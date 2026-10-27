
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

function Login()
{
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        setError("");

        if (!email || !password)
        {
            setError("Please enter your email and password.");
            return;
        }

        try
        {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok)
            {
                setError(data.message || "Incorrect email or password.");
                return;
            }

            // Store the JWT token returned by the backend
            localStorage.setItem("token", data.token);

            // Store the logged-in user's details
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            navigate("/");
        }
        catch (error)
        {
            console.error("Login error:", error);
            setError("Login failed. Please check that the backend is running.");
        }
    };

    const handleGoogleLogin = async () =>
    {
        setError("");

        try
        {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Google sign-in still uses Firebase Authentication
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    name: user.displayName || "",
                    email: user.email || "",
                    authProvider: "google"
                })
            );

            navigate("/");
        }
        catch (error)
        {
            console.error("Google login error:", error);
            setError("Google login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-emerald-100 px-4 py-8">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

                <h1 className="text-3xl font-bold text-cyan-900 text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin}>

                    <label className="block mb-2 text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                    />

                    <label className="block mb-2 text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-cyan-900 text-white py-2 rounded-md hover:bg-cyan-800"
                    >
                        Login
                    </button>

                </form>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="text-rose-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
