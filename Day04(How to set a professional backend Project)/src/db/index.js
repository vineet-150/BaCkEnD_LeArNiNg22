import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Data Base sa kam karna ka liya 2cheej hamesha yadd rakhni hoti ha 
// 1) async await 
//2) try catch

// aap ka pass 2 example ha kuch ma try catch laga kar  Batyinga, Kuch ma promise ka Baad .then .catch laygnaa


// general aak utility bana do aak wraper 

const connectDB = async()=>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // mongoose aak ko actually ma return Object Deta ha 

        console.log(`\n MONGODB connected !! DB Host: ${connectionInstance.connection.host}`)

    }
    catch(error){
        console.log("MONGODB connection Failed",error);
        process.exit(1)
        }
}


export default connectDB;


