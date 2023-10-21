module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    if (err.code == 11000){
        const key = Object.keys(err.keyValue)[0];
        err.message = key.charAt(0).toUpperCase() + key.slice(1) + ' Already Exist';
    }
    err.message = err.message || "Oops..! Something went wrong.";
    res.status(err.statusCode).json({success:false,message:err.message})
}