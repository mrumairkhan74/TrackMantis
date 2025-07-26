require('dotenv').config();
const nodemailer = require('nodemailer')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express')
const userRouter = require('./routes/UserRouter')
const bugRouter = require('./routes/BugRouter')
const commentRouter = require('./routes/CommentRouter')
const app = express();




app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true
}));
// for use express library
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// for connect frontend


app.use('/user', userRouter)
app.use('/bug', bugRouter)
app.use('/comment', commentRouter)



// port from env
const port = process.env.PORT

// server listen
app.listen(port, () => {
    console.log('Server Listening')
})