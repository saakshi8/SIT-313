
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db, auth } from "../firebase";

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
            const usersRef = collection(db, "users");

            const userQuery = query(
                usersRef,
                where("email", "==", email)
            );

            const result = await getDocs(userQuery);

            if (result.empty)
            {
                setError("Incorrect email or password.");
                return;
            }

            const userData = result.docs[0].data();

            const passwordMatch = await bcrypt.compare(
                password,
                userData.passwordHash
            );

            if (!passwordMatch)
            {
                setError("Incorrect email or password.");
                return;
            }

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    name: userData.name,
                    email: userData.email
                })
            );

            navigate("/");
        }
        catch (error)
        {
            console.error(error);
            setError("Login failed. Please try again.");
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

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    name: user.displayName || "",
                    email: user.email || ""
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
