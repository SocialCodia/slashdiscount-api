const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('./configs/db-config');
const errorMiddleware = require('./middlewares/error-middleware');
const authRoute = require('./routes/auth-router');
const ErrorHandler = require('./utils/error-handler');


const app = express();

const corsOption = {
    credential:true,
    origin:['*']
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',authRoute);

app.use((req,res,next)=>{
    return next(ErrorHandler.notFound());
})


app.use(errorMiddleware);


app.listen(process.env.PORT,()=>console.log('server is litning..'))


