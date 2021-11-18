const UsersRouter  = require('express').Router()
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken')
const UsersAuth = require('../helpers/Auth/users')
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');



 UsersRouter.post('/sendemail' ,async(req,res) => {
   try{
  const {email , password ,username ,verify} = req.body;

  if(!email || !password || !verify || !username) {
    return res.status(400).json({errMessage:"تمامی فیلد ها الزامی است"})

  }
  if(password.length < 5){
    return res.status(400).json({errMessage:"تعداد رمز باید بیشتر از 6  عدد باشد"})
  }
  if(username.length > 12){
    return res.status(400).json({errMessage:"نام کاربری نمیتواند بیشتر از 12 کاراکتر باشد"})
  }

  if(password !== verify){
    return res.status(400).json({errMessage:"رمز ها تطابق ندارند"})
  }

  const existing = await Users.findOne({email})
  if(existing) {
    return res.status(400).json({errMessage:"این اکانت ثبت شده است"})
  }
  const userExist = await Users.findOne({username})
  if(userExist) {
    return res.status(400).json({errMessage:"این نام کاربری ثبت شده است"})
  }
 
  const token =jwt.sign(
    {
      username,password,email
    },
    process.env.JWT_ACCOUNT_ACTIVATE,{expiresIn:"1h"})

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
  }
});

  var mailOptions = {
    from: 'art.movie002@gmail.com',
    to: `${email}`,
    subject: 'فعال سازی اکانت ArtMovie',
    html:`
    <h2>برای فعال سازی اکانت خود بر لینک پایین کلیک کنید</h2>
    <p>http://localhost:3000/Auth/activateAccount/${token}</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.json({errMessage:"ایمیل ارسال نشد لطفا دوباره تلاش کنید"})
    } else {
     Users.find()
     res.json({message:" ایمیل برای شما ارسال شد لطفا ایمیل خود را تایید کنید"})

    }
  });
  }catch(err){
    res.json({errMessage:"ایمیل ارسال نشد لطفا دوباره تلاش کنید"})
  }
})
UsersRouter.post('/resetemail' ,async(req,res) => {

  const {email} = req.body;

try { 
  if(!email) {
    return res.status(400).json({errMessage:"ایمیل خود را وارد کنید"})

  }
  const existing = await Users.findOne({email})
  if(!existing) {
    return res.status(400).json({errMessage:"این اکانت در سیستم ثبت نشده است"})
  }
 
  const token =jwt.sign(
    {
      email:email
    },
    process.env.JWT_RESET_PASSWORD,{expiresIn:"1h"})

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
  }
});

  var mailOptions = {
    from: 'ArtMovie.com',
    to: `${email}`,
    subject: 'تغییر رمز عبور اکانت ArtMovie',
    html:`
    <h2>برای تغییر رمز عبور خود کلیک کنید</h2>
    <p>http://localhost:3000/Auth/resetPassword/${token}</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.json({errMessage:"ایمیل ارسال نشد لطفا دوباره تلاش کنید"})
    } else {
     res.json({message:"ایمیل تغییر رمز برای شما ارسال شد"})    
    }
  });
}catch(err){
  res.json({errMessage:"خطا در انجام عملیات"})
}
  
})


UsersRouter.post('/reset' ,async (req, res) => {
  const {token ,password ,verify} = req.body;

  if(password !== verify){
    return res.json({errMessage:"رمز ها تطابق ندارند"})
  }
  if(password.length < 6){
    return res.json({errMessage:"تعداد رمز ها باید بیشتر از 5 عدد باشد"})
  }
  if(token && password){
    jwt.verify(token , process.env.JWT_RESET_PASSWORD ,async function(err,decodedToken){
     if(err){
      res.json({errMessage:"خطا در اجرای درخواست"})
     } 
     const {email} = decodedToken;
     const salt = await bcrypt.genSalt()
     const passwordHash = await bcrypt.hash(password ,salt)
     
     const filter = {email};
     const update = {passwordHash};

   
     const existing = await Users.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      rawResult: true // Return the raw result from the MongoDB driver
    });
    res.json({message:"رمز شما با موفقیت تغییر یافت"})
    }
    )}
  })


UsersRouter.post("/signup"  ,async (req ,res) => {
 
  try{
  const {token} = req.body;

  if(token){
   jwt.verify(token , process.env.JWT_ACCOUNT_ACTIVATE ,async function(err,decodedToken){
    if(err){
      res.json({errMessage:'این صفحه در دسترس نیست ممکن است زمان توکن شما از دست رفته باشد'})
    } 
    const {email , password ,username } = decodedToken;
  
    const existing = await Users.findOne({email})
    if(existing) {
      return res.status(400).json({errMessage:"تمامی فیلد ها الزامی است"})
    }
    if(password.length < 6){
      return res.json({errMessage:"تعداد رمز ها باید بیشتر از 5 عدد باشد"})
    }
  //hash Password
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password ,salt)

    const newUser = new Users({email,username,passwordHash})

        const savedUser = await newUser.save((err,secc) => {
          if(err){
            res.json({errMessage:'!اکانت ایجاد نشد لطفا دوباره تلاش نمایید !'})
          }
          res.json({message:"اکانت شما با موفقیت ایجاد شد!"})
        });
    })  
  }else{
    return res.json({errMessage:'اکانت ایجاد نشد لطفا دوباره تلاش نمایید !'})
  }
}catch(err){
  res.json({errMessage:"اکانت ایجاد نشد لطفا دوباره تلاش نمایید !"})
}
})

   //login
   UsersRouter.post("/login" , async (req,res) => {
    try{
      const {email , password } = req.body;

   if(!email || !password) {
        return res.status(400).json({err:"تمامی فیلد ها الزامی است"})
   }
   
    const existingUser = await Users.findOne({email});

   if(!existingUser){
    return res.status(401).json({err:"ایمیل یا رمز اشتباه"})
    }
    if(existingUser.blocked === true){
      return res.status(401).json({err:"این اکانت بن شده است "})
    }
  const correct = await bcrypt.compare(password, existingUser.passwordHash)
   if(!correct){
    return res.status(401).json({err:" ایمیل یا رمز اشتباه"})
  }
  //sign the token
  const token =jwt.sign(
    {
    user:existingUser._id,email:email
    },
    process.env.USERS_JWT_SECRET
    
   );

  // send the token
res.cookie("token", token, {
  httpOnly: true,
  secure:true
}).send()

    }catch(err){
      res.json({errMessage:"خطا در لاگین لطفا دوباره تلاش نمایید"})
    }
  })
 
   //log out
   UsersRouter.get("/logout" , (req,res) => {
     res.cookie("token" ,"", {
       httpOnly:true,
       expires:new Date(0)
     }).send()
   })
 //loggedIn
 UsersRouter.get("/loggedIn",(req,res) => {
  try{
     const token = req.cookies.token;

     if(!token) return res.json(false);

     jwt.verify(token, process.env.USERS_JWT_SECRET)

  res.send(true)

}catch(err){
    res.json(false)
}
});
 UsersRouter.get('/find' ,UsersAuth ,async(req ,res) => {
  const token = req.cookies.token
  if(token){
  jwt.verify(token , process.env.USERS_JWT_SECRET ,async function(err,decodedToken){
   if(err){   
   } 
   const {user} = decodedToken
 
   const users = await Users.findById(user)
   res.json(users)
  })
}
 })


module.exports = UsersRouter