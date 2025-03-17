import 'dotenv/config' // configuring dotenv to access .env variables anywhere in the directory.
import connectTODB from './db/db.js'
import { app } from './app.js' // importing app so that it carries out all the functions.

// connectTODB is run so and a promise type syntax is used. 
connectTODB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is listening on the port ${process.env.PORT}`);
        
    })
})
.catch((err)=>console.log("MongoDB connection failed", err))



