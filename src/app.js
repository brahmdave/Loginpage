const express = require("express");
const path= require("path");
const app= express();

require("./db/conn");
const Register=require("./models/register");
const port = process.env.PORT||3000;

const template_path=path.join(__dirname,"../templates/views");
app.set("view engine","hbs");
app.set("views",template_path);   
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("index");
    
});
app.get("/login",(req,res)=>{
res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
    
});
app.post("/register",async (req,res)=>{
  try{
 /*console.log(req.body.name);
res.send(req.body.name);*/
const password=(req.body.password);
const cpassword=(req.body.confirmpassword);
if(cpassword===password){
const registerMember=new Register({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword
})

const registered= await registerMember.save();
 res.status(201).render("register");
  }else{   
    res.redirect('/');

  }}
    catch(error){
        res.status(400).send(error);
    }
});
app.post("/login", async (req,res)=>{
    try{
        const email=req.body.Lemail;
        const password=req.body.Lpassword;
        const useremail= await Register.findOne({Lemail:email});
        if(useremail.password===password){
            res.status(201).render("login");
        }
        else{
            res.redirect('/');
        }
    }
    catch(error){
        res.status(400).send("invalid Email");
    }
    
    })
app.listen(port,()=>{
    console.log('server is running at port no ${port}');
});