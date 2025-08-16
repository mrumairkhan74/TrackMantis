require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


// Socket.IO instance


app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', require('./routes/UserRouter'));
app.use('/bug', require('./routes/BugRouter'));
app.use('/comment', require('./routes/CommentRouter'));
app.use('/chat', require('./routes/ChatBotRouter'));

// Socket Controller handles socket events


// Use `server.listen`, not `app.listen`
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
