
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { AgentMailClient } = require("agentmail");

const app = express();
const PORT = process.env.PORT || 3000;

// Store newsletter subscribers while the server is running
const subscribers = [];

// CORS configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173"
    })
);

app.use(express.json());

//HTTP status codes
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(
            `${req.method} ${req.originalUrl} - HTTP Status: ${res.statusCode}`
        );
    });

    next();
});

// Checking the JWT secret
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from server/.env");
}

// Initialise Firebase Admin
const serviceAccountPath = path.resolve(
    __dirname,
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
        "../firebase-service-account.json"
);

if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
        "Firebase service account file not found: " +
            serviceAccountPath
    );
}

const serviceAccount = require(serviceAccountPath);

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// Initialise AgentMail
const client = new AgentMailClient({
    apiKey: process.env.AGENTMAIL_API_KEY
});

// Validate email addresses
function isValidEmail(email) {
    return (
        typeof email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
}

// JWT authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please log in to continue."
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Your session is invalid or has expired."
            });
        }

        req.user = decoded;
        next();
    });
}

// SIGNUP
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (
            typeof name !== "string" ||
            !name.trim() ||
            !isValidEmail(email) ||
            typeof password !== "string" ||
            password.length < 8
        ) {
            return res.status(400).json({
                message:
                    "Enter your name, a valid email, and a password of at least 8 characters."
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const existingUsers = await db
            .collection("users")
            .where("email", "==", cleanEmail)
            .limit(1)
            .get();

        if (!existingUsers.empty) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash the password on the backend
        const passwordHash = await bcrypt.hash(password, 12);

        const userRef = await db.collection("users").add({
            name: name.trim(),
            email: cleanEmail,
            passwordHash,
            plan: "Free",
            authProvider: "password",
            createdAt: FieldValue.serverTimestamp()
        });

        console.log("New user registered:", cleanEmail);

        return res.status(201).json({
            message: "Account created successfully.",
            userId: userRef.id
        });
    } catch (error) {
        console.error("Signup error:", error.message);

        return res.status(500).json({
            message: "Signup failed. Please try again."
        });
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!isValidEmail(email) || typeof password !== "string") {
            return res.status(400).json({
                message: "Please enter a valid email and password."
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const result = await db
            .collection("users")
            .where("email", "==", cleanEmail)
            .limit(1)
            .get();

        if (result.empty) {
            return res.status(401).json({
                message: "Incorrect email or password."
            });
        }

        const userDoc = result.docs[0];
        const userData = userDoc.data();

        if (
            userData.authProvider !== "password" ||
            !userData.passwordHash
        ) {
            return res.status(401).json({
                message:
                    "This account does not use email and password login."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userData.passwordHash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password."
            });
        }

        // Generate a JWT that expires after two hours
        const token = jwt.sign(
            {
                uid: userDoc.id,
                email: userData.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: userDoc.id,
                name: userData.name,
                email: userData.email,
                plan: userData.plan || "Free"
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
});

// GET CURRENT USER
app.get("/me", authenticateToken, async (req, res) => {
    try {
        const userDoc = await db
            .collection("users")
            .doc(req.user.uid)
            .get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User account not found."
            });
        }

        const userData = userDoc.data();

        return res.status(200).json({
            user: {
                id: userDoc.id,
                name: userData.name,
                email: userData.email,
                plan: userData.plan || "Free"
            }
        });
    } catch (error) {
        console.error("Get user error:", error.message);

        return res.status(500).json({
            message: "Could not retrieve your account."
        });
    }
});

// Upgradation
app.post("/upgrade", authenticateToken, async (req, res) => {
    try {
        const {
            cardholderName,
            cardNumber,
            expiry,
            cvv
        } = req.body || {};

        const cleanCardNumber =
            typeof cardNumber === "string"
                ? cardNumber.replace(/\s/g, "")
                : "";

        if (
            typeof cardholderName !== "string" ||
            !cardholderName.trim() ||
            !/^\d{13,19}$/.test(cleanCardNumber) ||
            typeof expiry !== "string" ||
            !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) ||
            typeof cvv !== "string" ||
            !/^\d{3,4}$/.test(cvv)
        ) {
            return res.status(400).json({
                message: "Please enter valid payment form details."
            });
        }

        // Check that the card expiry month has not passed
        const [month, year] = expiry.split("/");
        const expiryDate = new Date(
            2000 + Number(year),
            Number(month),
            1
        );

        const currentMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        );

        if (expiryDate <= currentMonth) {
            return res.status(400).json({
                message: "The card expiry date has passed."
            });
        }

        const userRef = db.collection("users").doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User account not found."
            });
        }

        if (userDoc.data().plan === "Paid") {
            return res.status(409).json({
                message: "You are already on the Paid plan."
            });
        }

        // Do not save card details or CVV
        await userRef.update({
            plan: "Paid",
            upgradedAt: FieldValue.serverTimestamp()
        });

        return res.status(200).json({
            message: "Your demo upgrade was successful.",
            plan: "Paid"
        });
    } catch (error) {
        console.error("Upgrade error:", error.message);

        return res.status(500).json({
            message: "Could not upgrade your plan."
        });
    }
});

// Cancellation
app.post("/cancel-plan", authenticateToken, async (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User account not found."
            });
        }

        if (userDoc.data().plan !== "Paid") {
            return res.status(409).json({
                message: "Your account is not currently on the Paid plan."
            });
        }

        await userRef.update({
            plan: "Free",
            cancelledAt: FieldValue.serverTimestamp()
        });

        console.log(
            "Paid plan cancelled for:",
            userDoc.data().email
        );

        return res.status(200).json({
            message:
                "Your Paid plan has been cancelled. You are now on the Free plan.",
            plan: "Free"
        });
    } catch (error) {
        console.error("Plan cancellation error:", error.message);

        return res.status(500).json({
            message: "Could not cancel your plan. Please try again."
        });
    }
});

// NEWSLETTER SUBSCRIPTION
app.post("/subscribe", async (req, res) => {
    try {
        const email = req.body?.email;

        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        const subscriberEmail = email.trim().toLowerCase();

        if (subscribers.includes(subscriberEmail)) {
            return res.status(409).json({
                message: "This email is already subscribed."
            });
        }

        if (
            !process.env.AGENTMAIL_API_KEY ||
            !process.env.AGENTMAIL_INBOX
        ) {
            return res.status(500).json({
                message: "Email service is not configured."
            });
        }

        const result = await client.inboxes.messages.send(
            process.env.AGENTMAIL_INBOX,
            {
                to: subscriberEmail,
                subject: "Welcome to DEV@Deakin!",
                text:
                    "Thank you for subscribing to DEV@Deakin! " +
                    "You will receive our latest updates."
            }
        );

        subscribers.push(subscriberEmail);

        console.log("\nSUBSCRIPTION SUCCESS");
        console.log("Subscriber added:", subscriberEmail);
        console.log("Total subscribers:", subscribers.length);
        console.log("Subscribers array:", subscribers);
        console.log("AgentMail response:", result);
        console.log("");

        return res.status(200).json({
            message:
                "Thank you for subscribing! Please check your email."
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

        return res.status(502).json({
            message:
                "We could not send your email. Please try again later."
        });
    }
});

// GET NEWSLETTER SUBSCRIBERS
app.get("/subscribers", (req, res) => {
    console.log("Total subscribers:", subscribers.length);
    console.log("Subscribers array:", subscribers);

    return res.status(200).json({
        count: subscribers.length,
        subscribers
    });
});

// START SERVER
const server = app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("Backend server error:", error.message);
});

server.on("close", () => {
    console.log("Backend server has stopped.");
});
