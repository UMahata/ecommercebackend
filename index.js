const express = require('express')
const mongoose = require('mongoose')
const { createProduct } = require('./controller/Product')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const server = express()
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = 'SECRET_KEY'






const productRouters = require('./routes/Products')
const categoriesRouters = require('./routes/Categories')
const brandsRouters = require('./routes/Brands')
const usersRouters = require('./routes/Users')
const authRouters = require('./routes/Auth')
const cartRouters = require('./routes/Cart')
const ordersRouters = require('./routes/Order')
const { User } = require('./model/User')
const crypto = require("crypto");
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common')




//jwt options
const opts = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = SECRET_KEY;



// midlleware for post products

server.use(express.static('build'))
server.use(cookieParser())
server.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  }));
 
  server.use(passport.authenticate('session'));
  

server.use(cors({exposedHeaders:['X-Total-Count']}))
server.use(express.json())
server.use('/products',isAuth(),productRouters.router)
server.use('/categories',isAuth(),categoriesRouters.router)
server.use('/brands',isAuth(),brandsRouters.router)
server.use('/users',isAuth(),usersRouters.router)
server.use('/auth',authRouters.router)
server.use('/cart',isAuth(),cartRouters.router)
server.use('/orders',isAuth(),ordersRouters.router)

passport.use('local',new LocalStrategy(
   
    {usernameField:'email'},
    async function (email, password, done) {
        
        try{
            const user = await User.findOne({email:email}).exec()
                     
            if(!user){
                done(null,false,{message:'invalid credentials'})
                
            }

            crypto.pbkdf2(
                password,
                user.salt,
                310000,
                32,
                "sha256",
                async function (err, hashedPassword) {  
            
            if(!crypto.timingSafeEqual(user.password, hashedPassword)){
              return done(null,false,{message:'invalid credentials'})
            }

            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);

            done(null,{id:user.id,role:user.role})
          
            
                 })   
           
            
        }catch(err){
            done(err)
        }
       
}
  ));

passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log({jwt_payload})
    try{
        const user = await User.findById(jwt_payload.id)
        console.log("first",jwt_payload.id)
        if (user) {
            return done(null,sanitizeUser(user) );
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }catch(err){
     
        return done(err, false);
        
    }  
}));


  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null,{id:user.id,role:user.role} );
    });
  });
  //this create session variable req.user on being called from
  passport.deserializeUser(function(user, cb) {

    process.nextTick(function() { 
      return cb(null, user);
    });
  });




main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect('mongodb+srv://ecommerce:rc8116097789@cluster0.dr7kl.mongodb.net/ecommerce2?retryWrites=true&w=majority&appName=Cluster0');
    // await mongoose.connect('mongodb://localhost:27017/ecommerce');
    console.log("database connected")
  
  }





server.listen(8080,()=>{
    console.log("server started");
    
})