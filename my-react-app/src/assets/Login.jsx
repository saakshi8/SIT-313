
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState(
        location.state?.message || ""
    );
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );

            navigate("/");
        } catch (err) {
            console.error("Login error:", err);

            const messages = {
                "auth/invalid-credential":
                    "Incorrect email or password.",
                "auth/user-not-found":
                    "Incorrect email or password.",
                "auth/wrong-password":
                    "Incorrect email or password.",
                "auth/invalid-email":
                    "Please enter a valid email address.",
                "auth/too-many-requests":
                    "Too many attempts. Please try again later."
            };

            setError(
                messages[err.code] ||
                err.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Enter your email address first.");
            return;
        }

        setResetLoading(true);

        try {
            await sendPasswordResetEmail(auth, email.trim());
            setMessage("Password reset email sent. Check your inbox and spam folder.");
        } catch (err) {
            console.error("Password reset error:", err);

            if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError(
                    err.message ||
                    "Could not send the reset email. Please try again."
                );
            }
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-emerald-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-cyan-900 text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin}>
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
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3"
                    />

                    <button
                        type="button"
                        onClick={handlePasswordReset}
                        disabled={resetLoading}
                        className="text-sm text-rose-500 hover:underline mb-5"
                    >
                        {resetLoading ? "Sending email..." : "Forgot Password?"}
                    </button>

                    {error && (
                        <p role="alert" className="text-red-600 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p role="status" className="text-green-700 text-sm mb-4">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-900 text-white py-2 rounded-md hover:bg-cyan-800 disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-rose-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
