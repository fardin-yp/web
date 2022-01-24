const router = require("express").Router();
const User = require("../../models/chat/user");

router.post("/signup"  ,async (req ,res) => {

    try{
        const {email ,username} = req.body;
    
        if(!email || !username ) {
          return res.json({errMessage:"تمامی فیلد ها الزامی است",err:"all"})
     }
     const existing = await Users.findOne({email});
        if(existing) {
          return res.json({errMessage:"اکانت با این ایمیل در سیستم موجود است" , err:"email"})
        }
        const index = email.indexOf("@");
        const com = email.indexOf("com");
    
        if(index === -1 || com === -1){
            return res.json({errMessage:"لطفا ایمیل خود را به درستی وارد کنید!" ,err:"email"})
        }
        if(username.length > 16){
          return res.json({errMessage:"نام نمیتواند بیش از 16 کارکتر باشد!" ,err:"name"})
      }

          //sign the token
    const token =jwt.sign(
      {
      email:email,username:username
      },
      process.env.USERS_JWT_SECRET
      
     );
  
    // send the token
  res.cookie("token", token, {
    httpOnly: true,
    secure:true
  }).send()

    const newUser = new User({email ,username});

    const savedUser = await newUser.save((err,secc) => {
      if(err){
        res.json({errMessage:'!اکانت ایجاد نشد لطفا دوباره تلاش نمایید !'})
      }
    })
  
  }catch(err){
    res.json({errMessage:"اکانت ایجاد نشد لطفا دوباره تلاش نمایید !"})
  }

})

module.exports = router;