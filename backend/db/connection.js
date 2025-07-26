require('dotenv').config()
const mongoose = require('mongoose')


const connection = mongoose.connect(process.env.MONGO_URL)


connection.then(() => {
    console.log('Database Connected')
})
connection.catch((error) => {
    console.error(error)
})


module.exports = connection