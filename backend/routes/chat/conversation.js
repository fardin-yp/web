const router = require("express").Router();
const Conversation = require("../../models/chat/conversation");
const jwt = require("jsonwebtoken");
const AdminAuth = require("../../Auth/admin")

router.post("/" ,async (req ,res) => {

           
try{
    const {email ,username} = req.body;

    const exist = await Conversation.find({members: {$all: [email] }});

    if(exist && exist.length > 0){
        const token =jwt.sign(
            {
            email:email
            },
            process.env.USERS_JWT_SECRET
            );
        // send the token
            res.cookie("chat", token, {
             httpOnly: true,
             secure:true
            }).send();
    }

    if(exist && exist.length === 0){
    const newConversation = new Conversation({
        members:[email ,"Admin-hrttrhthr%00"]
    });
    const token =jwt.sign(
        {
        email:email
        },
        process.env.USERS_JWT_SECRET
        );
    // send the token
        res.cookie("chat", token, {
         httpOnly: true,
         secure:true
        }).send();
        const saveConversation = await newConversation.save();
    }

    }catch(err){

    }

});

router.get("/" ,async (req ,res) => {
    
    const cookie = req.cookies.chat;
    const Admin = req.cookies.Admin;

    if(!cookie) {
        res.json({errMessage:"لطفا ابتدا نام و ایمیل خود را وارد کنید",err:"login"})
    }
    try{
           if(cookie) {
               jwt.verify(cookie , process.env.USERS_JWT_SECRET ,async function(err,decodedToken){
                if(err){   
                } 
                if(decodedToken){
                const {email} = decodedToken;
        
                const conversation = await Conversation.find({
                    members:{ $in : [email] }
                });
                res.json(conversation);
                } 
            });
        }
        
    }catch(err){
    
    }

});

router.get("/Admin" ,AdminAuth ,async (req ,res) => {
    
    const Admin = req.cookies.Admin;

    try{
        if(Admin){
            jwt.verify(Admin , process.env.JWT_SECRET ,async function(err,decodedToken){
                if(err){   
                } 
                if(decodedToken){
                const {email} = decodedToken;
        
                const conversation = await Conversation.find({
                    members:{ $in : ["Admin-hrttrhthr%00"] }
                });
                res.json(conversation);
            }
              });
        }

        
    }catch(err){
        res.json(err)
    }

});

module.exports = router;