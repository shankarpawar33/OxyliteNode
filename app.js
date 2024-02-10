const express=require('express');
const bodyparser=require('body-parser');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyparser.json());
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended:true}));
const cors=require('cors');
app.use(cors());
const connect =require('./db.config');
const signUp=require('./routes/signup');
const customer=require('./routes/customer')
app.use('/api',signUp,customer);
app.listen(2000,function(){
    console.log("server is running on 2000");
});   