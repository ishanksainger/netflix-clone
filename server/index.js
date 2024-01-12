const express=require("express")
const app=express()
const database=require("./config/database")
const cookies=require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")

dotenv.config()

const PORT=process.env.PORT || 4000

database.connect()

// middlewares

app.use(express.json())
app.use(cookies())
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)

app.get("/", (req,res)=>{
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})