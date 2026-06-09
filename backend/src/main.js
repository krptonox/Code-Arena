import app from './app.js';
import connectDB from './db/indexDB.js';

const port = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(port, () => {
         console.log(`Server is running on port http://localhost:${port}`);
    })
})
.catch((err) => {
    console.error("Failed to connect to the database:", err.message);
})

