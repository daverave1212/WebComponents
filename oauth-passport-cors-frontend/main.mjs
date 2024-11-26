
// Express standard routes
import express from 'express'
import cors from 'cors'

const app = express()

// CORS
app.use(cors())

// Serve HTML files in ./public
app.use(express.static('public'))

app.listen(4000, () => {
    console.log('Listening on 4000')
})




