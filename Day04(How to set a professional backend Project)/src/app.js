import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app =express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


// Huma kuch setting kani padgi Data Kai Jagha sa aayga sa aana wala Backend ka andhar uski prepration chal rahi ha (URL, JSON , body, form) kuch best practise lagti ha.


// configuration karta ha 
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//express.urlencoded() is a built-in Express middleware used to parse URL-encoded form data and make it available in req.body. The extended: true option allows parsing nested objects, while limit: "16kb" restricts the maximum request body size to 16 KB for security and performance reasons.
app.use(express.static("public"))// koi file folder accept karna chata hu


app.use(cookieParser())
// kaam sirf itna ha  saa ha, Ki maa mera server so jo Browser Ha na usko andhar ki cookie accept kar pau and uki cookie set Bhi kar pau.
// CURD operation perform Kar saku




// REQuest ka andhar ->kassa Data AA raha ha mera pass usko handle karna ha 
// Response -> kasa response Bhej na ha merko

// Request -> 1) req.parmas-> URL sa jab koi data aata ha mostly req.parmas sa aata ha.
            //2) req.body-> alag alag thara sa Data Aa sakta ha-> JOSN, form (thodi sa configuration karni padhi ha ussa kam H jata ha)




export { app } 