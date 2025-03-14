import 'dotenv/config'
import connectTODB from './db/db.js'
import { app } from './app.js'

connectTODB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is listening on the port ${process.env.PORT}`);
        
    })
})
.catch((err)=>console.log("MongoDB connection failed", err))



