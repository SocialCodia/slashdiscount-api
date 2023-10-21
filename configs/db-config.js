const mongoose = require('mongoose');


const dbConnect = () =>{
    const db = process.env.DATABASE_URI;
    console.log(db);
    mongoose.connect(db)
    .then(()=>console.log('Connected to databse server'))
    .catch((err)=>console.log('Failed to connect with database server, REASON : '+err.message))
}

module.exports = dbConnect();