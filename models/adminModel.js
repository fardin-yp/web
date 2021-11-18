const mongoose = require('mongoose')

const adminModel = new mongoose.Schema({
    email:{type:String , require:true},
    passwordHash:{type:String , require:true},
})

const Admin = mongoose.model('adminusers' , adminModel)

module.exports = Admin