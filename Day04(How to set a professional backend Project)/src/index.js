// Jitna jaldi Hamari file Load hoo utna jadldi hamara environment variable laod Hoo jana Chiyaa
// top par import karo 


// require('dotenv').config({path:'./env'})

// Problem ya ha require statement aur Hum use kar raha haa import statement ya code consistency kharab kar raaha Hai
// Ya itna common Problem Ha isko solve Kiya ga ha 
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB()  // connetDB ka aak async method likh ha, Jab bhi async method complete hota ha to actually ma promise bhi return karta ha (common cheej Dhikagi programming ma)
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log("Server is running at port : ${process.env.PORT}");
        
    });

})
.catch((err)=>{
    console.log("MONGO db connection fails !!!", err);

})

/*First Approach Ha YA 
import express from "express"
const app=express()
(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    }
    catch(error){
        console.error("ERROR:",error)
        throw err
    }

})() 

*/


