const mongoose = require('mongoose');
const dotenv = require('dotenv') ;
dotenv.config({path:'./config.env'});
const app = require('./app');

mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log("DB Connection Success");
}).catch((e)=>{
    console.log('Error occured while connecting to database!!');
})


app.listen(3000,()=>{
    console.log("Server started..");
});