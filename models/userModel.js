const mongoose = require('mongoose')

const usersModel = new mongoose.Schema({
    email:{type:String , require:true},
    username:{type:String , require:true},
    passwordHash:{type:String , require:true},
    activate:{type:Boolean ,require:true},
    blocked:{type:Boolean ,require:true},
    timestamp:{type:String ,require:true},
})

const Users = mongoose.model('users' , usersModel)

module.exports = Users