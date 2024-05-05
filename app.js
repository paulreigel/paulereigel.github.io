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

// Use api-routes
app.use('/api/menu', require('./api-routes-menu'))
app.use('/api/events', require('./api-routes-events'))

// route to get the root url sending the home.html back to the client
app.get('/', (request, response) => {
    response.sendFile('home.html', { root })
})

// ;(async () => {
//     try {
//         const response = await fetch('http://localhost:' + port + '/api/events');
//         if (!response.ok) {
//             throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         console.log(data); // Log the fetched data to the console
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// })();

app.listen(port, () => console.log(`Server is running http://localhost:${port}`))