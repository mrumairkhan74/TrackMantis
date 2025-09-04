const Groq = require("groq-sdk");
const Chat = require('../models/ChatModel'); // Assuming you have a Chat model defined
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,  // set this in your .env file
});

const chat = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch('https://trackmantis.vercel.app/');
        const siteHTML = await response.text();
        const siteContent = parseMainText(siteHTML);

        const AiReply = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",   // Groq's free chat model
            messages: [
                { role: "system", content: "You are a TrackMantis assistant. Only answer using the content provided. if answer isn't in there, say:'Sorry, I don't have that information" },
                { role: "user", content: `Question: ${message}\n\nSite Content:\n${siteContent}` },
            ],
        });

        const aiMessage = AiReply.choices[0].message.content;

        // Save chat to DB
        const newChat = new Chat({
            userMessage: message,
            aiMessage
        });
        await newChat.save();

        return res.status(200).json({
            success: true,
            message: 'Chat saved & response received',
            data: newChat
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = { chat };
