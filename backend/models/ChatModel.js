const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: true
    },
    aiMessage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);
