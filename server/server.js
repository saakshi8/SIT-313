require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { AgentMailClient } = require("agentmail");

const app = express();
const PORT = 3000;

// Storing subscribers while the server is running
const subscribers = [];

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const client = new AgentMailClient({
    apiKey: process.env.AGENTMAIL_API_KEY
});

// Subscribe to the newsletter
app.post("/subscribe", async (req, res) => {
    try {
        const email = req.body?.email;

        // Check whether the email is valid
        if (
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            console.log("HTTP Status: 400 - Invalid email");

            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        const subscriberEmail = email.trim().toLowerCase();

        // Check for duplicate subscribers
        if (subscribers.includes(subscriberEmail)) {
            console.log("HTTP Status: 409 - Duplicate subscriber");

            return res.status(409).json({
                message: "This email is already subscribed."
            });
        }

        // Check AgentMail configuration
        if (
            !process.env.AGENTMAIL_API_KEY ||
            !process.env.AGENTMAIL_INBOX
        ) {
            console.log("HTTP Status: 500 - Email service not configured");

            return res.status(500).json({
                message: "Email service is not configured."
            });
        }

        // Sending the welcome email using AgentMail
        const result = await client.inboxes.messages.send(
            process.env.AGENTMAIL_INBOX,
            {
                to: subscriberEmail,
                subject: "Welcome to DEV@Deakin!",
                text: "Thank you for subscribing to DEV@Deakin! You will receive our latest updates."
            }
        );

        // Add the subscriber after the send request succeeds
        subscribers.push(subscriberEmail);

        console.log("\nSUBSCRIPTION SUCCESS");
        console.log("Express HTTP Status: 200");
        console.log("Subscriber added:", subscriberEmail);
        console.log("Total subscribers:", subscribers.length);
        console.log("Subscribers array:", subscribers);
        console.log("AgentMail response:", result);
        console.log("");

        return res.status(200).json({
            message: "Thank you for subscribing! Please check your email."
        });

    } catch (error) {
        console.error("\nSUBSCRIPTION ERROR");
        console.error("Error:", error.message || error);

        const providerStatus =
            error.statusCode ||
            error.status ||
            error.response?.status;

        console.error(
            "AgentMail HTTP Status:",
            providerStatus || "Not available in error details"
        );

        console.error("");

        return res.status(502).json({
            message: "We could not send your email. Please try again later."
        });
    }
});

// Get the current subscriber list
app.get("/subscribers", (req, res) => {
    console.log("Express HTTP Status: 200 - Subscriber list retrieved");
    console.log("Total subscribers:", subscribers.length);
    console.log("Subscribers array:", subscribers);
    console.log("");

    return res.status(200).json({
        count: subscribers.length,
        subscribers: subscribers
    });
});

// Start the backend server
const server = app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("Backend server error:", error.message);
});

server.on("close", () => {
    console.log("Backend server has stopped.");
});
