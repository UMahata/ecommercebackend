const express = require('express')
const mongoose = require('mongoose')
const { createProduct } = require('./controller/Product')
const server = express()
const cors = require('cors')
const productRouters = require('./routes/Products')
const categoriesRouters = require('./routes/Categories')
const brandsRouters = require('./routes/Brands')
const usersRouters = require('./routes/Users')
const authRouters = require('./routes/Auth')
const cartRouters = require('./routes/Cart')
const ordersRouters = require('./routes/Order')

// midlleware for post products
server.use(cors({exposedHeaders:['X-Total-Count']}))
server.use(express.json())
server.use('/products',productRouters.router)
server.use('/categories',categoriesRouters.router)
server.use('/brands',brandsRouters.router)
server.use('/users',usersRouters.router)
server.use('/auth',authRouters.router)
server.use('/cart',cartRouters.router)
server.use('/orders',ordersRouters.router)

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