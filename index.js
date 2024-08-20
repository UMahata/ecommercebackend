const express = require('express')
const mongoose = require('mongoose')
const { createProduct } = require('./controller/Product')
const server = express()
const productRouters = require('./routes/Products')
const categoriesRouters = require('./routes/Categories')
const brandsRouters = require('./routes/Brands')
const cors = require('cors')
// midlleware for post products
server.use(cors())
server.use(express.json())
server.use('/products',productRouters.router)
server.use('/categories',categoriesRouters.router)
server.use('/brands',brandsRouters.router)

main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log("database connected")
  
  }

server.get('/',(req,res)=>{
    res.json({status:"success"})
})









server.listen(8080,()=>{
    console.log("server started");
    
})