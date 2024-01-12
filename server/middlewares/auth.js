const jwt=require("jsonwebtoken")
require("dotenv").config()

//auth
exports.auth=async(req,res,next)=>{
    try {
        //extract token
        const token=req.cookies.token || req.body.token ||req.headers.authorization.replace("Bearer ", "");
        // if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
        
        //verify token

        try {
            const decode=await jwt.verify(token,process.env.JWT_SECRET)
        // this req.user is getting  the data we got while saving token in payload and then we put in decode and send it to user in req.user. However we can name it anything req.user or req.currentuser its
        // just a req that will show after hitting api and we can use it further as well 
            req.user=decode
            
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next()
    } catch (error) {
       
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating"
        })
    }
}