
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            await updateProfile(credential.user, {
                displayName: name.trim()
            });

            await setDoc(doc(db, "users", credential.user.uid), {
                name: name.trim(),
                email: credential.user.email
            });

            navigate("/login", {
                state: { message: "Account created successfully. Please log in." }
            });
        } catch (err) {
            console.error("Signup error:", err);

            const messages = {
                "auth/email-already-in-use":
                    "This email is already registered. Please log in.",
                "auth/invalid-email":
                    "Please enter a valid email address.",
                "auth/weak-password":
                    "Your password does not meet Firebase's password requirements.",
                "auth/operation-not-allowed":
                    "Email and password sign-in is not enabled in Firebase."
            };

            setError(
                messages[err.code] ||
                err.message ||
                "Signup failed. Please try again."
            );
        } finally {
            setLoading(false);
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
                        autoComplete="name"
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
                        autoComplete="email"
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6"
                    />

                    {error && (
                        <p role="alert" className="text-red-600 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-900 text-white py-2 rounded-md hover:bg-cyan-800 disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-rose-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
