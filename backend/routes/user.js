const express  = require ("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const  jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

//signup and signin route

const SignupSchema = zod.object({
    username : zod.string().email(),
    //maybe put OTP verificaation
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
})

const SigninSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
})

const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post("/signup",async (req,res)=>{
    
    console.log("signup route hit");

    const body = req.body;
    
    const {success, error} = SignupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message : "Incorrect Inputs"
        })
    }

    const user =  await User.findOne({
        username: body.username
    })

    if(user){
        return res.status(411).json({
            message : "Email Already Taken"
        })
    }

    const dbUser = await User.create(body);
    console.log(dbUser);

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random()*10000
    })

    console.log("Signing Token with Secret:", JWT_SECRET);

    const  token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET);



    res.json({
        message: "User created successfully",
        token : token
    })

})

router.post("/signin",async (req,res)=>{
    body = req.body;
    const {success}=SigninSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message : "Incoreect  Inputs"
        })
    }

    const user  = await User.findOne({
        username: body.username,
        password: body.password
    })

    console.log("Signing Token with Secret:", JWT_SECRET);


    if(user && await bcrypt.compare(body.password,user.password)){
        const token =jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})

router.put("/",authMiddleware,async(req,res)=>{
    const {sucess} = updateUser.safeParse(req.body);
    if(!sucess){
        res.status(411).json({
            message: "Error in  updating info"
        })
    }

    await User.updateOne({_id:req.userId},req.body);

    res.json({
        message:"Update successfully"
    })
})

router.get("/bulk",async (req,res)=>{
    const  filter = req.query.filter||"";//to get the filter value from the  http url
    const users = await User.find({
        $or: [{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    
    res.json({
        user:users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user.id
        }))
    })

})

module.exports = router;

