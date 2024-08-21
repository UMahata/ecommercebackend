const { User } = require("../model/User")

exports.createUser= async(req,res)=>{
    const user = new User(req.body)
    try{
        const response = await user.save()
        console.log(response)
        res.status(201).json(response)
    }catch(err){
        res.status(400).json(err)
    } 
  
   
 }

exports.loginUser= async(req,res)=>{
    
    try{
        const user = await User.findOne({email:req.body.email}).exec()
        if(!user){
            res.status(401).json({message:'no such user email'})
        }
        else if(user.password===req.body.password){
            res.status(201).json({id:user.id, email:user.email ,name:user.name,addresses:user.addresses, role:user.role})

        }else{
            res.status(401).json({message:'invalid credentials'})
        }
        
    }catch(err){
        res.status(400).json(err)
    }
  
   
 }