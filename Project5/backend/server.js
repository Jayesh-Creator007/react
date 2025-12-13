const express = require("express");

const app = express()

require('dotenv').config()
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 8000

require('./config/db')()
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send("Server created")
})



const taskRoute = require('./routes/taskRoutes')


app.use('/api/task', taskRoute)

app.listen(PORT,()=>{
    console.log(`Server is created => http://localhost:${PORT}`);
})