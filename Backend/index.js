// It is same as main.jsx in react , index.js start the server And it is used to connect DataBase

require('dotenv').config() //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This allows you to keep sensitive information, such as database credentials or API keys, separate from your codebase and easily manage them across different environments (development, testing, production).

const express = require('express')
const app = express()  //app has all functionality of express
const port = process.env.PORT  //port number on which our server will run

app.get('/', (req, res) => {  //app.get() is used to handle GET requests to the specified route ('/'). It takes a callback function with two parameters: req (the request object) and res (the response object). In this case, when a GET request is made to the root route ('/'), the server responds with 'Code Arena'.
    res.send('Code Arena')
})

app.get('/api/jokes', (req, res) => {
    const jokes=[
        
        {
        id:1,
        title:'A joke',
        content:"Why don't scientists trust atoms? Because they make up everything!"
        },

        {
        id:2,
        title:'Another joke',
        content:"Why did the scarecrow win an award? Because he was outstanding in his field!"
        },

        {
        id:3,
        title:'Yet another joke',
        content:"Why don't skeletons fight each other? They don't have the guts!"
        },

        {
        id:4,
        title:'One more joke',
        content:"Why don't eggs tell jokes? They'd crack each other up!"
        }

    ]
    res.send(jokes)
})

console.log(`http://localhost:${port}/`)

app.listen(port, ()=>{ //app.listen() is used to start the server and listen for incoming requests on the specified port. It takes two parameters: the port number and a callback function that is executed once the server starts successfully.
    console.log(`App listening on port ${port}`)
})

//This is Server side code , it will run on Node.js environment and it will handle all the backend functionality of our application.