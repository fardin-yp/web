const jwt = require("jsonwebtoken")

function AdminAuth (req ,res ,next) {
    const token = req.cookies.alarak;

    if(!token){
        return res.json({errMessage:"!!! لطفا آرامش ما رو نخراش"})
       } 

    try{
       const verified = jwt.verify(token ,process.env.JWT_SECRET)
       req.admin = verified.admin;  
       next();
    }catch(err){
       res.status(401).json({errMessage:"برای استفاده از این بخش وارد اکانت خود شوید"})
    }
}

module.exports = AdminAuth