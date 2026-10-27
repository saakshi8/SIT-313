
import { useState } from "react";

function Upgrade({ onClose, onUpgrade }) {
    const [cardholderName, setCardholderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const cleanCardNumber = cardNumber.replace(/\s/g, "");

        if (!cardholderName.trim() || !cleanCardNumber || !expiry || !cvv) {
            setError("Please fill in all payment fields.");
            return;
        }

        if (!/^\d{13,19}$/.test(cleanCardNumber)) {
            setError("Enter a valid card number.");
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            setError("Enter expiry in MM/YY format.");
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            setError("CVV must contain 3 or 4 digits.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please log in before upgrading.");
                return;
            }

            const response = await fetch("http://localhost:3000/upgrade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cardholderName: cardholderName.trim(),
                    cardNumber: cleanCardNumber,
                    expiry,
                    cvv
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Upgrade failed.");
                return;
            }

            onUpgrade(data.plan || "Paid");
        } catch (err) {
            console.error("Upgrade error:", err);
            setError("Could not connect to the backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-cyan-900">
                        Upgrade
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-800"
                        aria-label="Close payment modal"
                    >
                        &times;
                    </button>
                </div>

                <p className="mb-5 text-sm text-gray-600">
                    Enter the details below to complete this
                    upgrade. 
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="mb-1 block text-gray-700">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        autoComplete="cc-name"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder="Name on card"
                    />

                    <label className="mb-1 block text-gray-700">
                        Card Number
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2"
                        placeholder="13-19 digits"
                    />

                    <div className="mb-5 flex gap-4">
                        <div className="flex-1">
                            <label className="mb-1 block text-gray-700">
                                Expiry (MM/YY)
                            </label>
                            <input
                                type="text"
                                autoComplete="cc-exp"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                placeholder="MM/YY"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="mb-1 block text-gray-700">
                                CVV
                            </label>
                            <input
                                type="password"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                placeholder="3–4 digits"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mb-4 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-cyan-900 py-2 text-white hover:bg-cyan-800 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Confirm Upgrade"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-3 w-full rounded-md border border-gray-300 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Upgrade;
