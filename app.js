const express = require('express')

// add path module
const path = require('path')

// hard coding path to the public files in root variable
const root = path.join(__dirname, 'public')

const app = express()

const port = process.env.PORT || 3000

// allow express to parse JSON
app.use(express.json())

// middleware to access static files in public folder
app.use(express.static('public'))

// route to get the root url sending the home.html back to the client
app.get('/', (request, response) => {
    response.sendFile('home.html', { root })
})



app.listen(port, () => console.log(`Server is running http://localhost:${port}`))