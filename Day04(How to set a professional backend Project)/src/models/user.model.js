import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



// Pre hook-> Jasa Hi aap ka data save Hona jaya ,just ussa phela iss hook ko run karwa sakta hoo, -> usma kuch bhi code Dal kar run kar wa sakta h ma nahi chata data aasa save ho jaya uss sa phela kuch kar da kaya kar da password encrypt kar daa
const userSchema=new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // Jintna bhi Database hota ha especially MongoDb ma kisi Field ko searchable bana ha bada optmize tarika sa uka index:true kar do.

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true 
    },
    avatar:{
        type:String,// cloudinary url.
        required:true
    },
    coverImage:{
        type:String,
    },
    watchHistory:[// ya akala field Hamra project ko bada hee complex bana ta ha aur bada hi next level bnana ta ha, we use speciall pakage mongoose-aggregate-paginate-v2 for writting the aggregate query
        // Ya JO mongoose ka package ha na ya aap ko allow karta ha aggregation query likhana ka liya -> MongoDb ki true power ha jo production ma use karta ha issa hi aati ha.


        {
            type:Schema.Types.ObjectId,
            ref:"Video"

        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']


    },
    refreshToken:{
        type:String

    }

}

,{timestamps:true}
)


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=bcrypt.hash(this.password,10)
    next()

})// save hona sa phela kuch karwa do, arrow function ka pass this ka context nahi hota context pata Hona Bhoot jaruri ha 


userSchema.methods.isPasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password)  
}


// Dono hi JWT tooken bass usage ka anthar haa

userSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname

  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

// referesh token ma information kam hoti ha 
userSchema.methods.generateRefereshToken=function(){
      return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname

  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
}


export const User =mongoose.model("User",userSchema);// MongoDb ma kis name sa save hoga -> Users
