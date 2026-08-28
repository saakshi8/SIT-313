require("dotenv").config();

const express = require("express");
const app = express();

const formData = require("form-data");
const Mailgun = require("mailgun.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/subscribe", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email required"
        });
    }

    try {

        const response = await mg.messages.create(
            process.env.MAILGUN_DOMAIN,
            {
                from: `DEV@Deakin <postmaster@${process.env.MAILGUN_DOMAIN}>`,
                to: [email],
                subject: "Welcome to DEV@Deakin!",
                text: "Thanks for subscribing to DEV@Deakin!"
            }
        );
        // Add email to Mailgun mailing list
          const member = await mg.lists.members.createMember(
    process.env.MAILGUN_LIST,
    {
        address: email,
        subscribed: "yes",
        upsert: "yes"
    }
    );
        console.log("Email sent: Mailgun response:", response);
        console.log("Subscriber added to mailing list:", member);

        res.status(200).json({
            message: "Successfully subscribed to Dev@Deakin"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to send email"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
