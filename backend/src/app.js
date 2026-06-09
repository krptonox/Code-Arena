import express from 'express'
import cors from 'cors'

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


import healthcheckRoute from './routes/healthcheck.route.js'
app.use('/api/v1/healthcheck', healthcheckRoute)



app.get("/", (req, res) =>{
      res.send("Welcome to Home API");
});

app.get('/codearena',(req,res) => {
    res.send("Welcome to the Code Arena API")
})

export default app;