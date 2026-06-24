class App extends Error{
    constructor(statusCode,message="Something went wrong",errors=[],statck=""){
        // super parent class ke constructor ya methods ko call karne ke liye use hota hai.
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=false
        this.success=false;
        this.errors=errors

        if(this.statck){
            this.stack=statck
        }

        else{
            Error.captureStackTrace(this,this.constructor)
        }


    }
}

export {ApiError}