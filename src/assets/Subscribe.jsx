
import { useState } from "react";

function Subscribe() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubscribe() {
        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }

        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email.trim() })
            });

            const data = await response.json();

            setMessage(data.message);

            if (response.ok) {
                setEmail("");
            }
        } catch (error) {
            setMessage("Unable to connect to the server. Please try again.");
        }
    }

    return (
        <section className="bg-blue-300 py-3 px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <h2 className="font-serif font-bold text-xl tracking-wide text-cyan-900">
                    SIGN UP TO MY DEV@DEAKIN
                </h2>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="w-64 h-8 px-2 border border-teal-500 bg-white text-sm"
                />

                <button
                    id="subscribe"
                    type="button"
                    onClick={handleSubscribe}
                    className="h-8 px-4 bg-gray-400 border border-teal-500 text-gray-800 text-sm"
                >
                    Subscribe
                </button>
            </div>

            <p id="message" role="status" className="text-center text-sm mt-2">
                {message}
            </p>
        </section>
    );
}

export default Subscribe;
