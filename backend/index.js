const express = require("express")
const cors = require("cors")
const router = require("./routes/index.js")

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/api/v1/', router)

app.listen(PORT, ()=>{
    console.log(`The server runs at http://localhost:${PORT}/api/v1`)
})