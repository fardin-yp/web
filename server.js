const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production'

const next = require('next')
const app = next( { dev } )
const handle = app.getRequestHandler()


app.prepare().then(() => {
   const server = express()

   server.use(express.json())

   server.use('/' , require("./routes/usersAuth"))


server.get('*', (req,res) => {
   return handle(req,res)
})

const PORT = process.env.PORT || 27017

server.listen(PORT ,() => console.log('server connected on 8080'))
mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser:true ,useUnifiedTopology:true} , err => {
   if(err) return console.log(err);
   console.log('mongodb connected')
})
   
})