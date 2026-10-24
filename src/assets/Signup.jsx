import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Signup()
{
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) =>
    {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword)
        {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword)
        {
            setError("Passwords do not match.");
            return;
        }

        try
        {
            const passwordHash = await bcrypt.hash(password, 10);

            await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                passwordHash: passwordHash
            });

            navigate("/login");
        }
        catch (error)
        {
            console.error(error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-emerald-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-96">

                <h1 className="text-3xl font-bold text-cyan-900 text-center mb-6">
                    Sign Up
                </h1>

                <form onSubmit={handleSignup}>

                    <label className="block mb-2 text-gray-700">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                    />

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
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                    />

                    <label className="block mb-2 text-gray-700">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6"
                    />

                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>

                    <button
                        type="submit"
                        className="w-full bg-cyan-900 text-white py-2 rounded-md hover:bg-cyan-800"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-rose-500 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Signup;