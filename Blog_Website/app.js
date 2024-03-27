const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const Article = require("./models/article")

const userRouters = require('./routes/user');
const app =  express();
const port = 3000;

//mongoose db connction
mongoose.connect('mongodb://localhost:27017/Blog-post',{
    
});

//view engine
app.set('view engine','ejs');
app.use(expressLayouts);



//view routes
app.get("/",async(req,res)=>{
   const article = await Article.find();
   //console.log(article)
 res.render("index",{article:article,title1:"Homepage"});//,{article:article}
 
});

// body parser 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 
//userRouters
app.use('/article',userRouters);

//public folder for  css an js 
app.use(express.static('public'));
app.listen(port,()=>{
console.log(`server is listening on port ${port}`);
});