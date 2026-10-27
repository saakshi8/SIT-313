
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpgradeModal from "./Upgrade";

function Subscription() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isCancelling, setIsCancelling] = useState(false);

    // Load the logged-in user's details
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("loggedInUser");

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("loggedInUser");
            }
        }
    }, []);

    // Handle the upgrade button
    const handleUpgradeClick = () => {
        setMessage("");

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!user) {
            setMessage(
                "Your user information is unavailable. Please log in again."
            );
            return;
        }

        if (user.plan === "Paid") {
            setMessage("You are already on the Paid plan.");
            return;
        }

        setShowModal(true);
    };

    // Update the page after a successful upgrade
    const handleSuccessfulUpgrade = (plan) => {
        const updatedUser = { ...user, plan };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
        setShowModal(false);
        setMessage("Upgrade successful! Your plan is now Paid.");
    };

    // Cancel the Paid plan without a confirmation popup
    const handleCancelPlan = async () => {
        setMessage("");

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        if (!user || user.plan !== "Paid") {
            setMessage("You do not have an active Paid plan.");
            return;
        }

        setIsCancelling(true);

        try {
            const response = await fetch(
                "http://localhost:3000/cancel-plan",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Could not cancel your plan."
                );
                return;
            }

            const updatedUser = {
                ...user,
                plan: data.plan
            };

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(updatedUser)
            );

            setUser(updatedUser);
            setMessage(data.message);
        } catch {
            setMessage(
                "Could not connect to the server. Please try again."
            );
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-100 px-4 py-12">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-3 text-center text-4xl font-bold text-cyan-900">
                    Choose Your Plan
                </h1>

                <p className="mb-10 text-center text-gray-700">
                    Select the plan that suits you.
                </p>

                {user && (
                    <p className="mb-6 text-center text-gray-700">
                        Email: <strong>{user.email}</strong>
                        {" "}Existing Plan:{" "}
                        <strong>{user.plan || "Free"}</strong>
                    </p>
                )}

                {message && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="mb-6 text-center text-cyan-900"
                    >
                        {message}
                    </p>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Free Plan */}
                    <div className="rounded-xl border-2 border-cyan-900 bg-white p-8 shadow-md">
                        <h2 className="mb-2 text-2xl font-bold text-cyan-900">
                            Free Plan
                        </h2>

                        <p className="mb-6 text-3xl font-bold">
                            $0
                            <span className="text-base font-normal text-gray-500">
                                {" "}/ forever
                            </span>
                        </p>

                        <ul className="mb-8 space-y-3 text-gray-700">
                            <li>Access to public articles</li>
                            <li>Browse tutorials and projects</li>
                            <li>View the project gallery</li>
                            <li>Subscribe to my newsletter updates</li>
                        </ul>

                        {user?.plan === "Free" ? (
                            <button
                                type="button"
                                disabled
                                className="w-full rounded-md border border-gray-300 py-3 text-gray-500"
                            >
                                Your Current Plan
                            </button>
                        ) : user?.plan === "Paid" ? (
                            <button
                                type="button"
                                disabled
                                className="w-full rounded-md border border-gray-300 py-3 text-gray-500"
                            >
                                Free Plan
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="w-full rounded-md border border-cyan-900 py-3 text-cyan-900 hover:bg-cyan-50"
                            >
                                Sign Up for Free
                            </button>
                        )}
                    </div>

                    {/* Paid Plan */}
                    <div className="rounded-xl border-2 border-cyan-900 bg-white p-8 shadow-md">
                        <h2 className="mb-2 text-2xl font-bold text-cyan-900">
                            Paid Plan
                        </h2>
                    
                       <h3>$5 <span>/ month</span></h3>

                        <p className="mb-6 text-3xl font-bold">
                            Premium
                            <span className="text-base font-normal text-gray-500">
                                {" "}/ demo plan
                            </span>
                        </p>

                        <ul className="mb-8 space-y-3 text-gray-700">
                            <li>Everything included in the Free plan</li>
                            <li>Access to additional content</li>
                            <li>Interactive learning resources</li>
                            <li>Paid plan status saved in your account</li>
                        </ul>

                        {user?.plan === "Paid" ? (
                            <button
                                type="button"
                                onClick={handleCancelPlan}
                                disabled={isCancelling}
                                className="w-full rounded-md bg-red-600 py-3 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isCancelling
                                    ? "Cancelling..."
                                    : "Cancel Paid Plan"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleUpgradeClick}
                                className="w-full rounded-md bg-cyan-900 py-3 text-white hover:bg-cyan-800"
                            >
                                Upgrade to Paid
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Upgrade modal */}
            {showModal && (
                <UpgradeModal
                    onClose={() => setShowModal(false)}
                    onUpgrade={handleSuccessfulUpgrade}
                />
            )}
        </div>
    );
}

export default Subscription;
