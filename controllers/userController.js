const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const config=require('../utils/config')
const userController={
    signup:async(req,res)=>{
        try{
            const {name,email,password}=req.body
           //existing user
           const existingUser=await User.findOne({email})
            if(existingUser){
                return res.status(409).json({message:"user already exists"})
            }
            const hashedpassword=await bcrypt.hash(password,10)

           const newUser=new User({
            name,
            email,
            password:hashedpassword,
            createdAt: Date.now() 
           }) 
           //save the user to db and send response back
           await newUser.save();
           res.status(201).json({message:'user saved successfully'})

        }
        catch(error){
            console.error('Error signing up user',error);
            res.status(500).json({message:"internal server error"})

        }

    },
    getUserList:async(req,res)=>{
        try{
            const userList=await User.find({},'name email');
            res.json(userList)

        }catch(error){
            console.error('Error getting user List',error)
            res.status(500).json({message:"internal server error"})


        }

    },
    signin:async(req,res)=>{
        try{
            const {email,password}=req.body
            const user=await User.findOne({email});
            if(!user){
                return res.status(401).json({message:'user not found'})
            }
            const passwordmatch=await bcrypt.compare(password,user.password);
            if (!passwordmatch ){
                return res.status(401).json({message:'wrong credentials'})
            }
            const token=jwt.sign({userId:user._id,name:user.name,email:user.email},config.SECRET_KEY,{expiresIn:'1hr'})
         res.json({token})

        }catch(error){
            console.error('Error signing in',error)
            res.status(500).json({message:"internal server error"})



        }


    },
    getProfile:async(req,res)=>{
        try{
            const userId=req.userId;
            const user=await User.findById(userId,'name email')
            res.json(user)
        }catch(error){
            console.error('error fetching user profile',error)
            res.status(500).json({message:"internal server error"})

        }

    },
    editProfile:async(req,res)=>{
        try{
            const userId=req.userId;
            const {name,email}=req.body;
            const user = await User.findByIdAndUpdate(userId,{ name , email,updatedAt:Date.now() },{new:true})
          res.json({message:"profile updated successfully"})
        }catch(error){
            console.error('error updating user profile',error)
            res.status(500).json({message:"internal server error"})

        }

    },
    deleteProfile:async(req,res)=>{

        try{
            const userId=req.userId;
            await User.findByIdAndDelete(userId)
            res.json({message:"profile deleted successfully"})
          
        }catch(error){
            console.error('error deleting user profile',error)
            res.status(500).json({message:"internal server error"})

        }
    }


}
module.exports=userController;