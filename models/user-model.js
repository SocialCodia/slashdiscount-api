const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Constants = require('../utils/constatns');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    image:{
        type:String,
    },
    password:{
        type:String,
    },
    type:{
        type:String,
        enum:['user','vendor','admin'],
        default:'user'
    },
    isEmailVerified:{
        type:Boolean,
        default: false,
    },
    status:{
        type:String,
        enum:['verified','banned'],
    }
},{
    timestamps:true
});




userSchema.pre('save',function (next){
    const user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(Constants.BCRYPT_SALT_FACTOR,(err,salt)=>{

        if (err)
            return next(err);
        
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if (err)
                return next(err);
            user.password = hash;
            return next();
        })

    })
    
});


// userSchema.pre('updateOne',updateOne);

module.exports = new mongoose.model('User',userSchema,'users');