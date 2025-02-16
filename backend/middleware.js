const jwt= require("jsonwebtoken");
const {JWT_SECRET} = require("./config");



const authMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if(!authHeader ||  !authHeader.startsWith("Bearer")){
        return res.status(403).json({
            message : "Wrong Token"
        })
    }

    const token = authHeader.split(" ")[1];
    
    try{
        console.log("Verifying Token with Secret:", JWT_SECRET);
        console.log("JWT_SECRET Type:", typeof JWT_SECRET);

        const decode_Token = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decode_Token);
        if(decode_Token.userId){
            req.userId = decode_Token.userId;
            next()
        }else{
            return res.status(403).json({message:"Invalid Token"});
        }

    }catch(err){
        console.log("JWT Error:", err.message);
        return res.status(403).json({message: "Authentication Failed"});
    }

};

module.exports={
    authMiddleware
}


// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);

//         req.userId = decoded.userId;

//         next();
//     } catch (err) {
//         return res.status(403).json({});
//     }
// };

// module.exports = {
//     authMiddleware
// }