const Adminrouter  = require('express').Router()
const Admin = require('../../models/adminModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Adminauth = require("../../Auth/admin");


Adminrouter.post("/signup",Adminauth  ,async (req ,res) => {
  const token = req.cookies.Admin;
 try{
  const {email , password ,roll ,username} = req.body;

  if(!email || !password || !username ) {
    return res.json({errMessage:"تمامی فیلد ها الزامی است"})
  }
  if(!roll){
    return res.json({errMessage:"لطفا رول را مشخص کنید !"})
  }
  if(password.length < 5){
    return res.json({errMessage:"تعداد رمز باید بیشتر از 6  عدد باشد"})
  }

  const existing = await Admin.findOne({email})
  if(existing) {
    return res.json({errMessage:"این اکانت ثبت شده است"})
  }

//hash Password
jwt.verify(token , process.env.JWT_SECRET ,async function(err,decodedToken){
  if(err){   
    return res.json(false)
   } 
   if(!err && decodedToken.email){
    const find = await Admin.find({email:decodedToken.email})
    if(find[0].roll !== "master"){
      return res.json({errMessage:"شما قادر به این کار نیستید !"})
    }
    if(find[0].roll === "master"){
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password ,salt)

  const newAdmin = new Admin({
    email ,passwordHash ,username ,roll
  })
    const savedAdmin = await newAdmin.save();
    res.json({message:"کاربر ادمین ساخته شد !"})
   }
  }
})
 }catch(err){
   res.json(true)

 }
})


  //login
  Adminrouter.post("/login" , async (req,res) => {
    try{
      const {email , password } = req.body;

      if(!email || !password) {
        return res.json({errMessage:"please enter all require feilds"})
      }
   
    const existingUser = await Admin.findOne({email});

    if(!existingUser){
    return res.json({errMessage:"wrong email or password"})
    }
 const correct = await bcrypt.compare(password, existingUser.passwordHash)
  if(!correct){
    return res.json({errMessage:"wrong email or password"})
  }

  //sign the token
  const token =jwt.sign(
    {
    email:email
    }
  , process.env.JWT_SECRET
  );


  // send the token
  res.cookie("Admin" ,token , {
    httpOnly:true,
    secure:true
  })
  .send()

    }catch(err){
      res.json({errMessage:err})
    }
  })

  //log out
  Adminrouter.get("/logout" , (req,res) => {
    res.cookie("Admin" ,"", {
      httpOnly:true,
      expires:new Date(0)
    }).send()
  })

//loggedIn
Adminrouter.get("/loggedIn",async (req,res) => {

  try{
    const token = req.headers.cookie;

    if(!token) return res.json(false);

if(token){
  jwt.verify(token , process.env.JWT_SECRET ,async function(err,decodedToken){
    if(err){   
     return res.json(false)
    } 
    if(!err && decodedToken.email){
      const {email} = decodedToken;
      const find = await Admin.find({email});
      const allAdmin = await Admin.find();
      
      if(find[0].roll === "master"){
       return res.json({email,find ,allAdmin})
      }
      if(find[0].roll !== "master"){
        return res.json({email,find})
      }
    }
 
   })
}

}catch(err){
    res.json(false)
}
});

 
  

module.exports = Adminrouter