const express = require('express')
const app = express();

app.get('/',(req,res) =>{
    console.log(`http://localhost:5000/`);
    res.send("hello world");

})


let port = 5000;

app.listen(port,()=>{
    console.log("Listening on port 5000")
})

